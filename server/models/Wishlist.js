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
    createdAt: {
        type: Date,
        default: Date.now,
    },
    // Array of wishlist items for each specific wishlist.
    items: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'WishlistItem'
        }
    ],
    // to classify the wishlist as general/ trip
    type: {
        type: String,
        enum: ['general', 'trip'],
        required: true,
    }
});

const WishlistItem = mongoose.model('WishlistItem', WishlistItemSchema);
const Wishlist = mongoose.model('Wishlist', WishlistSchema);

module.exports = { WishlistItem, Wishlist };
