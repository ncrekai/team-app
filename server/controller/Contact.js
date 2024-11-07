const Contact = require('../models/Contact.js');

// Create a new contact
exports.createContact = async (req, res) => {
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
exports.getContacts = async(req,res)=> {
    try {
        let contacts = await Contact.find().select('firstname lastname email');
        res.json(contacts);
    } catch(err) {
        return res.status(500).json({ error: err.message || "Error while retrieving contacts" });
    }
}

// Get a specific contact by ID
exports.getContactById = async(req,res,next,id)=> {
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
exports.read = (req,res) => {
    return res.status(200).json(req.profile);
}

// Update a contact
exports.updateContact = async(req,res) => {
    try {
        let contact = req.profile
        let merge = Object.assign(contact, req.body)
        await contact.save()
        res.json(contact)
    } catch(err) {
        return res.status(500).json({ error: err.message || "Error while updating contact" });
    }
}

// Delete a contact by ID
exports.deleteContact = async(req,res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.profile._id);
        if (!contact) {
            return res.status(404).json({ message: "Contact not found" });
        }
        res.status(200).json({ message: "Contact deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deleteAllContacts = async(req,res) => {
    try {
        await Contact.deleteMany();
        res.status(200).json({ message: "All Contacts deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}
