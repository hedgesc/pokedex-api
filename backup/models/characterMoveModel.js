// characterMoveModel.js
var mongoose = require('mongoose');

var movePreviewSchema = mongoose.Schema({
    moveId: String,
    name: String,
    isSuggested: Boolean,
    type: String,
    color: String,
    power: Number,
    accuracy: Number,
    pp: Number
});

var characterMoveSchema = mongoose.Schema({
    generation: Number,
    nameId: String,
    name: String,
    moves: [movePreviewSchema]
});

// Export Character model
var CharacterMove = module.exports = mongoose.model('character_move', characterMoveSchema, "character_moves");

module.exports.get = function (conditions, callback, sort) {
    CharacterMove.find(conditions, callback).sort(sort)
}

module.exports.findById = function (id, callback) {
    CharacterMove.findOne({ '_id': id }, callback);
}

module.exports.update = function (id, updates, callback) {
    CharacterMove.updateOne({ '_id': id }, updates, callback)
}