const Pool = require('pg').Pool
var _ = require('lodash')

const pool = new Pool({
  user: 'pi',
  host: 'localhost',
  database: 'pokedex',
  password: 'Super*32',
  port: 5432
})

// const pool = new Pool({
//   user: 'pi',
//   host: '10.0.0.42',
//   database: 'pokedex',
//   password: 'Super*32',
//   port: 5432
// })

const handleError = (err) => {
  throw err
}

const handleListResponse = (response, results) => {
  response.status(200).json(results.rows)
}

const handleSingleResponse = (response, results) => {
  const row = results.rows.length === 0 ? null : results.rows[0]
  response.status(200).json(row)
}

const handlePagedListResponse = (response, results, last_row) => {
  let result = {
    items: [],
    total_count: 0,
    has_more: false
  }

  if(results.rows.length > 0) {
    result.total_count = _.parseInt(results.rows[0]['total_count'])
    result.items = _.map(results.rows, (obj) => { return _.omit(obj, ['total_count']) })
    result.has_more = result.total_count > last_row
  }

  response.status(200).json(result)
}

const createCharacter = (request, response) => {
  const sql = 'INSERT INTO characters \
  (character_id, name_id, name, hp, attack, defense, \
  special_attack, special_defense, speed, total, image_url, \
  evolves_from_id, generation, types) VALUES ($1, $2, $3, $4, \
  $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING character_id'
  
  const { 
    character_id, name_id, name, hp, attack, defense, 
    special_attack, special_defense, speed, total, 
    image_url, evolves_from_id, generation, types } = request.body

  const params = [character_id, name_id, name, hp, 
    attack, defense, special_attack, special_defense, 
    speed, total, image_url, evolves_from_id, generation, 
    types]

  pool.query(sql, params, (error, results) => {
    if (error) handleError(error)
    response.status(201).send(`Character ${character_id} created`)
  })
}

const createGame = (request, response) => {
  const sql = 'INSERT INTO games (name_id, name, generation, regions) VALUES ($1, $2, $3, $4) RETURNING game_id'
  const { name_id, name, generation, regions } = request.body
  const params = [name_id, name, generation, regions]

  pool.query(sql, params, (error, results) => {
    if (error) handleError(error)
    response.status(201).send(`Game ${results.rows[0].game_id} created`)
  })
}

const createMove = (request, response) => {
  const sql = 'INSERT INTO moves (name_id, name, category, power, \
  accuracy, pp, generation, type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING move_id'
  const { name_id, name, category, power, accuracy, pp, generation, type } = request.body
  const params = [name_id, name, category, power, accuracy, pp, generation, type]

  pool.query(sql, params, (error, results) => {
    if (error) handleError(error)
    response.status(201).send(`Move ${results.rows[0].move_id} created`)
  })
}

const createGameGroup = (request, response) => {
  const sql = 'INSERT INTO game_groups (name_id, name, alternate_name) VALUES ($1, $2, $3) RETURNING game_group_id'
  const { name_id, name, alternate_name } = request.body
  const params = [name_id, name, alternate_name]

  pool.query(sql, params, (error, results) => {
    if (error) handleError(error)
    response.status(201).send(`Game Group ${results.rows[0].game_group_id} created`)
  })
}

const createGameCharacter = (request, response) => {
  const sql = 'INSERT INTO character_games \
  (character_id, generation, game_id, game_character_id) \
  VALUES ($1, $2, $3, $4) RETURNING character_game_id'
  const character_id = parseInt(request.params.id)
  const { generation, game_id, game_character_id } = request.body
  const params = [character_id, generation, game_id, game_character_id]

  pool.query(sql, params, (error, results) => {
    if (error) handleError(error)
    response.status(201).send(results.rows[0].character_game_id)
  })
}

const createCharacterMove = (request, response) => {
  const sql = 'INSERT INTO character_moves \
  (character_id, generation, move_id, is_suggested) \
  VALUES ($1, $2, $3, $4) RETURNING character_move_id'
  const character_id = parseInt(request.params.id)
  const { generation, move_id, is_suggested } = request.body
  const params = [character_id, generation, move_id, is_suggested]

  pool.query(sql, params, (error, results) => {
    if (error) handleError(error)
    response.status(201).send(`Character Move ${results.rows[0].character_move_id} created`)
  })
}

