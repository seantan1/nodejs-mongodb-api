// streamerController.js
// Import streamer model
Streamer = require('../models/streamerModel');
// Handle index actions
exports.index = function (req, res) {
    if (req.body.apikey == process.env.PRIVATE_API_KEY) {
        Streamer.get(function (err, streamers) {
            if (err) {
                res.json({
                    status: "error",
                    message: err,
                });
            }
            res.json({
                status: "success",
                message: "Streamers retrieved successfully",
                data: streamers
            });
        });
    }
    else {
        res.json('Not authorised');
    }
};
// Handle create streamer actions
exports.new = function (req, res) {
    if (req.body.apikey == process.env.PRIVATE_API_KEY) {
        var streamer = new Streamer();
        streamer.username = req.body.username ? req.body.username : streamer.username;
        streamer.password_hash = req.body.password_hash;
        streamer.wallet_address = req.body.wallet_address;
        streamer.profile_image_link = req.body.profile_image_link;
        // save the streamer and check for errors
        streamer.save(function (err) {
            // Check for validation error
            if (err)
                res.json(err);
            else
                res.json({
                    message: 'New streamer created!',
                    data: streamer
                });
        });
    }
    else {
        res.json('Not authorised');
    }
};
// Handle view donation info
exports.view = function (req, res) {
    if (req.body.apikey == process.env.PRIVATE_API_KEY) {
        Streamer.findById(req.params.streamer_id, function (err, streamer) {
            if (err)
                res.send(err);
            res.json({
                message: 'Streamer details loading..',
                data: streamer
            });
        });
    }
    else {
        res.json('Not authorised');
    }
};
// Handle update streamer info
exports.update = function (req, res) {
    if (req.body.apikey == process.env.PRIVATE_API_KEY) {
        Streamer.findById(req.params.streamer_id, function (err, streamer) {
            if (err)
                res.send(err);
            streamer.username = req.body.username ? req.body.username : streamer.username;
            streamer.password_hash = req.body.password_hash;
            streamer.wallet_address = req.body.wallet_address;
            streamer.profile_image_link = req.body.profile_image_link;
            // save the streamer and check for errors
            streamer.save(function (err) {
                if (err)
                    res.json(err);
                res.json({
                    message: 'Streamer Info updated',
                    data: streamer
                });
            });
        });
    }
    else {
        res.json('Not authorised');
    }
};
// Handle delete donation
exports.delete = function (req, res) {
    if (req.body.apikey == process.env.PRIVATE_API_KEY) {
        Streamer.remove({
            _id: req.params.streamer_id
        }, function (err, streamer) {
            if (err)
                res.send(err);
            res.json({
                status: "success",
                message: 'Streamer deleted'
            });
        });
    }
    else {
        res.json('Not authorised');
    }
};

// Handle login function
exports.login = function (req, res) {
    if (req.body.apikey == process.env.PRIVATE_API_KEY) {
        Streamer.find()
        .where('username').equals(req.body.username)
        .where('password_hash').equals(req.body.password_hash)
        .exec(function (err, streamer) {
            if (err)
                res.send(err);
            if (streamer.length == 0) {
                res.json({
                    message: 'fail'
                });
            }
            else {
                res.json({
                    message: 'success',
                    data: streamer
                });
            }
        })
    }
    else {
        res.json('Not authorised');
    }
};

exports.getStreamerByUsername = function (req, res) {
    if (req.body.apikey == process.env.PRIVATE_API_KEY) {
        Streamer.find()
        .where('username').equals(req.body.username)
        .exec(function (err, streamer) {
            if (err)
                res.send(err);
            if (streamer.length == 0) {
                res.json({
                    message: 'fail'
                });
            }
            else {
                res.json({
                    message: 'success',
                    data: streamer
                });
            }
        })
    }
    else {
        res.json('Not authorised');
    }
};

// Custom queries
// Fetch top 5 ONE donation amount
// exports.topONE = function (req, res) {
//     Donation.find()
//         .where('currency').equals('ONE')
//         .sort({amount: 'desc'})
//         .limit(5)
//         .exec(function (err, donations) {
//             if (err) {
//                 res.json({
//                     status: "error",
//                     message: err,
//                 });
//             }
//             res.json({
//                 status: "success",
//                 message: "Donations retrieved successfully",
//                 data: donations
//             });
//         });
// };

// Fetch top 5 XYA donation amount
// exports.topXYA = function (req, res) {
//     Donation.find()
//         .where('currency').equals('XYA')
//         .sort({amount: 'desc'})
//         .limit(5)
//         .exec(function (err, donations) {
//             if (err) {
//                 res.json({
//                     status: "error",
//                     message: err,
//                 });
//             }
//             res.json({
//                 status: "success",
//                 message: "Donations retrieved successfully",
//                 data: donations
//             });
//         });
// };

// // Fetch top 5 recent donations
// exports.recent = function (req, res) {
//     Donation.find()
//         .sort({_id: 'desc'})
//         .limit(5)
//         .exec(function (err, donations) {
//             if (err) {
//                 res.json({
//                     status: "error",
//                     message: err,
//                 });
//             }
//             res.json({
//                 status: "success",
//                 message: "Donations retrieved successfully",
//                 data: donations
//             });
//         });
// };

// // Fetch ONE donation leaderboard
// exports.leaderboardONE = function (req, res) {
//     Donation.find()
//         .where('currency').equals('ONE')
//         .sort({amount: 'desc'})
//         .limit(100)
//         .exec(function (err, donations) {
//             if (err) {
//                 res.json({
//                     status: "error",
//                     message: err,
//                 });
//             }
//             res.json({
//                 status: "success",
//                 message: "Donations retrieved successfully",
//                 data: donations
//             });
//         });
// };

// // Fetch XYA donation leaderboard
// exports.leaderboardXYA = function (req, res) {
//     Donation.find()
//         .where('currency').equals('XYA')
//         .sort({amount: 'desc'})
//         .limit(100)
//         .exec(function (err, donations) {
//             if (err) {
//                 res.json({
//                     status: "error",
//                     message: err,
//                 });
//             }
//             res.json({
//                 status: "success",
//                 message: "Donations retrieved successfully",
//                 data: donations
//             });
//         });
// };

// const streamerIdExists = (streamer_id) => {
//     Streamer.find()
//         .where('streamer_id').equals(streamer_id)
//         .exec(function (err, streamers) {
//             if (err) {
//                 res.json({
//                     status: "error",
//                     message: err,
//                 });
//             }
//             res.json({
//                 status: "success",
//                 message: "Donations retrieved successfully",
//                 data: donations
//             });
//         });
// }