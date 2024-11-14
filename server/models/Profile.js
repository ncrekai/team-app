const mongoose = require('mongoose');

// Define the Profile Schema
const profileSchema = new mongoose.Schema(
    {
        // Relationship to the User model
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true,  // A user can only have one profile
        },
        tripWishlist: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Wishlist'  // Reference to wishlist items for a trip
        }],
        // Travel Preference
        preferences: {
            destinations: {
                type: [String],  // Array of destination names or IDs
                default: [],     // Default empty array
            },
            travelType: {
                type: String,
                default: '',
            },
            accommodation: {
                type: String,
                default: '',
            },
            activities: {
                type: [String],
                default: [],
            },
        },
        // Profile Picture
        profilePicture: {
            type: String,
            default: '',  // Empty string if no picture uploaded
        },

    },
    { timestamps: true }  // Adds createdAt and updatedAt fields automatically
);

// Create and export the Profile model
module.exports = mongoose.model('Profile', profileSchema);