const createGameGroupGame = (request, response) => {
  const sql = 'INSERT INTO game_group_games (game_group_id, game_id) VALUES ($1, $2) RETURNING game_group_game_id'
  const game_group_id = parseInt(request.params.id)
  const { game_id } = request.body
  const params = [game_group_id, game_id]

  pool.query(sql, params, (error, results) => {
    if (error) handleError(error)
    response.status(201).send(`Game Group Game ${results.rows[0].game_group_game_id} created`)
  })
}

const getCharacters = (request, response) => {
  let sql
  
  if(!request.query.limit && !request.query.offset) {
    sql = 'SELECT character_id, name, image_url FROM characters ORDER BY character_id'
    pool.query(sql, (error, results) => {
      if (error) handleError(error)
      handleListResponse(response, results)
    })
  }
  else {
    const limit = request.query.limit ? request.query.limit : '10'
    const offset = request.query.offset ? request.query.offset : '0'
    sql = 'WITH cte AS (SELECT * FROM characters) SELECT * FROM (TABLE cte ORDER BY character_id ASC LIMIT $1 OFFSET $2) sub RIGHT JOIN (SELECT count(*) FROM cte) c(total_count) ON true;'
    
    pool.query(sql, [limit, offset], (error, results) => {
      if (error) handleError(error)
      const last_row = _.parseInt(limit) + _.parseInt(offset)
      handlePagedListResponse(response, results, last_row)
    })
  }
}

const getCharacterById = (request, response) => {
  const sql = 'SELECT * FROM characters WHERE character_id = $1'
  const id = parseInt(request.params.id)

  pool.query(sql, [id], (error, results) => {
    if (error) handleError(error)
    handleSingleResponse(response, results)
  })
}

const getGamesByCharacterId = (request, response) => {
  const sql = 'SELECT cg.character_game_id, cg.generation, cg.character_id, cg.game_character_id, g.game_id, g.name_id, g.name FROM character_games cg JOIN games g on cg.game_id = g.game_id WHERE cg.character_id = $1'
  const id = parseInt(request.params.id)

  pool.query(sql, [id], (error, results) => {
    if (error) handleError(error)
    handleListResponse(response, results)
  })
}

const getGameCharacterByCharacterId_GameId = (request, response) => {
  const sql = 'SELECT * FROM character_games WHERE character_id = $1 AND game_id = $2'
  const characterId = parseInt(request.params.id)
  const gameId = parseInt(request.params.id1)

  pool.query(sql, [characterId, gameId], (error, results) => {
    if (error) handleError(error)
    handleSingleResponse(response, results)
  })
}

const getGameCharacterById = (request, response) => {
  const sql = 'SELECT * FROM character_games WHERE character_game_id = $1'
  const id = parseInt(request.params.id)

  pool.query(sql, [id], (error, results) => {
    if (error) handleError(error)
    handleSingleResponse(response, results)
  })
}

const getMovesByCharacterId = (request, response) => {
  const sql = 'SELECT cm.character_id, cm.character_move_id, cm.generation, cm.is_suggested, \
	  m.move_id, m.name, m.power, m.accuracy, m.pp, m.type \
  FROM character_moves cm JOIN moves m on cm.move_id = m.move_id \
  WHERE cm.character_id = $1 ORDER BY cm.character_move_id'
  const id = parseInt(request.params.id)

  pool.query(sql, [id], (error, results) => {
    if (error) handleError(error)
    handleListResponse(response, results)
  })
}

const getCharacterMoveByCharacterId_MoveId = (request, response) => {
  const sql = 'SELECT * FROM character_moves WHERE character_id = $1 AND move_id = $2'
  const characterId = parseInt(request.params.id)
  const moveId = parseInt(request.params.id1)

  pool.query(sql, [characterId, moveId], (error, results) => {
    if (error) handleError(error)
    handleSingleResponse(response, results)
  })
}

