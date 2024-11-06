const mongoose = require('mongoose');

// Trip Schema
const TripSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Trip name is required'
    },
    destination: {
        type: String,
        required: 'Destination is required'
    },
    startDate: {
        type: Date,
        required: 'Start date is required'
    },
    endDate: {
        type: Date,
        required: 'End date is required'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: 'Creator is required'
    },
    description: {
        type: String,
        trim: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    }
});

// Pre-save hook to update the 'updated' field on modification
TripSchema.pre('save', function(next) {
    this.updated = Date.now();
    next();
});

module.exports = mongoose.model('Trip', TripSchema);