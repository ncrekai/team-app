const Trip = require('../models/Trip');
const User = require('../models/User');
const { Wishlist, WishlistItem } = require('../models/Wishlist');

// Create a new trip
exports.createTrip = async (req, res) => {
    const { name, destination, startDate, endDate, description } = req.body;
    const createdBy = req.user.userId; // Use the authenticated user's ID

    // Validate required fields
    if (!name || !destination || !startDate || !endDate) {
        return res.status(400).json({ error: "Name, destination, startDate, and endDate are required!" });
    }

    // Optional: Validate if startDate is before endDate
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (start >= end) {
        return res.status(400).json({ error: "Start date must be before end date." });
    }

    try {
        // Check if the user exists
        const user = await User.findById(createdBy);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Create the trip
        const trip = new Trip({
            name,
            destination,
            startDate,
            endDate,
            description,
            createdBy
        });

        // Save the trip
        await trip.save();

        // Add the trip to the user's trips array
        user.trips.push(trip["_id"]);
        await user.save();

        // Return the response with trip details
        return res.status(201).json({ message: "Trip added successfully", trip });
    } catch (err) {
        console.error(err); // Log the error for debugging
        return res.status(500).json({ error: err.message || "Error while adding trip" });
    }
};

// Fetch all trips
exports.getAllTrips = async (req, res) => {
    try {
        const trips = await Trip.find().select('name destination startDate endDate createdBy');
        return res.json(trips);
    } catch (err) {
        return res.status(500).json({ error: "Error while fetching trips" });
    }
};

// Fetch trips for a specific user
exports.getUserTrips = async (req, res) => {
    const { userId } = req.user;
    try {
        const userTrips = await Trip.find({ createdBy: userId });
        res.status(200).json(userTrips);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user trips', error });
    }
};

// Fetch a trip by tripId
exports.getTripById = async (req, res, next) => {
    const { tripId } = req.params;
    try {
        const trip = await Trip.findById(tripId).populate('tripWishlist');
        if (!trip) {
            return res.status(404).json({ message: "Trip not found" });
        }
        req.trip = trip;
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a wishlist to a specific trip
exports.addWishlistToTrip = async (req, res) => {
    const { tripId } = req.params;
    const { wishlistId } = req.body;

    try {
        const trip = await Trip.findById(tripId);
        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }

        // Check if the wishlist is already associated with the trip
        if (trip.tripWishlist && trip.tripWishlist.includes(wishlistId)) {
            return res.status(400).json({ message: 'Wishlist is already associated with this trip' });
        }

        // Add the wishlist to the trip's tripWishlist array
        trip.tripWishlist.push(wishlistId);
        await trip.save();

        return res.status(200).json({
            message: 'Wishlist added to trip successfully',
            trip,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error adding wishlist to trip', error: error.message });
    }
};

// Update a trip
exports.updateTrip = async (req, res) => {
    const { tripId } = req.params;
    const { userId } = req.user; // Use the authenticated user's ID

    try {
        const trip = await Trip.findOne({ _id: tripId, createdBy: userId });
        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }

        // Update only the provided fields
        Object.assign(trip, req.body);
        await trip.save();

        res.status(200).json({ message: 'Trip updated successfully', trip });
    } catch (err) {
        res.status(500).json({ error: 'Error updating trip' });
    }
};

// Delete Specific trip
exports.deleteTrip = async (req, res) => {
    try {
        const { tripId } = req.params;

        // Ensure the trip belongs to the authenticated user
        const trip = await Trip.findOne({ _id: tripId, createdBy: req.user.userId }).populate('tripWishlist');
        if (!trip) {
            return res.status(404).json({ message: "Trip not found or not authorized" });
        }

        const wishlists = await Wishlist.find({ tripId: tripId });
        if (trip.tripWishlist.length > 0) {
            await WishlistItem.deleteMany({ _id: { $in: wishlists.flatMap(wishlist => wishlist.items) } });

            // Delete the wishlists themselves
            await Wishlist.deleteMany({ tripId: tripId });
        }

        // Update the user's trips array to remove the deleted trip reference
        const updatedUser = await User.findByIdAndUpdate(req.user.userId, {
            $pull: { tripWishlist: tripId }
        }, { new: true });

        // Delete the trip itself
        await Trip.findByIdAndDelete(tripId);

        res.status(200).json({ message: "Trip and related trip wishlists deleted successfully" });
    } catch (error) {
        console.error('Error deleting trip:', error);
        res.status(500).json({ message: error.message });
    }
};

// Delete all trips for the authenticated user
exports.deleteAllTrips = async (req, res) => {
    const { userId } = req.user; // Use the authenticated user's ID

    try {
        const result = await Trip.deleteMany({ createdBy: userId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "No trips found for this user" });
        }

        res.status(200).json({ message: "All trips deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