const getCharacterMoveById = (request, response) => {
  const sql = 'SELECT * FROM character_moves WHERE character_move_id = $1'
  const id = parseInt(request.params.id)

  pool.query(sql, [id], (error, results) => {
    if (error) handleError(error)
    handleSingleResponse(response, results)
  })
}

const getGames = (request, response) => {
  const sql = 'SELECT * FROM games ORDER BY generation ASC, game_id ASC'
  
  pool.query(sql, (error, results) => {
    if (error) handleError(error)
    handleListResponse(response, results)
  })
}

const getGameById = (request, response) => {
  const sql = 'SELECT * FROM games WHERE game_id = $1'
  const id = parseInt(request.params.id)

  pool.query(sql, [id], (error, results) => {
    if (error) handleError(error)
    handleSingleResponse(response, results)
  })
}

const getMoves = (request, response) => {
  const sql = 'WITH cte AS (SELECT * FROM moves) SELECT * FROM (TABLE cte ORDER BY move_id ASC LIMIT $1 OFFSET $2) sub RIGHT JOIN (SELECT count(*) FROM cte) c(total_count) ON true;'
  
  const limit = request.query.limit ? request.query.limit : '10'
  const offset = request.query.offset ? request.query.offset : '0'

  pool.query(sql, [limit, offset], (error, results) => {
    if (error) handleError(error)
    const last_row = _.parseInt(limit) + _.parseInt(offset)
    handlePagedListResponse(response, results, last_row)
  })
}

const getMoveById = (request, response) => {
  const sql = 'SELECT * FROM moves WHERE move_id = $1'
  const id = parseInt(request.params.id)

  pool.query(sql, [id], (error, results) => {
    if (error) handleError(error)
    handleSingleResponse(response, results)
  })
}

const getGameGroups = (request, response) => {
  const sql = 'SELECT * FROM game_groups ORDER BY game_group_id ASC'
  
  pool.query(sql, (error, results) => {
    if (error) handleError(error)
    handleListResponse(response, results)
  })
}

const getGameGroupById = (request, response) => {
  const sql = 'SELECT * FROM game_groups WHERE game_group_id = $1'
  const id = parseInt(request.params.id)

  pool.query(sql, [id], (error, results) => {
    if (error) handleError(error)
    handleSingleResponse(response, results)
  })
}

const getGamesByGameGroupId = (request, response) => {
  const sql = 'SELECT g.* FROM game_group_games ggg JOIN games g ON ggg.game_id = g.game_id WHERE ggg.game_group_id = $1'
  const id = parseInt(request.params.id)

  pool.query(sql, [id], (error, results) => {
    if (error) handleError(error)
    handleListResponse(response, results)
  })
}

const getCharactersByGameGroupId = (request, response) => {
  const sql = `
    SELECT DISTINCT
      c.character_id,,
      c2.game_character_id,
      c.name_id,
      c.name,
      c.hp,
      c.attack,
      c.defense,
      c.special_attack,
      c.special_defense,
      c.speed,
      c.total,
      c.image_url,
      c.generation,
      c.evolves_from_id,
      c.types
    FROM
	    game_group_games g3
	    JOIN character_games c2
		    ON g3.game_id = c2.game_id
	    JOIN characters c
		    ON c2.character_id = c.character_id
    WHERE
	    g3.game_group_id = $1
    ORDER BY
      c2.game_character_id ASC;`

  const id = parseInt(request.params.id)

  pool.query(sql, [id], (error, results) => {
    if (error) handleError(error)
    handleListResponse(response, results)
  })
}

const updateCharacter = (request, response) => {
  const sql = 'UPDATE characters SET name_id = $2, name = $3, hp = $4, \
  attack = $5, defense = $6, special_attack = $7, special_defense = $8, \
  speed = $9, total = $10, image_url = $11, evolves_from_id = $12, \
  generation = $13, types = $14 WHERE character_id = $1'

  const id = parseInt(request.params.id)
  const { name_id, name, hp, attack, defense, special_attack, 
    special_defense, speed, total, image_url, evolves_from_id, 
    generation, types } = request.body

  const params = [id, name_id, name, hp, attack, defense, 
    special_attack, special_defense, speed, total, image_url, 
    evolves_from_id, generation, types]

  pool.query(sql, params, (error, results) => {
    if (error) handleError(error)
    response.status(200).send(`Character ${id} updated`)
  })
}

