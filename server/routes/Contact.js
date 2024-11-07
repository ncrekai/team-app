const express = require('express');
const router = express.Router();
const contactController = require('../controller/Contact');

router.post('/', contactController.createContact);
router.get('/', contactController.getContacts);
router.get('/:id', contactController.getContactById);
router.put('/:id', contactController.updateContact);
router.delete('/:id', contactController.deleteContact); // Delete by ID
router.delete('/', contactController.deleteAllContacts); // Delete all
module.exports = router;
