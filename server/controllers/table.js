'use strict';

const Table = require('../models/table');

const createTable = (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a table',
        });
    }

    const table = new Table(body);

    if (!table) {
        return res.status(400).json({ success: false, error: err });
    }

    table
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: table._id,
                message: 'Table created!',
            });
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Table not created!',
            })
        });
}

const updateTable = async (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        });
    }

    Table.findOne({ number: req.params.number }, (err, table) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Table not found!',
            });
        }
        const fields = ['number', 'people'];
        fields.forEach(field => table[field] = body[field]);
        table
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: table._id,
                    message: 'Table updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Table not updated!',
                })
            });
    });
}

const deleteTable = async (req, res) => {
    await Table.findOneAndDelete({ number: req.params.number }, (err, table) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }

        if (!table) {
            return res
                .status(404)
                .json({ success: false, error: `Table not found` });
        }

        return res.status(200).json({ success: true, data: table });
    }).catch(err => console.log(err));
}

const getTableByNumber = async (req, res) => {
    await Table.findOne({ number: req.params.number }, (err, table) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }

        if (!table) {
            return res
                .status(404)
                .json({ success: false, error: `Table not found` });
        }
        return res.status(200).json({ success: true, data: table });
    }).catch(err => console.log(err));
}

const getTables = async (req, res) => {
    await Table.find({}, (err, tables) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        if (!tables.length) {
            return res
                .status(404)
                .json({ success: false, error: `Table not found` });
        }
        return res.status(200).json({ success: true, data: tables });
    }).catch(err => console.log(err));
}

module.exports = {
    createTable,
    updateTable,
    deleteTable,
    getTables,
    getTableByNumber,
}