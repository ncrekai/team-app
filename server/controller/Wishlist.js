const { Wishlist, WishlistItem } = require('../models/Wishlist');
const User = require('../models/User');
const Trip = require('../models/Trip');

// Add a new Wishlist (general or trip) to the user
exports.createWishlist = async (req, res) => {
    const { userId } = req.params;
    const { name, items, type, tripId } = req.body;

    try {
        // Validate tripId if type is 'trip'
        if (type === 'trip' && !tripId) {
            return res.status(400).json({ message: "Trip ID is required for a trip wishlist." });
        }

        // Create WishlistItems
        const wishlistItems = [];
        for (const itemData of items) {
            const wishlistItem = new WishlistItem(itemData);
            await wishlistItem.save();
            wishlistItems.push(wishlistItem);
        }

        // Create Wishlist with the given name and items
        const wishlist = new Wishlist({
            name,
            type,
            tripId: type === 'trip' ? tripId : null,
            items: wishlistItems.map(item => item._id),
        });

        await wishlist.save();

        // Add Wishlist to the correct field (general or trip) in the user's schema
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Ensure wishlist type is valid
        if (type !== 'general' && type !== 'trip') {
            return res.status(400).json({ message: 'Invalid wishlist type' });
        }

        if (type === 'general') {
            user.generalWishlist.push(wishlist);
        } else if (type === 'trip') {
            user.tripWishlist.push(wishlist);
        } else {
            return res.status(400).json({ message: 'Invalid wishlist type' });
        }

        // Update only the wishlist fields to avoid full validation
        await User.findByIdAndUpdate(userId, {
            generalWishlist: user.generalWishlist,
            tripWishlist: user.tripWishlist
        });

        res.status(201).json({
            message: 'Wishlist created successfully',
            wishlist: wishlist,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Failed to create wishlist',
            error: error.message,
        });
    }
};

// Get all wishlists (general or trip) for a user
exports.getWishlists = async (req, res) => {
    const { userId } = req.params;
    // 'general' or 'trip'
    const { type } = req.query;
    console.log(req.query)
    console.log(type)
    try {
        // Populate the correct wishlist based on type
        const user = await User.findById(userId)
            .populate({
                path: 'generalWishlist',
                populate: { path: 'items' }  // Populate items within generalWishlist
            })
            .populate({
                path: 'tripWishlist',
                populate: { path: 'items' }  // Populate items within tripWishlist
            });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return the correct wishlist based on type
        let wishlists = [];
        if (type === 'general') {
            wishlists = user.generalWishlist;
        } else if (type === 'trip') {
            wishlists = user.tripWishlist;
        } else {
            return res.status(400).json({ message: 'Invalid wishlist type' });
        }

        res.status(200).json({
            message: 'Wishlists fetched successfully',
            wishlists: wishlists,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Failed to fetch wishlists',
            error: error.message,
        });
    }
};

exports.getGeneralWishlists = async (req, res) => {
    const { userId } = req.params;
    try {
        const wishlists = await Wishlist.find({ userId, type: 'general' });
        res.status(200).json(wishlists);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching general wishlists' });
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
