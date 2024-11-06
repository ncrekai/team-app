const User = require('../models/User.js');

const create = async(req,res) => {
    const { name, email, password } = req.body;
    // Check if required fields are missing
    if (!name || !email || !password) {
        return res.status(400).json({ error: "Name, email, and password are required." });
    }

    // Create a new User document from the request body
    const user = new User(req.body)
    try{
        await user.save()
        return res.json({ message:"Added Successfully" })
    } catch(err) {
        return res.json({ error: "I broke (model/user/create)" })
    }
}

const list = async(req,res)=>{
    try{
        let users = await User.find().select('name email updated created');
        res.json(users);
    } catch(err) {
        return res.json({ error: "I broke (model/user/list)" })
    }
}

const userById = async(req,res,next,id)=>{
    try{
        let user = await User.findById(id);
        if (!user) return res.json({ error:"User doesn't exist" })
        req.profile = user
        next()
    } catch(err) {
        return res.json({ error: "I broke (model/user/userById)" })
    }
}

const read = (req,res) =>{
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    return res.json(req.profile)
}

const update = async(req,res) => {
    try{
        let user = req.profile
        let merge = Object.assign(user, req.body)
        user.updated = Date.now()
        await user.save()
        user.hashed_password = undefined
        user.salt  = undefined
        res.json(user)
    } catch(err) {
        return res.json({ error: "I broke (model/user/update)" })
    }
}

const remove = async(req,res) => {
    try{
        let user = req.profile
        let deletedUser = await user.deleteOne()
        deletedUser.hashed_password = undefined
        deletedUser.salt = undefined
        res.json(deletedUser)
    } catch(err) {
        return res.json({ error: "I broke (model/user/remove)" })
    }
}

const removeAll = async(req,res) => {
    try{
        let users = await User.find()
        for (let user in users) {
            let deletedUser = await users[user].deleteOne()
            deletedUser.hashed_password = undefined
            deletedUser.salt = undefined
        }
    } catch(err) {
        return res.json({ error: "I broke (model/user/removeAll)" })
    }
}

module.exports = {create, list, userById, read, update, remove, removeAll}
