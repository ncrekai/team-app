const mongoose = require('mongoose')

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
        match: [/.+\@.+\..+/, 'Please fill a vadil email address'],
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
    hashed_passwords: {
        type: String,
        required: 'Password is required'
    },
    salt: String
});

UserSchema.virtual('password')
.set((password) => {
    this._password = password;
    this.hashedPasswords = password
}).get(() => this._password);

// Password validation
UserSchema.path('hashed_passwords').validate((v) => {
    if (this._password && this._password.length < 8) this.invalidate('password', 'Password should be more than 8 characters')
    if (this.isNew && !this._password) this.invalidate('password', 'password is required')
}, null)

module.exports = mongoose.model('User', UserSchema);
