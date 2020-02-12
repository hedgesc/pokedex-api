// Filename: api-routes.js
// Initialize express router
let router = require('express').Router();

let gamesController = require('./controllers/gamesController');
let charactersController = require('./controllers/charactersController');
let characterMovesController = require('./controllers/characterMovesController');

// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'Pokedex API',
        message: 'Welcome to the Pokedex API'
    });
});


// Game routes
router.route('/games').get(gamesController.index);
//router.route('/games/:id').get(gamesController.view);

// Character routes
router.route('/characters').get(charactersController.index)

router.route('/characters/:id').get(charactersController.view)

// Character Moves routes
router.route('/character-moves').get(characterMovesController.index)
router.route('/character-moves/:id').get(characterMovesController.view)
router.route('/character-moves/:id').put(characterMovesController.update)

// Export API routes
module.exports = router;