CharacterMove = require('../models/characterMoveModel');
var _ = require('lodash');

exports.index = function (req, res) {
    var conditions = {};

    if(req.query.name) {
        conditions["nameId"] = req.query.name;
    }

    if(req.query.generation) {
        conditions["generation"] = req.query.generation;
    }

    CharacterMove.get(
        conditions, 
        function(err, moves) {
            if (err) {
                res.json({
                    status: "error",
                    message: err,
                });
            }
            res.json({
                status: "success",
                message: "Character Moves retrieved successfully",
                data: moves
            });
        }, 
        { 'generation': 1 })
};

exports.view = function (req, res) {
    CharacterMove.findById(req.params.id, function (err, result) {
        if (err)
            res.send(err);

        res.json({
            message: 'Character Move details loading..',
            data: result
        });
    });
};

exports.update = function(req, res) {
    CharacterMove.findById(req.params.id, function(err, result) {
        if (err) res.send(err);

        var updates = { '$set': {} };

        // loop through moves to create updates
        _.forEach(result.moves, (item, index) => {
            var key = 'moves.' + index + '.isSuggested'
            var isOn = req.body.on.includes(item.moveId);

            // should not be suggested (flip it off)
            if(item.isSuggested && !isOn) {
                updates['$set'][key] = false;
            }
            
            // should be suggested (flip it on)
            if(!item.isSuggested && isOn) {
                updates['$set'][key] = true;
            }
        });

        CharacterMove.update(req.params.id, updates, function(err, result2) {
            if(err) res.send(err);

            res.json({ message: 'CharacterMove updated successfully', data: result2 })
        });
    });
};