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

        // Check if each item has name
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

        await wishlist.save();  // Save the Wishlist

        // Step 4: Add Wishlist to the user's general wishlist
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.generalWishlist.push(wishlist);  // Push Wishlist to the generalWishlist array
        await user.save();

        // Step 5: Return the created wishlist
        res.status(201).json({
            message: 'Wishlist created successfully',
            wishlist: wishlist,
        });

    } catch (error) {
        // Catch any error during the entire process
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
        // populate the general and the trip wishlist to get all wishlist
        const user = await User.findById(userId)
            .populate('generalWishlist')
            .populate('tripWishList');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'Wishlists fetched successfully',
            wishlists: user.generalWishlist,
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
