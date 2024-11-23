const express = require('express');
const router = express.Router();
const wishlistController = require('../controller/Wishlist');

// Create a new wishlist for specific user (POST)
router.post('/:userId', wishlistController.createWishlist);

// Fetch general wishlists for a user (GET)
router.get('/general/:userId', wishlistController.getGeneralWishlists);

// Fetch trip wishlists for a user (GET)
router.get('/trip/:userId', wishlistController.getTripWishlists);

// Add an item to a specific wishlist. (POST)
router.post('/:wishlistId/items', wishlistController.addWishlistItem);

// Update wishlist and wishlistItems by wishlist ID (PUT)
router.put('/:userId/:wishlistId', wishlistController.updateWishlist);

router.delete('/:userId', wishlistController.deleteWishlists);

module.exports = router;
