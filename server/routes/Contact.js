const contactCntrl = require('../controller/Contact.js')
const express = require('express')
const router = express.Router();

router.param('contactId', contactCntrl.contactById)

router.route('/api/contacts').get(contactCntrl.list) // GET
router.route('/api/contacts/:contactId').get(contactCntrl.read) // GET
router.route('/api/contacts').post(contactCntrl.create) // POST
router.route('/api/contacts/:contactId').put(contactCntrl.update) // PUT
router.route('/api/contacts/:contactId').delete(contactCntrl.remove) // DELETE
router.route('/api/contacts').delete(contactCntrl.removeAll) // DELETE

module.exports = router;