const updateGame = (request, response) => {
  const sql = 'UPDATE games SET name_id = $2, name = $3, generation = $4, regions = $5 WHERE game_id = $1'
  const id = parseInt(request.params.id)
  const { name_id, name, generation, regions } = request.body
  const params = [id, name_id, name, generation, regions]

  pool.query(sql, params, (error, results) => {
    if (error) handleError(error)
    response.status(200).send(`Game ${id} updated`)
  })
}

const updateMove = (request, response) => {
  const sql = 'UPDATE moves SET name_id = $2, name = $3, category = $4, power = $5, accuracy = $6, pp = $7, generation = $8, type = $9 WHERE move_id = $1'
  const id = parseInt(request.params.id)
  const { name_id, name, category, power, accuracy, pp, generation, type } = request.body
  const params = [id, name_id, name, category, power, accuracy, pp, generation, type]

  pool.query(sql, params, (error, results) => {
    if (error) handleError(error)
    response.status(200).send(`Move ${id} updated`)
  })
}

const updateGameGroup = (request, response) => {
  const sql = 'UPDATE game_groups SET name_id = $2, name = $3, alternate_name = $4 WHERE game_group_id = $1'
  const id = parseInt(request.params.id)
  const { name_id, name, alternate_name } = request.body
  const params = [id, name_id, name, alternate_name]

  pool.query(sql, params, (error, results) => {
    if (error) handleError(error)
    response.status(200).send(`Game Group ${id} updated`)
  })
}

const updateGameCharacterByCharacterId_GameId = (request, response) => {
  const sql = 'UPDATE character_games SET generation = $3, game_character_id = $4 WHERE character_id = $1 AND game_id = $2'
  const characterId = parseInt(request.params.id)
  const gameId = parseInt(request.params.id1)
  const { generation, game_character_id} = request.body
  const params = [characterId, gameId, generation, game_character_id]

  pool.query(sql, params, (error, results) => {
    if(error) handleError(error)
    response.status(200).send(`Game ${gameId} updated for Character ${characterId}`)
  })
}

const updateGameCharacterById = (request, response) => {
  const sql = 'UPDATE character_games SET generation = $2, game_character_id = $3 WHERE character_game_id = $1'
  const id = parseInt(request.params.id)
  const { generation, game_character_id } = request.body
  const params = [id, generation, game_character_id]

  pool.query(sql, params, (error, results) => {
    if(error) handleError(error)
    response.status(200).send(`Game Character ${id} updated`)
  })
}

const updateCharacterMoveById = (request, response) => {
  const sql = 'UPDATE character_moves SET is_suggested = $2 WHERE character_move_id = $1'
  const characterMoveId = parseInt(request.params.id)
  const { is_suggested } = request.body
  const params = [characterMoveId, is_suggested]

  pool.query(sql, params, (error, results) => {
    if(error) handleError(error)
    response.status(200).send(`Character Move ${characterMoveId} updated`)
  })
}

const deleteCharacter = (request, response) => {
  const sql = 'DELETE FROM characters WHERE character_id = $1'
  const id = parseInt(request.params.id)

  pool.query(sql, [id], (error, results) => {
    if (error) handleError(error)
    response.status(200).send(`Character ${id} deleted`)
  })
}

const deleteGame = (request, response) => {
  const sql = 'DELETE FROM games WHERE game_id = $1'
  const id = parseInt(request.params.id)

  pool.query(sql, [id], (error, results) => {
    if (error) handleError(error)
    response.status(200).send(`Game ${id} deleted`)
  })
}

const deleteMove = (request, response) => {
  const sql = 'DELETE FROM moves WHERE move_id = $1'
  const id = parseInt(request.params.id)

  pool.query(sql, [id], (error, results) => {
    if (error) handleError(error)
    response.status(200).send(`Move ${id} deleted`)
  })
}

