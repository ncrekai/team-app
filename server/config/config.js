const config = {
    env: process.env.NODE_ENV || 'development', 
    port: process.env.PORT || 4000,
    jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key", 
    mongoUri: process.env.MONGODB_URI || `${process.env.MONGODB_ACCESS}`
};

module.exports = config;