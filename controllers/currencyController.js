// currencyController.js
// Import currency model
Currency = require('../models/currencyModel');
// Handle index actions
exports.index = function (req, res) {
    if (req.body.apikey == process.env.PRIVATE_API_KEY) {
        Currency.get(function (err, currencies) {
            if (err) {
                res.json({
                    status: "error",
                    message: err,
                });
            }
            res.json({
                status: "success",
                message: "currencies retrieved successfully",
                data: currencies
            });
        });
    }
    else {
        res.json('Not authorised');
    }
};
// Handle create currency actions
exports.new = function (req, res) {
    if (req.body.apikey == process.env.PRIVATE_API_KEY) {
        var currency = new Currency();
        currency.streamer_id = req.body.streamer_id ? req.body.streamer_id : currency.streamer_id;
        currency.currency_symbol = req.body.currency_symbol;
        currency.currency_address = req.body.currency_address;
        currency.currency_threshold = req.body.currency_threshold;
        // save the currency and check for errors
        currency.save(function (err) {
            // Check for validation error
            if (err)
                res.json(err);
            else
                res.json({
                    message: 'New currency created!',
                    data: currency
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
        Currency.findById(req.params.currency_id, function (err, currency) {
            if (err)
                res.send(err);
            res.json({
                message: 'currency details loading..',
                data: currency
            });
        });
    }
    else {
        res.json('Not authorised');
    }
};
// Handle update currency info
exports.update = function (req, res) {
    if (req.body.apikey == process.env.PRIVATE_API_KEY) {
        Currency.findById(req.params.currency_id, function (err, currency) {
            if (err)
                res.send(err);
            currency.streamer_id = req.body.streamer_id ? req.body.streamer_id : currency.streamer_id;
            currency.currency_symbol = req.body.currency_symbol;
            currency.currency_address = req.body.currency_address;
            currency.currency_threshold = req.body.currency_threshold;
            // save the currency and check for errors
            currency.save(function (err) {
                if (err)
                    res.json(err);
                res.json({
                    message: 'currency Info updated',
                    data: currency
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
        Currency.remove({
            _id: req.params.currency_id
        }, function (err, currency) {
            if (err)
                res.send(err);
            res.json({
                status: "success",
                message: 'currency deleted'
            });
        });
    }
    else {
        res.json('Not authorised');
    }
};

// Handle fetch all currencies by streamer_id
exports.fetchCurrenciesByStreamerId = function (req, res) {
    if (req.body.apikey == process.env.PRIVATE_API_KEY) {
        Currency.find()
        .where('streamer_id').equals(req.body.streamer_id)
        .exec(function (err, currencies) {
            if (err) {
                res.json({
                    status: "error",
                    message: err,
                });
            }
            res.json({
                status: "success",
                message: "Currencies retrieved successfully",
                data: currencies
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

// const currencyIdExists = (currency_id) => {
//     currency.find()
//         .where('currency_id').equals(currency_id)
//         .exec(function (err, currencys) {
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