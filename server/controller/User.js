const User = require('../models/User.js');

const create = async(req,res) => {
    const { name, email, hashedPassword } = req.body;
    // Check if required fields are missing
    if (!name || !email || !hashedPassword) {
        return res.status(400).json({ error: "Name, email, and password are required." });
    }

    // Create a new User document from the request body
    const user = new User(req.body)
    try {
        await user.save()
        return res.json({ message:"User added successfully" })
    } catch(err) {
        return res.status(500).json({ error: err.message });
    }
}

const list = async(req,res)=> {
    try{
        // Find all users and select the fields to be returned
        let users = await User.find().select('name email updated created');
        res.json(users);
    } catch(err) {
        return res.status(500).json({ error: err.message });
    }
}

// Middleware to find a user by their ID
const userById = async(req, res, next, id)=> {
    try {
        // Find the user by their ID
        const user = await User.findById(id).populate('trips');
        if (!user) {
            return res.json({ error:"User doesn't exist" })
        }
        req.profile = user
        next()
    } catch(err) {
        return res.status(500).json({ error: err.message });
    }
}

const read = (req,res) => {
    req.profile.hashedPassword = undefined
    req.profile.salt = undefined
    return res.json(req.profile)
}

const update = async(req,res) => {
    try{
        let user = req.profile
        let merge = Object.assign(user, req.body)
        user.updated = Date.now()
        await user.save()
        user.hashedPassword = undefined
        user.salt  = undefined
        res.json(user)
    } catch(err) {
        return res.status(500).json({ error: err.message });
    }
}

const remove = async(req,res) => {
    try{
        let user = req.profile
        // Delete the user from the database
        let deletedUser = await user.deleteOne()
        deletedUser.hashedPassword = undefined
        deletedUser.salt = undefined
        res.json(deletedUser)
    } catch(err) {
        return res.status(500).json({ error: err.message });
    }
}

const removeAll = async(req,res) => {
    try{
        let users = await User.find()
        // Iterate over all users and delete each one
        for (let user of users) {
            let deletedUser = await user.deleteOne();
            deletedUser.hashedPassword = undefined;
            deletedUser.salt = undefined;
        }
        return res.json({ message: "All users have been deleted successfully." });

    } catch(err) {
        return res.status(500).json({ error: err.message });
    }
}

module.exports = {create, list, userById, read, update, remove, removeAll}
