const express = require('express');
const router = express.Router();
const userController = require('../controller/User');

// get the list of all users (GET)
router.route('/').get(userController.getUsers);

// get a specific user by ID (GET)
router.route('/:id').get(userController.getUserById);

// create a new user (POST)
router.route('/').post(userController.createUser);

// update a specific user by ID (PUT)
router.route('/:id').put(userController.updateUser);

// delete a specific user by ID (DELETE)
router.route('/:id').delete(userController.deleteUser);

// delete all users (DELETE)
router.route('/').delete(userController.deleteAllUsers);

module.exports = router;