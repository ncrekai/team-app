const User = require('../models/User');
const Profile = require('../models/Profile');

exports.createUser = async (req, res) => {
    try {
        // Create a new user
        const user = new User(req.body);
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
        res.status(200).json(users);
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

//PUT
// Update user by ID
exports.updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const updateData = req.body;

        const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
            new: true, // Return the updated document
            runValidators: true // Validate before saving
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
