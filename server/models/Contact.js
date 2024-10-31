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
    email: {
        type: String,
        trim: true,
        unique: 'Email already exists',
        match: [/.+\@.+\..+/, 'Please fill a vadil email address'],
        required: 'Email is required'
    }
});

module.exports = mongoose.model('Contact', ContactSchema);
