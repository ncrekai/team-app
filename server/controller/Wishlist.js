const { Wishlist, WishlistItem } = require('../models/Wishlist');
const User = require('../models/User');
const Trip = require('../models/Trip');

// Create new wishlist (POST)
exports.createWishlist = async (req, res) => {
    const { userId } = req.params;
    const { name, items = [], type, tripId } = req.body;

    // Ensure wishlist type is valid
    const validTypes = ['general', 'trip'];
    if (!validTypes.includes(type)) {
        return res.status(400).json({ message: 'Invalid wishlist type' });
    }

    // Validate tripId if type is 'trip'
    if (type === 'trip' && !tripId) {
        return res.status(400).json({ message: "Trip ID is required for a trip wishlist." });
    }

    try {
        // Create WishlistItems
        const wishlistItems = await Promise.all(items.map(async (itemData) => {
            const wishlistItem = new WishlistItem(itemData);
            await wishlistItem.save();
            return wishlistItem._id;
        }));

        // Create Wishlist
        const wishlist = new Wishlist({
            name,
            type,
            tripId: type === 'trip' ? tripId : null,
            items: wishlistItems,
        });

        await wishlist.save();

        // Update user's generalWishlist or tripWishlist
        const updateField = type === 'general' ? 'generalWishlist' : 'tripWishlist';

        // Directly update the user's wishlist field
        const user = await User.findByIdAndUpdate(userId, {
            $push: { [updateField]: wishlist }
        }, { new: true });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(201).json({
            message: 'Wishlist created successfully',
            wishlist,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Failed to create wishlist',
            error: error.message,
        });
    }
};

// Get general wishlists
exports.getGeneralWishlists = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId).populate('generalWishlist');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'General wishlists fetched successfully',
            wishlists: user.generalWishlist,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Failed to fetch general wishlists',
            error: error.message,
        });
    }
};

// Get trip wishlists
exports.getTripWishlists = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId).populate('tripWishlist');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'Trip wishlists fetched successfully',
            wishlists: user.tripWishlist,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Failed to fetch trip wishlists',
            error: error.message,
        });
    }
};

// Get a specific wishlist by ID
exports.getWishlistById = async (req, res) => {
    const { wishlistId } = req.params;

    try {
        const wishlist = await Wishlist.findById(wishlistId).populate('items');
        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist not found' });
        }

        res.status(200).json({
            message: 'Wishlist fetched successfully',
            wishlist: wishlist,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Failed to fetch wishlist',
            error: error.message,
        });
    }
};

// Update a wishlist
exports.updateWishlist = async (req, res) => {
    const { wishlistId } = req.params;
    console.log(req.body)
    const { name } = req.body;

    try {
        const wishlist = await Wishlist.findById(wishlistId);
        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist not found' });
        }

        if (name) {
            wishlist.name = name;
        }

        await wishlist.save();

        res.status(200).json({
            message: 'Wishlist updated successfully',
            wishlist: wishlist,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Failed to update wishlist',
            error: error.message,
        });
    }
};

// Delete a wishlist
exports.deleteWishlists = async (req, res) => {
    const { wishlistId, userId } = req.params;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find and remove the wishlist from the correct array based on type
        const generalIndex = user.generalWishlist.indexOf(wishlistId);
        const tripIndex = user.tripWishlist.indexOf(wishlistId);

        if (generalIndex === -1 && tripIndex === -1) {
            return res.status(404).json({ message: 'Wishlist not found in user\'s wishlist' });
        }

        if (generalIndex !== -1) {
            user.generalWishlist.splice(generalIndex, 1);
        } else if (tripIndex !== -1) {
            user.tripWishlist.splice(tripIndex, 1);
        }

        await user.save();

        const wishlist = await Wishlist.findById(wishlistId);
        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist not found' });
        }

        await WishlistItem.deleteMany({ _id: { $in: wishlist.items } });
        await wishlist.remove();

        res.status(200).json({
            message: 'Wishlist and associated items deleted successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Failed to delete wishlist',
            error: error.message,
        });
    }
};

// Add an item to an existing wishlist
exports.addWishlistItem = async (req, res) => {
    const { userId, wishlistId } = req.params;
    const { name, description, type } = req.body;

    try {
        if (!name) {
            return res.status(400).json({ message: "Item name is required." });
        }

        const wishlistItem = new WishlistItem({
            name,
            description,
            type,
        });

        await wishlistItem.save();

        const wishlist = await Wishlist.findById(wishlistId);
        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist not found' });
        }

        wishlist.items.push(wishlistItem._id);
        // validation if the type is 'trip'
        if (wishlist.type === 'trip' && !wishlist.tripId) {
            return res.status(400).json({ message: "Trip ID is missing for trip wishlist." });
        }

        await wishlist.save();

        res.status(201).json({
            message: 'Item added to wishlist successfully',
            wishlist: wishlist,
            wishlistItem: wishlistItem,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Failed to add item to wishlist',
            error: error.message,
        });
    }
};

// Delete an item from a wishlist
exports.deleteWishlistItem = async (req, res) => {
    const { wishlistId, itemId } = req.params;

    try {
        const wishlist = await Wishlist.findById(wishlistId);
        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist not found' });
        }

        const itemIndex = wishlist.items.indexOf(itemId);
        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Item not found in the wishlist' });
        }

        wishlist.items.splice(itemIndex, 1);
        await wishlist.save();

        await WishlistItem.findByIdAndDelete(itemId);

        res.status(200).json({
            message: 'Item deleted from wishlist successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Failed to delete item from wishlist',
            error: error.message,
        });
    }
};
