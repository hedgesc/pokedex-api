// characterModel.js
var mongoose = require('mongoose');

var characterGameSchema = mongoose.Schema({
    gameDexId: Number,
    gameId: String
});

var characterSchema = mongoose.Schema({
    dexNumber: Number,
    name: String,
    altForm: String,
    types: [String],
    statTotal: Number,
    hp: Number,
    attack: Number,
    defense: Number,
    specialAttack: Number,
    specialDefense: Number,
    speed: Number,
    imageUrl: String,
    games: [characterGameSchema]
});

// Export Character model
var Character = module.exports = mongoose.model('character', characterSchema);

module.exports.get = function (callback, sort) {
    Character.find(callback).sort(sort);
}

module.exports.findByGameId = function (game, callback) {
    Character.aggregate([
        { $unwind: '$games' },
        { $match: { 'games.gameId': game } },
        { $sort: { 'games.gameDexId': 1 } }
    ], callback);
}