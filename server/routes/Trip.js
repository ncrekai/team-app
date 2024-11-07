const express = require('express');
const router = express.Router();
const tripController = require('../controller/Trip');

router.post('/', tripController.createTrip);
router.get('/', tripController.getAllTrips);
router.get('/:id', tripController.getTripById);
router.put('/:id', tripController.updateTrip);
router.delete('/:id', tripController.deleteTrip); // Delete by ID
router.delete('/', tripController.deleteAllTrips); // Delete all
module.exports = router;
