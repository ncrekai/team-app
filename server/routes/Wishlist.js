const express = require('express');
const router = express.Router();
const wishlistController = require('../controller/Wishlist');

// Create a new wishlist for specific user (POST)
router.post('/:userId', wishlistController.createWishlist);

// Fetch general wishlists for a user (GET)
router.get('/general/:userId', wishlistController.getGeneralWishlists);

router.delete('/:userId', wishlistController.deleteWishlists);

module.exports = router;
