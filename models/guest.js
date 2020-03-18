'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Guest = new Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: [String], required: true },
        gender: { type: Number, required: true },
        isChild: { type: Boolean, require: true }
    },
    { timestamps: true },
)

module.exports = mongoose.model('guest', Guest);