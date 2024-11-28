const express = require('express');
const router = express.Router();
const wishlistController = require('../controller/Wishlist');
const authMiddleware = require('../middlewares/authMiddleware');

// Create a new wishlist for the authenticated user (POST)
router.post('/', authMiddleware, wishlistController.createWishlist);

// Fetch general wishlists for the authenticated user (GET)
router.get('/general', authMiddleware, wishlistController.getGeneralWishlists);

// Fetch trip wishlists for the authenticated user (GET)
router.get('/trip', authMiddleware, wishlistController.getTripWishlists);

// Add an item to a specific wishlist. (POST)
router.post('/:wishlistId/items', authMiddleware, wishlistController.addWishlistItem);

// Update wishlist and wishlistItems by wishlist ID (PUT)
router.put('/:wishlistId', authMiddleware, wishlistController.updateWishlist);

// Delete all wishlists for the authenticated user (DELETE)
router.delete('/', authMiddleware, wishlistController.deleteAllWishlists);

// Delete a specific wishlist by ID (DELETE)
router.delete('/:wishlistId', authMiddleware, wishlistController.deleteWishlist);

// Delete an item from a specific wishlist (DELETE)
router.delete('/:wishlistId/items/:itemId', authMiddleware, wishlistController.deleteWishlistItem);

module.exports = router;