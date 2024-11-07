const express = require('express');
const router = express.Router();
const tripController = require('../controller/Trip');

router.param('tripId', tripController.getTripById);

router.post('/', tripController.createTrip);
router.get('/', tripController.getAllTrips);
router.get('/:tripId', tripController.read);
router.put('/:tripId', tripController.updateTrip);
router.delete('/:tripId', tripController.deleteTrip); // Delete by ID
router.delete('/', tripController.deleteAllTrips); // Delete all

module.exports = router;
