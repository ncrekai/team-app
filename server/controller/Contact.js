const Contact = require('../models/Contact.js');

// Create a new contact
const create = async (req, res) => {
    const { firstName, lastName, email, phone, user, trip } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !user) {
        return res.status(400).json({ error: "firstName, lastName, email, phone, and user are required." });
    }

    try {
        const contact = new Contact({ firstName, lastName, email, phone, user, trip });
        await contact.save();
        return res.status(201).json({ message: "Contact added successfully", contact });
    } catch (err) {
        return res.status(500).json({ error: err.message || "Error while adding contact" });
    }
};

// List all contacts for a user
const list = async(req,res)=> {
    try {
        let contacts = await Contact.find().select('firstname lastname email');
        res.json(contacts);
    } catch(err) {
        return res.status(500).json({ error: err.message || "Error while retrieving contacts" });
    }
}

// Get a specific contact by ID
const contactById = async(req,res,next,id)=> {
    try {
        let contact = await Contact.findById(id);
        if (!contact) return res.json({ error:"Contact doesn't exist" })
        req.profile = contact
        next()
    } catch(err) {
        return res.json({ error: "I broke (model/contact/contactById)" })
    }
}

// Read a specific contact
const read = (req,res) => {
    return res.status(200).json(req.profile);
}

// Update a contact
const update = async(req,res) => {
    try {
        let contact = req.profile
        let merge = Object.assign(contact, req.body)
        await contact.save()
        res.json(contact)
    } catch(err) {
        return res.status(500).json({ error: err.message || "Error while updating contact" });
    }
}

// Delete a contact
const remove = async(req,res) => {
    try {
        let contact = req.profile
        let deletedContact = await contact.deleteOne()
        return res.status(200).json({ message: "Contact deleted successfully", deletedContact });
    } catch(err) {
        return res.status(500).json({ error: err.message || "Error while deleting contact" });
    }
}

const removeAll = async(req,res) => {
    try {
        const result = await Contact.deleteMany({ user: req.params.userId });
        return res.status(200).json({ message: `${result.deletedCount} contacts deleted` });
    } catch (err) {
        return res.status(500).json({ error: err.message || "Error while deleting all contacts" });
    }
}

module.exports = {create, list, contactById, read, update, remove, removeAll}
