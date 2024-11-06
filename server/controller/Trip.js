const Trip = require('../models/Trip'); // Import the Trip model

// Create a new trip
const create = async (req, res) => {
    const { name, destination, startDate, endDate, description, createdBy } = req.body;

    // Validate required fields
    if (!name || !destination || !startDate || !endDate || !createdBy) {
        return res.status(400).json({ error: "Name, destination, startDate, endDate, and createdBy are required!" });
    }

    try {
        const trip = new Trip({ name, destination, startDate, endDate, description, createdBy });
        await trip.save();
        return res.status(201).json({ message: "Trip added successfully", trip });
    } catch (err) {
        return res.status(500).json({ error: err.message || "Error while adding trip" });
    }
};

// List all trips
const list = async (req, res) => {
    try {
        const trips = await Trip.find().select('name destination startDate endDate createdBy');
        return res.json(trips);
    } catch (err) {
        return res.status(500).json({ error: "Error while fetching trips" });
    }
};

// Get a single trip by ID
const tripById = async (req, res, next, id) => {
    try {
        const trip = await Trip.findById(id);
        if (!trip) return res.status(404).json({ error: "Trip not found" });

        req.trip = trip; // Attach the trip to the request object
        next(); // Call next middleware or controller function
    } catch (err) {
        return res.status(500).json({ error: "Error fetching trip" });
    }
};

// Read a trip
const read = (req, res) => {
    return res.json(req.trip);
};

// Update a trip
const update = async (req, res) => {
    try {
        const trip = req.trip; // Get the trip object from the request
        const updatedTrip = Object.assign(trip, req.body); // Merge the updated fields

        // Save the updated trip
        await updatedTrip.save();
        return res.json(updatedTrip);
    } catch (err) {
        return res.status(500).json({ error: "Error while updating trip" });
    }
};

// Remove a trip
const remove = async (req, res) => {
    try {
        // Get the trip object from the request
        const trip = req.trip;
        const deletedTrip = await trip.deleteOne();

        return res.json(deletedTrip); // Return the deleted trip data
    } catch (err) {
        return res.status(500).json({ error: "Error while deleting trip" });
    }
};

// Remove all trips
const removeAll = async (req, res) => {
    try {
        const trips = await Trip.find();

        for (let trip of trips) {
            // Delete each trip
            await trip.deleteOne();
        }
        return res.json({ message: "All trips have been removed" });

    } catch (err) {
        return res.status(500).json({ error: "Error while removing all trips" });
    }
};

module.exports = { create, list, tripById, read, update, remove, removeAll };
