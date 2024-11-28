const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

const UserSchema = new mongoose.Schema({
    username: {
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
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
        unique: true, // Ensures a user can have only one profile
        sparse: true,
    },
    //Trips actively planned (upcoming)
    trips: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trip',
    }],
    // General wishlist for places to visit in the future (outside specific trips)
    generalWishlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Wishlist'
    }],
    // Wishlist for a planned trip
    tripWishlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Wishlist'
    }]
});

// Pre-save hook to hash the password if it’s new or modified
UserSchema.pre('save', function(next) {
    const user = this;

    // Only hash the password if it has been modified (new or changed)
    if (!user.isModified('password')) return next();

    // Hash the password
    bcrypt.hash(user.password, SALT_ROUNDS, (err, hashedPassword) => {
        if (err) return next(err);
        user.password = hashedPassword; // Set the hashed password
        user.updated = Date.now(); // Update the timestamp
        next();
    });
});

// Method to compare a plain text password with the hashed password
UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);