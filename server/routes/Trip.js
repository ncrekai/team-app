const tripCntrl  = require('../controller/Trip')
const express = require('express')
const router = express.Router();

// Middleware to handle `tripId` parameter
router.param('tripById', tripCntrl .tripById)

// Routes
router.route('/api/trips').get(tripCntrl .list) // GET
router.route('/api/trips/:tripId').get(tripCntrl.read) // GET
router.route('/api/trips').post(tripCntrl.create) // POST
router.route('/api/trips/:tripId').put(tripCntrl.update) // PUT
router.route('/api/trips/:tripId').delete(tripCntrl.remove) // DELETE
router.route('/api/trips').delete(tripCntrl.removeAll) // DELETE

module.exports = router;
