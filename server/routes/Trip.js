const tripCntrl  = require('../controller/Trip')
const express = require('express')
const router = express.Router();

// Middleware to handle `tripId` parameter
router.param('contactId', tripCntrl .tripById)

// Routes
router.route('/api/trips').get(tripCntrl .list) // GET
router.route('/api/trips/:tripId').get(tripById.read) // GET
router.route('/api/trips').post(tripById.create) // POST
router.route('/api/trips/:tripId').put(tripById.update) // PUT
router.route('/api/trips/:tripId').delete(tripById.remove) // DELETE
router.route('/api/trips').delete(tripById.removeAll) // DELETE

module.exports = router;
