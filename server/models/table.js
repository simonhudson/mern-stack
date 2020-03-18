'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Table = new Schema(
    {
        people: { type: [String], required: true },
        number: { type: Number, required: true }
    },
    { timestamps: true }
)

module.exports = mongoose.model('table', Table);