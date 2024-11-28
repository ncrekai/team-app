const mongoose = require('mongoose');

const WishlistItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        trim: true,
    },
    type: {
        type: String,
        // will be helpful in filtering
        enum: ['landmark', 'activity', 'restaurant', 'hotel', 'other'],
        default: 'other',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending', // if the user has completed the item or not
    }
});

const WishlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['general', 'trip'],
        required: true,
    },
    tripId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trip',
        default: null
    },
    items: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'WishlistItem'
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const WishlistItem = mongoose.model('WishlistItem', WishlistItemSchema);
const Wishlist = mongoose.model('Wishlist', WishlistSchema);

module.exports = { WishlistItem, Wishlist };
