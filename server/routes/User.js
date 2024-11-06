const userCntrl = require('../controller/User.js')
const express = require('express')
const router = express.Router();

router.param('tripId', userCntrl.userById);

router.route('/api/users').get(userCntrl.list) // GET
router.route('/api/users/:userId').get(userCntrl.read) // GET
router.route('/api/users').post(userCntrl.create) // POST
router.route('/api/users/:userId').put(userCntrl.update) // PUT
router.route('/api/users/:userId').delete(userCntrl.remove) // DELETE
router.route('/api/users').delete(userCntrl.removeAll) // DELETE

module.exports = router;
