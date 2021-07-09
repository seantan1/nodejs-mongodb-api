// imageController.js
// Import image model
Image = require('../models/imageModel');
// Handle index actions
exports.index = function (req, res) {
    if (req.body.apikey == process.env.PRIVATE_API_KEY) {
        Image.get(function (err, images) {
            if (err) {
                res.json({
                    status: "error",
                    message: err,
                });
            }
            res.json({
                status: "success",
                message: "Images retrieved successfully",
                data: images
            });
        });
    }
    else {
        res.json('Not authorised');
    }
};
// Handle create image actions
exports.new = function (req, res) {
    if (req.body.apikey == process.env.PRIVATE_API_KEY) {
        var image = new Image();
        image.streamer_id = req.body.streamer_id ? req.body.streamer_id : image.streamer_id;
        image.image_link = req.body.image_link;
        // save the image and check for errors
        image.save(function (err) {
            // Check for validation error
            if (err)
                res.json(err);
            else
                res.json({
                    message: 'New image created!',
                    data: image
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
        Image.findById(req.params.image_id, function (err, image) {
            if (err)
                res.send(err);
            res.json({
                message: 'image details loading..',
                data: image
            });
        });
    }
    else {
        res.json('Not authorised');
    }
};
// Handle update image info
exports.update = function (req, res) {
    if (req.body.apikey == process.env.PRIVATE_API_KEY) {
        Image.findById(req.params.image_id, function (err, image) {
            if (err)
                res.send(err);
            image.streamer_id = req.body.streamer_id ? req.body.streamer_id : image.streamer_id;
            image.image_link = req.body.image_link;
            // save the image and check for errors
            image.save(function (err) {
                if (err)
                    res.json(err);
                res.json({
                    message: 'image Info updated',
                    data: image
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
        Image.remove({
            _id: req.params.image_id
        }, function (err, image) {
            if (err)
                res.send(err);
            res.json({
                status: "success",
                message: 'image deleted'
            });
        });
    }
    else {
        res.json('Not authorised');
    }
};

// Handle fetch all currencies by streamer_id
exports.fetchImagesByStreamerId = function (req, res) {
    if (req.body.apikey == process.env.PRIVATE_API_KEY) {
        Image.find()
        .where('streamer_id').equals(req.body.streamer_id)
        .exec(function (err, images) {
            if (err) {
                res.json({
                    status: "error",
                    message: err,
                });
            }
            res.json({
                status: "success",
                message: "Images retrieved successfully",
                data: images
            });
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

// const imageIdExists = (image_id) => {
//     image.find()
//         .where('image_id').equals(image_id)
//         .exec(function (err, images) {
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