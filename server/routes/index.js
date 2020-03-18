'use strict';

const express = require('express');
const controller = {
    guest: require('../controllers/guest'),
    table: require('../controllers/table')
};
const router = express.Router();

router.post('/guest', controller.guest.createGuest);
router.put('/guest/:id', controller.guest.updateGuest);
router.delete('/guest/:id', controller.guest.deleteGuest);
router.get('/guest/:id', controller.guest.getGuestById);
router.get('/guests', controller.guest.getGuests);

router.post('/table', controller.table.createTable);
router.put('/table/:number', controller.table.updateTable);
router.delete('/table/:number', controller.table.deleteTable);
router.get('/table/:number', controller.table.getTableByNumber);
router.get('/tables', controller.table.getTables);

module.exports = router;