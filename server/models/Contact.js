const mongoose = require('mongoose')

const ContactSchema = new mongoose.Schema({
    firstname: {
        type: String,
        trim: true,
        required: 'First name is required'
    },
    lastname: {
        type: String,
        trim: true,
        required: 'Last name is required'
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        unique: 'Email already exists',
        match: [/.+\@.+\..+/, 'Please fill a vadil email address'],
        required: 'Email is required'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    trip: { // Add trip reference here
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trip',
        required: false, // Optional if not every contact will be associated with a trip
    },
    created: {
        type: Date,
        default: Date.now,
    },
    updated: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Contact', ContactSchema);
