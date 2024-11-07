const mongoose = require('mongoose')

const ContactSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: 'First name is required'
    },
    lastName: {
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
    // Allow the contact to be associated with multiple trips
    trips: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trip',
        required: false,
    }],
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
