Character = require('../models/characterModel');

// Handle index actions
exports.index = function (req, res) {
    
    var callback = function(err, characters) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Characters retrieved successfully",
            data: characters
        });
    }

    if(req.query.game) {
        Character.findByGameId(req.query.game, callback);
    }
    else {
        Character.get(callback);
    }
};