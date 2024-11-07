const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10; // the number of iterations the hashing function performs on the password and salt.

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Name is required'
    },
    email: {
        type: String,
        trim: true,
        unique: 'Email already exists',
        match: [/.+@.+\..+/, 'Please fill a vadil email address'],
        required: 'Email is required'
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    },
    hashedPassword: {
        type: String,
        required: 'Password is required'
    },
    salt: String,
    // Trips user has created or is involved in
    trips: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trip'
    }],
    // Trips user has saved for later
    savedTrips: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trip'
    }]
});

UserSchema.virtual('password')
    .set((password) => {
        this._password = password;
    })
    .get(() => {
        this._password
    });

// Password validation
UserSchema.path('hashedPassword').validate((v) => {
    if (this._password && this._password.length < 8) {
        this.invalidate('password', 'Password should be more than 8 characters')
    }
    if (this.isNew && !this._password) {
        this.invalidate('password', 'password is required')
    }
}, null)

//  Check if the password has been modified
UserSchema.pre('save', function(next) {
    if (this.isModified('hashedPassword')) {
        bcrypt.hash(this.hashedPassword, SALT_ROUNDS, (err, hashedPassword) => {
            // If there's an error during hashing, pass it to the next middleware
            if (err) return next(err);
            // Set the hashed password on the document
            this.hashedPassword = hashedPassword;
            // Optionally update the 'updated' timestamp
            this.updated = Date.now();
            next();
        });
    } else {
        next(); // If the password hasn't changed, just proceed without modification
    }
});

module.exports = mongoose.model('User', UserSchema);
