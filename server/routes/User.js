const express = require('express');
const router = express.Router();
const userController = require('../controller/User');
const authMiddleware = require('../middlewares/authMiddleware');

// Get the list of all users (Admin-only, requires separate auth if needed)
router.route('/').get(userController.getUsers);

// Get the selected user Info (GET)
router.route('/:id').get(authMiddleware, userController.getUserById);

// Create a new user (Register) (POST)
router.route('/').post(userController.createUser);

// Update the selected user Info (PUT)
router.route('/:id').put(authMiddleware, userController.updateUser);

// Delete the selected user (DELETE)
router.route('/:id').delete(authMiddleware, userController.deleteUser);

// Delete all users
router.route('/').delete(userController.deleteAllUsers);

module.exports = router;
