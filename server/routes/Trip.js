const express = require('express')
const router = express.Router();
const tripCntrl  = require('../controller/Trip')

// Middleware to handle `tripId` parameter
router.param('tripById', tripCntrl .tripById)

// Routes
router.route('/').get(tripCntrl .list) // GET
router.route('/:tripId').get(tripCntrl.read) // GET
router.route('/').post(tripCntrl.create) // POST
router.route('/:tripId').put(tripCntrl.update) // PUT
router.route('/:tripId').delete(tripCntrl.remove) // DELETE
router.route('/').delete(tripCntrl.removeAll) // DELETE

module.exports = router;
