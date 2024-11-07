const express= require('express')
const router = express.Router();
const userCntrl = require('../controller/User')

router.param('userId', userCntrl.userById);

router.route('/').get(userCntrl.list) // GET
router.route('/:userId').get(userCntrl.read) // GET
router.route('/').post(userCntrl.create) // POST
router.route('/:userId').put(userCntrl.update) // PUT
router.route('/:userId').delete(userCntrl.remove) // DELETE
router.route('/').delete(userCntrl.removeAll) // DELETE

module.exports = router;