const express = require('express');
const router = express.Router();
const tripController = require('../controller/Trip');
const authMiddleware = require('../middlewares/authMiddleware');

// Create a new trip
router.post('/', authMiddleware, tripController.createTrip);

// Get all trips
router.get('/', authMiddleware, tripController.getAllTrips);

// Get trips for the user
router.get('/user', authMiddleware, tripController.getUserTrips);

// Get a specific trip by tripId
router.get('/:tripId', authMiddleware, tripController.getTripById);

// Update a specific trip
router.put('/:tripId', authMiddleware, tripController.updateTrip);

// Add a wishlist to a specific trip
router.put('/:tripId/trip-wishlists', authMiddleware, tripController.addWishlistToTrip);

// Delete a specific trip
router.delete('/:tripId', authMiddleware, tripController.deleteTrip);

// Delete all trips for the logged-in user
router.delete('/', authMiddleware, tripController.deleteAllTrips);

module.exports = router;
