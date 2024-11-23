const express = require('express');
const router = express.Router();
const wishlistController = require('../controller/Wishlist');

// Fetch general wishlists for a user (GET)
router.get('/general/:userId', wishlistController.getGeneralWishlists);

module.exports = router;
