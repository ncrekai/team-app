const Contact = require('../models/Contact.js');

const create = async(req,res) => {
    const contact = new Contact(req.body)
    try{
        await contact.save()
        return res.json({ message:"Added Successfully" })
    } catch(err) {
        return res.json({ error: "I broke (model/contact/create)" })
    }
}

const list = async(req,res)=>{
    try{
        let contacts = await Contact.find().select('firstname lastname email');
        res.json(contacts);
    } catch(err) {
        return res.json({ error: "I broke (model/contact/list)" })
    }
}

const contactById = async(req,res,next,id)=>{
    try{
        let contact = await Contact.findById(id);
        if (!contact) return res.json({ error:"Contact doesn't exist" })
        req.profile = contact
        next()
    } catch(err) {
        return res.json({ error: "I broke (model/contact/contactById)" })
    }
}

const read = (req,res) =>{
    return res.json(req.profile)
}

const update = async(req,res) => {
    try{
        let contact = req.profile
        let merge = Object.assign(contact, req.body)
        await contact.save()
        res.json(contact)
    } catch(err) {
        return res.json({ error: "I broke (model/contact/update)" })
    }
}

const remove = async(req,res) => {
    try{
        let contact = req.profile
        let deletedContact = await contact.deleteOne()
        res.json(deletedContact)
    } catch(err) {
        return res.json({ error: "I broke (model/contact/remove)" })
    }
}

const removeAll = async(req,res) => {
    try{
        let contacts = await Contact.find()
        console.log(contacts)
        for (let contact in contacts) {
            let deletedContact = await contacts[contact].deleteOne()
        }
    } catch(err) {
        return res.json({ error: "I broke (model/contact/removeAll)" })
    }
}

module.exports = {create, list, contactById, read, update, remove, removeAll}
