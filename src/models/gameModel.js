// gameModel.js
var mongoose = require('mongoose');

var gameSchema = mongoose.Schema({
    gameId: String,
    name: String,
    displayName: String,
    regions: [String],
    order: Number,
    imageUrl: String
});

// Export Game model
var Game = module.exports = mongoose.model('game', gameSchema);

module.exports.get = function (callback, sort) {
    Game.find(callback).sort(sort);
}

module.exports.findById = function(gameId, callback) {
    Game.find({ 'gameId': gameId }, callback)
}