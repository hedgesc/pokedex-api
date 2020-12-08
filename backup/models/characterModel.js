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
    nameId: String,
    generation: Number,
    games: [characterGameSchema]
});

// Export Character model
var Character = module.exports = mongoose.model('character', characterSchema, "characters");

module.exports.get = function (callback, sort) {
    Character.find(callback).sort(sort);
}

module.exports.findById = function (id, callback) {
    Character.findOne({ '_id': id }, callback);
}

module.exports.findPreviousOne = function (id, callback) {
    Character.findOne({ '_id': { '$lt': id } }, callback).sort({ 'dexNumber': -1 }).limit(1)
}

module.exports.findNextOne = function (id, callback) {
    Character.findOne({ '_id': { '$gt': id } }, callback).sort({ 'dexNumber': 1 }).limit(1)
}

module.exports.findByGameId = function (game, callback) {
    Character.aggregate([
        { $unwind: '$games' },
        { $match: { 'games.gameId': game } },
        { $sort: { 'games.gameDexId': 1 } }
    ], callback);
}

module.exports.findByGeneration = function (gen, callback, sort) {
    Character.find({ 'generation': gen }, callback).sort(sort);
}