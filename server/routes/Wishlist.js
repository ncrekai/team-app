const express = require('express');
const router = express.Router();
const wishlistController = require('../controller/Wishlist');

// Routes for managing wishlists for a specific user
// Add a new wishlist to user
router.post('/users/:userId/', wishlistController.addWishlist);

// Get all wishlists for user
router.get('/users/:userId/', wishlistController.getWishlists);

// Get a specific wishlist by ID
router.get('/:wishlistId', wishlistController.getWishlistById);

// Update a wishlist
router.put('/:wishlistId', wishlistController.updateWishlist);

// Delete a wishlist
router.delete('/users/:userId/:wishlistId', wishlistController.deleteWishlist);


// Routes for managing wishlist items
// Add an item to a wishlist
router.post('/:wishlistId/item', wishlistController.addWishlistItem);

// Delete an item from a wishlist
router.delete('/:wishlistId/item/:itemId', wishlistController.deleteWishlistItem);

module.exports = router;
