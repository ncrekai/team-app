const express = require('express');
const router = express.Router();
const contactController = require('../controller/Contact');

router.param('contactId', contactController.getContactById);

router.post('/', contactController.createContact);
router.get('/', contactController.getAllContacts);
router.get('/:contactId', contactController.read);
router.put('/:contactId', contactController.updateContact);
router.delete('/:contactId', contactController.deleteContact); // Delete by ID
router.delete('/', contactController.deleteAllContacts); // Delete all

module.exports = router;
