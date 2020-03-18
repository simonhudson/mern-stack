'use strict';

const express = require('express');
const Controller = require('../controllers/guest');
const router = express.Router();

router.post('/guest', Controller.createGuest);
router.put('/guest/:id', Controller.updateGuest);
router.delete('/guest/:id', Controller.deleteGuest);
router.get('/guest/:id', Controller.getGuestById);
router.get('/guests', Controller.getGuests);

module.exports = router;