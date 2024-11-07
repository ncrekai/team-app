const Profile = require('../models/Profile');
const mongoose = require('mongoose');

// Find profile by user ID (from JWT token)
exports.getProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.userId }).populate('user');

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        return res.status(200).json(profile);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server Error' });
    }
};

// update the user's profile
exports.updateProfile = async (req, res) => {
    try {
        const updatedProfile = await Profile.findOneAndUpdate( { user: req.user.userId }, { $set: req.body });
        if (!updatedProfile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        return res.json({
            message: "Profile updated successfully",
            profile: updatedProfile
        });
    } catch (err) {
        return res.status(500).json({ message: err.message || "Error while updating profile" });
    }
};


// add a saved trip to the user's profile
exports.addSavedTrip = async (req, res) => {
    const { tripId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(tripId)) {
        return res.status(400).json({ message: 'Invalid Trip ID' });
    }

    try {
        // Find the user's profile
        const profile = await Profile.findOne({ user: req.user.userId });

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        // Check if the trip already exists in the saved trips
        if (profile.savedTrips.includes(tripId)) {
            return res.status(400).json({ message: 'Trip already saved' });
        }

        // Add the trip to the saved trips
        profile.savedTrips.push(tripId);
        await profile.save();

        return res.status(200).json({ message: 'Trip saved successfully', savedTrips: profile.savedTrips });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server Error' });
    }
};

// remove a saved trip from the user's profile
exports.removeSavedTrip = async (req, res) => {
    const { tripId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(tripId)) {
        return res.status(400).json({ message: 'Invalid Trip ID' });
    }

    try {
        // Find the user's profile
        const profile = await Profile.findOne({ user: req.user.userId });

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        // Remove the trip from the saved trips array
        const index = profile.savedTrips.indexOf(tripId);
        if (index === -1) {
            return res.status(400).json({ message: 'Trip not found in saved trips' });
        }

        profile.savedTrips.splice(index, 1);  // Remove the trip
        await profile.save();

        return res.status(200).json({ message: 'Trip removed from saved trips', savedTrips: profile.savedTrips });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server Error' });
    }
};
