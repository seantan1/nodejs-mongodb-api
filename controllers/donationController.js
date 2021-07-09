// donationController.js
// Import donation model
Donation = require('../models/donationModel');
// Handle index actions
exports.index = function (req, res) {
    if (req.body.apikey === process.env.PRIVATE_API_KEY) {
        Donation.get(function (err, donations) {
            if (err) {
                res.json({
                    status: "error",
                    message: err,
                });
            }
            res.json({
                status: "success",
                message: "Donations retrieved successfully",
                data: donations
            });
        });
    }
    else {
        res.json('Not authorised');
    }
};
// Handle create donation actions
exports.new = function (req, res) {
    if (req.body.apikey == process.env.PRIVATE_API_KEY) {
        var donation = new Donation();
        donation.donor = req.body.donor ? req.body.donor : donation.donor;
        donation.amount = req.body.amount;
        donation.currency = req.body.currency;
        donation.txlink = req.body.txlink;
        donation.streamer_id = req.body.streamer_id;
        // save the donation and check for errors
        donation.save(function (err) {
            // Check for validation error
            if (err)
                res.json(err);
            else
                res.json({
                    message: 'New donation created!',
                    data: donation
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
        Donation.findById(req.params.donation_id, function (err, donation) {
            if (err)
                res.send(err);
            res.json({
                message: 'Donation details loading..',
                data: donation
            });
        });
    }
    else {
        res.json('Not authorised');
    }
};
// Handle update donation info
exports.update = function (req, res) {
    if (req.body.apikey == process.env.PRIVATE_API_KEY) {
        Donation.findById(req.params.donation_id, function (err, donation) {
            if (err)
                res.send(err);
            donation.donor = req.body.donor ? req.body.donor : donation.donor;
            donation.amount = req.body.amount;
            donation.currency = req.body.currency;
            donation.txlink = req.body.txlink;
            donation.streamer_id = req.body.streamer_id;
            // save the donation and check for errors
            donation.save(function (err) {
                if (err)
                    res.json(err);
                res.json({
                    message: 'Donation Info updated',
                    data: donation
                });
            });
        });
    }
    else {
        res.json('Not authorised');
    };
}
// Handle delete donation
exports.delete = function (req, res) {
    if (req.body.apikey == process.env.PRIVATE_API_KEY) {
        Donation.remove({
            _id: req.params.donation_id
        }, function (err, donation) {
            if (err)
                res.send(err);
            res.json({
                status: "success",
                message: 'Donation deleted'
            });
        });
    }
    else {
        res.json('Not authorised');
    };
};

// Custom queries
// Fetch top 5 donation amount of a certain currency from a certain streamer id
exports.top = function (req, res) {
    if (req.body.apikey == process.env.PRIVATE_API_KEY) {
        Donation.find()
            .where('streamer_id').equals(req.body.streamer_id)
            .where('currency').equals(req.body.currency)
            .sort({ amount: 'desc' })
            .limit(5)
            .exec(function (err, donations) {
                if (err) {
                    res.json({
                        status: "error",
                        message: err,
                    });
                }
                res.json({
                    status: "success",
                    message: "Donations retrieved successfully",
                    data: donations
                });
            });
    }
    else {
        res.json('Not authorised');
    };
};

// Fetch top 5 recent donations
exports.recent = function (req, res) {
    if (req.body.apikey == process.env.PRIVATE_API_KEY) {
        Donation.find()
            .where('streamer_id').equals(req.body.streamer_id)
            .sort({ _id: 'desc' })
            .limit(5)
            .exec(function (err, donations) {
                if (err) {
                    res.json({
                        status: "error",
                        message: err,
                    });
                }
                res.json({
                    status: "success",
                    message: "Donations retrieved successfully",
                    data: donations
                });
            });
    }
    else {
        res.json('Not authorised');
    };
};

// Fetch top100 donation leaderboard
exports.leaderboard = function (req, res) {
    if (req.body.apikey == process.env.PRIVATE_API_KEY) {
        Donation.find()
            .where('streamer_id').equals(req.body.streamer_id)
            .where('currency').equals(req.body.currency)
            .sort({ amount: 'desc' })
            .limit(100)
            .exec(function (err, donations) {
                if (err) {
                    res.json({
                        status: "error",
                        message: err,
                    });
                }
                res.json({
                    status: "success",
                    message: "Donations retrieved successfully",
                    data: donations
                });
            });
    }
    else {
        res.json('Not authorised');
    };
};