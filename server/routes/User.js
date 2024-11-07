const express = require('express');
const router = express.Router();
const userCntrl = require('../controller/User');
const authMiddleware = require('../middlewares/authMiddleware');

// get the list of all users (GET)
router.route('/').get(userCntrl.getUsers);

// get a specific user by ID (GET)
router.route('/:id').get(userCntrl.getUserById);

// create a new user (POST)
router.route('/').post(userCntrl.createUser);

// update a specific user by ID (PUT)
router.route('/:id').put(userCntrl.updateUser);

// delete a specific user by ID (DELETE)
router.route('/:id').delete(userCntrl.deleteUser);

// delete all users (DELETE)
router.route('/').delete(userCntrl.deleteAllUsers);

module.exports = router;