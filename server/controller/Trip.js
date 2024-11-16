const Trip = require('../models/Trip'); // Import the Trip model
const User = require('../models/User');
// Create a new trip
exports.createTrip = async (req, res) => {
    const { name, destination, startDate, endDate, description, createdBy, wishlistId } = req.body;

    // Validate required fields
    if (!name || !destination || !startDate || !endDate || !createdBy) {
        return res.status(400).json({ error: "Name, destination, startDate, endDate, and createdBy are required!" });
    }

    try {
        const user = await User.findById(createdBy);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const trip = new Trip({ name, destination, startDate, endDate, description, createdBy });

        // If a wishlist is provided, associate it with the trip
        if (wishlistId) {
            const wishlist = await Wishlist.findById(wishlistId);
            if (!wishlist) {
                return res.status(404).json({ error: 'Wishlist not found' });
            }
            trip.wishlist = wishlistId;
        }

        await trip.save();
        // Add the trip to the user's trips array
        user.trips.push(trip._id);
        await user.save();

        return res.status(201).json({ message: "Trip added successfully", trip });
    } catch (err) {
        return res.status(500).json({ error: err.message || "Error while adding trip" });
    }
};


// List all trips
exports.getAllTrips = async (req, res) => {
    try {
        const trips = await Trip.find().select('name destination startDate endDate createdBy');
        return res.json(trips);
    } catch (err) {
        return res.status(500).json({ error: "Error while fetching trips" });
    }
};

// Get a single trip by ID
exports.getTripById = async (req, res, next, id) => {
    try {
        const trip = await Trip.findById(id).populate('tripWishlist');
        if (!trip) {
            return res.status(404).json({ message: "Trip not found" });
        }

        // Attach trip to the request object
        req.trip = trip;
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Read a trip
exports.read = (req, res) => {
    return res.json(req.trip);
};

// add a wishlist to specific trip
exports.addWishlistToTrip = async (req, res) => {
    const { tripId } = req.params;
    const { wishlistId } = req.body;
    try {
        const trip = await Trip.findById(tripId);
        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }

        // Check if the wishlist is already associated with the trip
        if (trip.wishlists && trip.wishlists.includes(wishlistId)) {
            return res.status(400).json({ message: 'Wishlist is already associated with this trip' });
        }

        // Add the wishlist to the trip's wishlists array
        trip.tripWishlist.push(wishlistId);
        await trip.save();

        return res.status(200).json({
            message: 'Wishlist added to trip successfully',
            trip: trip,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error adding wishlist to trip', error: error.message });
    }
};

exports.updateTrip = async (req, res) => {
    const trip = req.trip;  // Get the trip from the `req.trip` populated by middleware

    try {
        // Use Object.assign to update only the fields that are in the req.body
        Object.assign(trip, req.body);

        // Save the updated trip
        await trip.save();

        res.status(200).json({ message: 'Trip updated successfully', trip });
    } catch (err) {
        res.status(500).json({ error: 'Error updating trip' });
    }
};


// Remove a trip
exports.deleteTrip = async (req, res) => {
    try {
        const trip = await Trip.findByIdAndDelete(req.params.id);
        // If the trip is not found, return a 404 response
        if (!trip) {
            return res.status(404).json({ message: "Trip not found" });
        }
        res.status(200).json({ message: "Trip deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};

// Remove all trips
exports.deleteAllTrips = async (req, res) => {
    try {
        await Trip.deleteMany();
        res.status(200).json({ message: "All trips deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};

