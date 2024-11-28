const User = require('../models/User');
const Profile = require('../models/Profile');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        console.log('Request body:', req.body);

        // Check required fields
        if (!username || !password || !email) {
            return res.status(400).json({ message: "Username, password, and email are required" });
        }

        // Create a new user
        const user = new User({ username, email, password });
        await user.save();

        // Create a new profile
        const profile = new Profile({ user: user._id, preferences: req.body.preferences || {}});
        await profile.save();

        // Update the user with the profile ID
        user.profile = profile._id;
        await user.save();

        res.json({ message: "User Created  successfully", user: user, profile: profile });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//get all users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        //formatted GET list for better clarity
        const formattedUsers = users.map(user => ({
            _id: user._id,
            username: user.username,
            email:user.email,
            password: user.password,
            created: user.created,
            updated: user.updated,
            trips: user.trips,
            savedTrips: user.savedTrips,
            __v: user.__v
        }));
        res.status(200).json(formattedUsers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//get user by his/her id
exports.getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Update user by ID
exports.updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const updateData = req.body;

        //Added password hashing directly to updateUser API
        //Unsure if its possible to call it from schema
        if (updateData.password) {
            const hashedPassword = await bcrypt.hash(updateData.password, 10);
            updateData.password = hashedPassword;
        }

        //Updates the user in mongoose
        //I believe new: true returns the updated mongoose document
        //Added runValidators due to hashedPassword portion of schema
        //but not sure if redundant given above ^
        const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
            new: true, 
            runValidators: true
        });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User Updated successfully", user: updatedUser });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete all users
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete all users
exports.deleteAllUsers = async (req, res) => {
    try {
        await User.deleteMany();
        res.status(200).json({ message: "All users deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
