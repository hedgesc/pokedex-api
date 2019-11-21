// Filename: api-routes.js
// Initialize express router
let router = require('express').Router();

let gamesController = require('./controllers/gamesController');
let charactersController = require('./controllers/charactersController');

// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'Pokedex API',
        message: 'Welcome to the Pokedex API'
    });
});


// Game routes
router.route('/games')
    .get(gamesController.index);

router.route('/games/:id')
    .get(gamesController.view);

// Character routes
router.route('/characters')
    .get(charactersController.index)


// Export API routes
module.exports = router;