const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Get token from headers
    const token = req.header('Authorization')?.replace('Bearer ', '').trim();

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET); // This adds user information from the token to the request
        next();
    } catch (err) {
        console.log("JWT verification error:", err.message);
        return res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = authMiddleware;