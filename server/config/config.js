// Load environment variables from the .env file into process.env
require('dotenv').config();

const config = {
    // Set the environment, defaulting to 'development' if NODE_ENV is not specified
    env: process.env.NODE_ENV || 'development',

    // Set the server port, defaulting to 5000 if PORT is not specified
    PORT: process.env.PORT || 5000,

    // JWT secret key for signing and verifying tokens, pulled from the .env file
    jwtSecret: process.env.JWT_SECRET,

    // MongoDB connection URI:
    // First, attempt to use MONGO_URI from .env (e.g., a full MongoDB connection string)
    // If MONGO_URI is not provided, check for MONGO_HOST and MONGO_PORT to build the URI
    // Defaults to localhost with port 27017 if no other options are found
    MONGODB_URI: process.env.MONGO_URI ||
        (process.env.MONGO_HOST
            ? 'mongodb://' + process.env.MONGO_HOST + ':' + (process.env.MONGO_PORT || '27017') + '/app'
            : 'mongodb://localhost:27017/app')
};

// Export the config object so it can be used in other parts of the application
module.exports = config;
