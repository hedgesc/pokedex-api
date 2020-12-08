const express = require("express")
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

const api = require('./api')
const port = 3002

app.use(cors())

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json())

// Send message for default URL
app.get('/', (req, res) => {
  res.send('Pokedex API (Node.js, Express and PostgreSQL)')
})

// Define endpoints for the api

// All create requests
app.post('/characters', api.createCharacter)
app.post('/characters/:id/games', api.createGameCharacter)
app.post('/characters/:id/moves', api.createCharacterMove)
app.post('/games', api.createGame)
app.post('/moves', api.createMove)
app.post('/game-groups', api.createGameGroup)
app.post('/game-groups/:id/games', api.createGameGroupGame)

// All get (read) requests
app.get('/characters', api.getCharacters)
app.get('/characters/:id', api.getCharacterById)
app.get('/characters/:id/games', api.getGamesByCharacterId)
app.get('/characters/:id/games/:id1', api.getGameCharacterByCharacterId_GameId)
app.get('/characters/:id/moves', api.getMovesByCharacterId)
app.get('/characters/:id/moves/:id1', api.getCharacterMoveByCharacterId_MoveId)
app.get('/games', api.getGames)
app.get('/games/:id', api.getGameById)
app.get('/moves', api.getMoves)
app.get('/moves/:id', api.getMoveById)
app.get('/game-groups', api.getGameGroups)
app.get('/game-groups/:id', api.getGameGroupById)
app.get('/game-groups/:id/games', api.getGamesByGameGroupId)
app.get('/game-groups/:id/characters', api.getCharactersByGameGroupId)
app.get('/character-games/:id', api.getGameCharacterById)
app.get('/character-moves/:id', api.getCharacterMoveById)

// All update requests
app.put('/characters/:id', api.updateCharacter)
app.put('/characters/:id/games/:id1', api.updateGameCharacterByCharacterId_GameId)
app.put('/games/:id', api.updateGame)
app.put('/moves/:id', api.updateMove)
app.put('/game-groups/:id', api.updateGameGroup)
app.put('/character-games/:id', api.updateGameCharacterById)
app.put('/character-moves/:id', api.updateCharacterMoveById)

// All delete requests
app.delete('/characters/:id', api.deleteCharacter)
app.delete('/games/:id', api.deleteGame)
app.delete('/moves/:id', api.deleteMove)
app.delete('/characters/:id/games/:id1', api.deleteGameCharacterByCharacterId_GameId)
app.delete('/characters/:id/moves/:id1', api.deleteCharacterMoveByCharacterId_MoveId)
app.delete('/game-groups/:id', api.deleteGameGroup)
app.delete('/game-groups/:id/games/:id1', api.deleteGameGroupGame)
app.delete('/character-games/:id', api.deleteGameCharacterById)
app.delete('/character-moves/:id', api.deleteCharacterMoveById)

// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running Pokedex API on port " + port)
})
