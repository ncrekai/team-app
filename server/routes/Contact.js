const contactCntrl = require('../controller/Contact.js')
const express = require('express')
const router = express.Router();

router.param('contactId', contactCntrl.contactById)

router.route('/').get(contactCntrl.list) // GET
router.route('/:contactId').get(contactCntrl.read) // GET
router.route('/').post(contactCntrl.create) // POST
router.route('/:contactId').put(contactCntrl.update) // PUT
router.route('/:contactId').delete(contactCntrl.remove) // DELETE
router.route('/').delete(contactCntrl.removeAll) // DELETE

module.exports = router;
