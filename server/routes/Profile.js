const express = require('express');
const router = express.Router();
const profileController = require('../controller/Profile');
const authMiddleware = require('../middlewares/authMiddleware');

// Protect this route with the authentication middleware
router.get('/', authMiddleware, profileController.getProfile);

// update the profile of the user (PUT)
router.put('/', authMiddleware, profileController.updateProfile);

// add a saved trip to the user's profile (POST)
router.post('/savedTrips', authMiddleware, profileController.addSavedTrip);

// remove a saved trip from the user's profile (DELETE)
router.delete('/savedTrips', authMiddleware, profileController.removeSavedTrip);

module.exports = router;
