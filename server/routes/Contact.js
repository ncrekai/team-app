const express = require('express');
const router = express.Router();
const contactController = require('../controller/Contact');

router.param('id', contactController.getContactById);

router.post('/', contactController.createContact);
router.get('/', contactController.getAllContacts);
router.get('/:id', contactController.read);
router.put('/:id', contactController.updateContact);
router.delete('/:id', contactController.deleteContact); // Delete by ID
router.delete('/', contactController.deleteAllContacts); // Delete all

module.exports = router;
