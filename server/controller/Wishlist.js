const { Wishlist, WishlistItem } = require('../models/Wishlist');
const User = require('../models/User');

// Add a new Wishlist to the user
exports.addWishlist = async (req, res) => {
    const { userId } = req.params;
    const { name, items } = req.body;

    try {
        // Step 1: Validation of items array
        if (!Array.isArray(items)) {
            return res.status(400).json({ message: "Items must be an array." });
        }

        // Check if each item has a name
        const invalidItems = items.filter(item => !item.name);
        if (invalidItems.length > 0) {
            return res.status(400).json({
                message: "Each item must have a name",
                invalidItems: invalidItems
            });
        }

        // Step 2: Create WishlistItems
        const wishlistItems = [];
        for (const itemData of items) {
            const wishlistItem = new WishlistItem(itemData);
            await wishlistItem.save();
            wishlistItems.push(wishlistItem);
        }

        // Step 3: Create Wishlist with the given name and items
        const wishlist = new Wishlist({
            name,
            items: wishlistItems.map(item => item._id),
        });

        await wishlist.save();

        // Step 4: Add Wishlist to the user's general wishlist
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.generalWishlist.push(wishlist);
        await user.save();

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

// Get all wishlists for a user
exports.getWishlists = async (req, res) => {
    const { userId } = req.params;

    try {
        // Populate both generalWishlist and tripWishlist
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

        res.status(200).json({
            message: 'Wishlists fetched successfully',
            generalWishlist: user.generalWishlist,
            tripWishlist: user.tripWishlist,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Failed to fetch wishlists',
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
exports.deleteWishlist = async (req, res) => {
    const { wishlistId, userId } = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const wishlistIndex = user.generalWishlist.indexOf(wishlistId);
        if (wishlistIndex === -1) {
            return res.status(404).json({ message: 'Wishlist not found in user\'s wishlist' });
        }

        user.generalWishlist.splice(wishlistIndex, 1);
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
