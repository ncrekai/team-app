const express = require('express');
const router = express.Router();
const tripController = require('../controller/Trip');

// Middleware to get the trip by ID and populate req.trip
router.param('id', tripController.getTripById);

// Add a wishlist to a specific trip
router.put('/:tripId/trip-wishlists', tripController.addWishlistToTrip);

// Route to create a new trip (POST)
router.post('/', tripController.createTrip);

// Route to get all trips (GET)
router.get('/', tripController.getAllTrips);

// Route to get a specific trip by ID (GET)
router.get('/:id', tripController.read);

// Route to update a specific trip by ID (PUT)
router.put('/:id', tripController.updateTrip);

// Route to delete a specific trip by ID (DELETE)
router.delete('/:id', tripController.deleteTrip);

// Route to delete all trips (DELETE)
router.delete('/', tripController.deleteAllTrips);

module.exports = router;