const deleteGameCharacterByCharacterId_GameId = (request, response) => {
  const sql = 'DELETE FROM character_games WHERE character_id = $1 AND game_id = $2'
  const characterId = parseInt(request.params.id)
  const gameId = parseInt(request.params.id1)

  pool.query(sql, [characterId, gameId], (error, results) => {
    if (error) handleError(error)
    response.status(200).send(`Character ${characterId} deleted from Game ${gameId}`)
  })
}

const deleteGameCharacterById = (request, response) => {
  const sql = 'DELETE FROM character_games WHERE character_game_id = $1'
  const id = parseInt(request.params.id)

  pool.query(sql, [id], (error, results) => {
    if (error) handleError(error)
    response.status(200).send(`Game Character ${id} deleted`)
  })
}

const deleteCharacterMoveByCharacterId_MoveId = (request, response) => {
  const sql = 'DELETE FROM character_moves WHERE character_id = $1 AND move_id = $2'
  const characterId = parseInt(request.params.id)
  const moveId = parseInt(request.params.id1)

  pool.query(sql, [characterId, moveId], (error, results) => {
    if (error) handleError(error)
    response.status(200).send(`Move ${moveId} deleted from Character ${characterId}`)
  })
}

const deleteCharacterMoveById = (request, response) => {
  const sql = 'DELETE FROM character_moves WHERE character_move_id = $1'
  const id = parseInt(request.params.id)

  pool.query(sql, [id], (error, results) => {
    if (error) handleError(error)
    response.status(200).send(`Character Move ${id} deleted`)
  })
}

const deleteGameGroup = (request, response) => {
  const sql = 'DELETE FROM game_groups WHERE game_group_id = $1'
  const id = parseInt(request.params.id)

  pool.query(sql, [id], (error, results) => {
    if (error) handleError(error)
    response.status(200).send(`Game Group ${id} deleted`)
  })
}

const deleteGameGroupGame = (request, response) => {
  const sql = 'DELETE FROM game_group_games WHERE game_group_id = $1 AND game_id = $2'
  const gameGroupId = parseInt(request.params.id)
  const gameId = parseInt(request.params.id1)

  pool.query(sql, [gameGroupId, gameId], (error, results) => {
    if (error) handleError(error)
    response.status(200).send(`Game ${gameId} deleted from Game Group ${gameGroupId}`)
  })
}

const countCharacters = (request, response) => {
  const sql = 'SELECT COUNT(*) FROM characters'

  pool.query(sql, (error, results) => {
    if (error) handleError(error)
    handleSingleResponse(response, results)
  })
}

const countMoves = (request, response) => {
  const sql = 'SELECT COUNT(*) FROM moves'

  pool.query(sql, (error, results) => {
    if (error) handleError(error)
    handleSingleResponse(response, results)
  })
}

module.exports = {
  createCharacter,
  createGameCharacter,
  createCharacterMove,
  createGame,
  createMove,
  createGameGroup,
  createGameGroupGame,
  getCharacters,
  getCharacterById,
  getGamesByCharacterId,
  getGameCharacterByCharacterId_GameId,
  getGameCharacterById,
  getMovesByCharacterId,
  getCharacterMoveByCharacterId_MoveId,
  getCharacterMoveById,
  getGames,
  getGameById,
  getMoves,
  getMoveById,
  getGameGroups,
  getGameGroupById,
  getGamesByGameGroupId,
  getCharactersByGameGroupId,
  updateCharacter,
  updateGame,
  updateMove,
  updateGameGroup,
  updateGameCharacterByCharacterId_GameId,
  updateGameCharacterById,
  updateCharacterMoveById,
  deleteCharacter,
  deleteGame,
  deleteMove,
  deleteGameCharacterByCharacterId_GameId,
  deleteGameCharacterById,
  deleteCharacterMoveByCharacterId_MoveId,
  deleteCharacterMoveById,
  deleteGameGroup,
  deleteGameGroupGame
}