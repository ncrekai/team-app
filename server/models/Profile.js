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
            ref: 'Wishlist'  //  a wishlist for a planned trip
        }],
        // Travel Preference
        preferences: {
            destinations: {
                type: [String],  // Array of destination names or IDs
                //default: [],     // Default empty array
                enum: ['cities', 'countryside', 'cold climate', 'warm climate', 'family-oriented', 'beaches'],
            },
            travelType: {
                type: String,
                enum: ['outdoors', 'roadtrip', 'all-inclusive', 'tours', 'other'],
                //default: [],
            },
            accommodation: {
                type: String,
                enum: ['camping', 'hotel', 'hostel', 'residential rental', 'resort', 'farm stays', 'other'],
                //default: [],
            },
            activities: {
                type: [String],
                enum: ['scenic hikes', 'food and drink', 'museums and galleries', 'historic sites', 'shopping', 'festivals', 'spas', 'guided tours', 'outdoor adventures'],
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
