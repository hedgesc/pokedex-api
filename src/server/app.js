import fs from 'fs'
import path from 'path'
import express from 'express'
//import bodyParser from 'body-parser'
import cors from 'cors'
import yaml from 'js-yaml'
import swaggerUi from 'swagger-ui-express'
import config from './config/config'
import characterRouter from './api/components/characters/routes'
import dexRouter from './api/components/dexes/routes'
import moveRouter from './api/components/moves/routes'
import gameRouter from './api/components/games/routes'

export const app = express()

const openApiPath = path.join(__dirname, '../openapi.yaml')
const openApiSpec = yaml.load(fs.readFileSync(openApiPath, 'utf8'))

app.use(cors())

// Configure bodyparser to handle post requests
app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiSpec))

app.use('/api/v1/characters', characterRouter)
app.use('/api/v1/dexes', dexRouter)
app.use('/api/v1/moves', moveRouter)
app.use('/api/v1/games', gameRouter)

app.use((err, req, res, next) => {
  console.error(err)
  if (res.headersSent) {
    next(err)
    return
  }
  res.status(500).json({ error: 'Internal server error' })
})

// launch server on specified port
app.listen(config.app.port, function () {
  console.log("Running Pokedex API on port " + config.app.port)
})