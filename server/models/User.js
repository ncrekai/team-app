const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Name is required',
    },
    email: {
        type: String,
        trim: true,
        unique: 'Email already exists',
        match: [/.+@.+\..+/, 'Please fill a valid email address'],
        required: 'Email is required',
    },
    created: {
        type: Date,
        default: Date.now,
    },
    updated: {
        type: Date,
        default: Date.now,
    },
    password: {
        type: String,
        required: 'Password is required',
    },
    trips: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trip',
    }],
    savedTrips: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trip',
    }],
});

// Virtual field for setting and getting the plain password
UserSchema.virtual('_password')
    .set(function(password) {
        this.__password = password; // Store the plain password in a temporary field
    })
    .get(function() {
        return this.__password; // Retrieve the plain password when needed
    });

// Password validation
UserSchema.pre('save', function(next) {
    // Check if the plain password is set before hashing it
    if (this.__password) {
        if (this.__password.length < 8) {
            return next(new Error('Password should be more than 8 characters'));
        }
        bcrypt.hash(this.__password, SALT_ROUNDS, (err, hashedPassword) => {
            if (err) return next(err);
            this.password = hashedPassword; // Save the hashed password to the password field
            this.updated = Date.now(); // Update the timestamp
            next();
        });
    } else {
    next();
 }});

// Method to compare plain password with hashed password
UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);