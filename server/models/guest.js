'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Guest = new Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        gender: { type: String, required: true },
        isChild: { type: Boolean, required: true },
        hasRsvp: { type: Boolean, required: true },
        isAttendingDay: { type: Boolean, required: true },
        isAttendingEvening: { type: Boolean, required: true },
        dietaryRequirements: { type: String, required: false }
    },
    { timestamps: true }
)

module.exports = mongoose.model('guest', Guest);