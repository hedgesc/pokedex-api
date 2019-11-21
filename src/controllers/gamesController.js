Game = require('../models/gameModel');

// Handle index actions
exports.index = function (req, res) {
    Game.get(function (err, games) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Games retrieved successfully",
            data: games
        });
    }, { 'order': 1 });
};

// Handle view contact info
exports.view = function (req, res) {
    Game.findById(req.params.id, function (err, games) {
        if (err)
            res.send(err);
        res.json({
            message: 'Game details loading..',
            data: games
        });
    });
};