const express = require('express');
const router = express.Router();
const wishlistController = require('../controller/Wishlist');

// Routes for managing wishlists for a specific user
// Add a new wishlist to a user, specifying type as 'general' or 'trip'
router.post('/users/:userId/:type(general-wishlists|trip-wishlists)', wishlistController.addWishlist);

// Get all wishlists for a user by type ('general' for general wishlists, 'trip' for trip-specific)
router.get('/users/:userId/:type(wishlists|trip-wishlists)', wishlistController.getWishlists);

// Get a specific wishlist by ID
router.get('/:type(wishlists|trip-wishlists)/:wishlistId', wishlistController.getWishlistById);

// Update a wishlist by type
router.put('/users/:userId/:type(wishlists|trip-wishlists)/:wishlistId', wishlistController.updateWishlist);

// Delete a wishlist by type
router.delete('/users/:userId/:type(wishlists|trip-wishlists)/:wishlistId', wishlistController.deleteWishlist);

// Routes for managing wishlist items
// Add an item to a wishlist by type
router.post('/users/:userId/:type(wishlists|trip-wishlists)/:wishlistId/items', wishlistController.addWishlistItem);

// Delete an item from a wishlist by type
router.delete('/users/:userId/:type(wishlists|trip-wishlists)/:wishlistId/items/:itemId', wishlistController.deleteWishlistItem);

module.exports = router;
