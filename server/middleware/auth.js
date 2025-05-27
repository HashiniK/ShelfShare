const jwt = require('jsonwebtoken');
const User = require('../database/models/user');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

console.log('JWT_SECRET loaded:', JWT_SECRET ? 'Yes' : 'No'); // Add this temporarily

const authenticate = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Authentication token required' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(403).json({ message: 'Invalid or expired token' });
    }
};

module.exports = { authenticate };