'use strict';

const Guest = require('../models/guest');

const createGuest = (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a guest',
        });
    }

    const guest = new Guest(body);

    if (!guest) {
        return res.status(400).json({ success: false, error: err });
    }

    guest
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: guest._id,
                message: 'Guest created!',
            });
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Guest not created!',
            })
        });
}

const updateGuest = async (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        });
    }

    Guest.findOne({ _id: req.params.id }, (err, guest) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Guest not found!',
            });
        }
        guest.name = body.name;
        guest.time = body.time;
        guest.rating = body.rating;
        guest
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: guest._id,
                    message: 'Guest updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Guest not updated!',
                })
            });
    });
}

const deleteGuest = async (req, res) => {
    await Guest.findOneAndDelete({ _id: req.params.id }, (err, guest) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }

        if (!guest) {
            return res
                .status(404)
                .json({ success: false, error: `Guest not found` });
        }

        return res.status(200).json({ success: true, data: guest });
    }).catch(err => console.log(err));
}

const getGuestById = async (req, res) => {
    await Guest.findOne({ _id: req.params.id }, (err, guest) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }

        if (!guest) {
            return res
                .status(404)
                .json({ success: false, error: `Guest not found` });
        }
        return res.status(200).json({ success: true, data: guest });
    }).catch(err => console.log(err));
}

const getGuests = async (req, res) => {
    await Guest.find({}, (err, guests) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        if (!guests.length) {
            return res
                .status(404)
                .json({ success: false, error: `Guest not found` });
        }
        return res.status(200).json({ success: true, data: guests });
    }).catch(err => console.log(err));
}

module.exports = {
    createGuest,
    updateGuest,
    deleteGuest,
    getGuests,
    getGuestById,
}