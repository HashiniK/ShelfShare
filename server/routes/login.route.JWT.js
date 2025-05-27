const express = require('express');
const User = require('../database/models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ status: 'failed', message: 'Invalid email' });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ status: 'failed', message: 'Invalid password' });
        }

        // Create token
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        // Set token in HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // send over HTTPS in prod
            sameSite: 'Strict',
            maxAge: 3600000 // 1 hour
        });

        return res.status(200).json({
            status: 'success',
            message: 'Login successful'
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'failed', message: 'Server error' });
    }
});

module.exports = router;