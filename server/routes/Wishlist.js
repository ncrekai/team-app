const express = require('express');
const router = express.Router();
const wishlistController = require('../controller/Wishlist');

// Routes for managing wishlists for a specific user
// Add a new wishlist to a user
router.post('/users/:userId/wishlists', wishlistController.addWishlist);

// Get all wishlists for a user
router.get('/users/:userId/wishlists', wishlistController.getWishlists);

// Get a specific wishlist by ID
router.get('/wishlists/:wishlistId', wishlistController.getWishlistById);

// Update a wishlist
router.put('/users/:userId/wishlists/:wishlistId', wishlistController.updateWishlist);

// Delete a wishlist
router.delete('/users/:userId/wishlists/:wishlistId', wishlistController.deleteWishlist);

// Routes for managing wishlist items
// Add an item to a wishlist
router.post('/users/:userId/wishlists/:wishlistId/items', wishlistController.addWishlistItem);

// Delete an item from a wishlist
router.delete('/users/:userId/wishlists/:wishlistId/items/:itemId', wishlistController.deleteWishlistItem);

module.exports = router;
