const getCharactersQuery = 'SELECT * FROM characters ORDER BY character_id ASC'

const getCharacterByIdQuery = 'SELECT * FROM characters WHERE character_id = $1'

const createCharacterQuery = 'INSERT INTO characters \
(character_id, name_id, name, hp, attack, defense, \
special_attack, special_defense, speed, total, image_url, \
evolves_from_id, generation, types) VALUES ($1, $2, $3, $4, \
$5, $6, $7, $8, $9, $10, $11, $12, $13, $14)'




module.exports = {
  getCharactersQuery,
  getCharacterByIdQuery,
  createCharacterQuery
}