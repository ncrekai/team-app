const User = require('../models/User');
const Profile = require('../models/Profile');

exports.createUser = async (req, res) => {
    try {
        const { username, email, password, preferences } = req.body;

        // Check required fields
        if (!username || !password || !email) {
            return res.status(400).json({ message: "Username, password, and email are required" });
        }

        // Create a new user
        const user = new User({ username, email, password });

        // Create and assign a profile to the user during registration
        const profile = new Profile({ user: user._id, preferences: preferences || {} });
        await profile.save(); // Save the profile

        user.profile = profile._id; // Assign the profile _id to the user
        await user.save(); // Save the user with the assigned profile

        // Return the response
        res.json({ message: "User and profile created successfully", user, profile });
    } catch (error) {
        console.error("Error creating user:", error);
        if (error.code === 11000) {
            return res.status(400).json({ message: "Duplicate entry found" });
        }
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
            tripWishlist: user.tripWishlist,
            generalWishlist: user.generalWishlist,
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
