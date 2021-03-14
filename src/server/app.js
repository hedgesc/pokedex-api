import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import config from './config/config'
import characterRouter from './api/components/characters/routes'
import dexRouter from './api/components/dexes/routes'
import moveRouter from './api/components/moves/routes'
import gameRouter from './api/components/games/routes'

export const app = express()

app.use(cors())

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json())

app.use('/api/v1/characters', characterRouter)
app.use('/api/v1/dexes', dexRouter)
app.use('/api/v1/moves', moveRouter)
app.use('/api/v1/games', gameRouter)

// launch server on specified port
app.listen(config.app.port, function () {
  console.log("Running Pokedex API on port " + config.app.port)
})