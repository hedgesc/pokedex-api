CharacterMove = require('../models/characterMoveModel');

// Handle index actions
// exports.index = function (req, res) {
//     CharacterMove.get(function(err, characters) {
//         if (err) {
//             res.json({
//                 status: "error",
//                 message: err,
//             });
//         }

//         res.json({
//             status: "success",
//             message: "Character moves retrieved successfully",
//             data: characters
//         });
//     }, { 
//         'gameIndex': 1, 'charIndex': 1
//     })
// }

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

    var conditions = {};

    if(req.query.name) {
        conditions["nameId"] = req.query.name;
    }

    if(req.query.game) {
        conditions["gameId"] = req.query.game;
    }

    CharacterMove.findById(conditions, callback, { 
        'gameIndex': 1, 'charIndex': 1
    })
};