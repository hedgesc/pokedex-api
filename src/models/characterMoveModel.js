// characterMoveModel.js
var mongoose = require('mongoose');

var movePreviewSchema = mongoose.Schema({
    moveId: String,
    name: String,
    isSuggested: Boolean,
    color: String,
    power: Number,
    accuracy: Number
});

var characterMoveSchema = mongoose.Schema({
    nameId: String,
    name: String,
    charIndex: Number,
    gameId: String,
    game: String,
    gameIndex: Number
    //moves: [movePreviewSchema]
});

// Export Character model
var CharacterMove = module.exports = mongoose.model('character_move', characterMoveSchema, "character_moves");

module.exports.get = function (callback, sort) {
    CharacterMove.find(callback).sort(sort)
}

module.exports.findById = function (conditions, callback, sort) {
    CharacterMove.find(conditions, callback).sort(sort)
}