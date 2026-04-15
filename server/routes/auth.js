import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
router.post('/register', async (req, res) => {
    try {
        const { email, password, role } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            email,
            password,
            role: role || 'Citizen',
            isVerified: true // Automatically verify for native auth
        });

        res.status(201).json({
            message: 'User registered successfully! You can now log in.',
            _id: user._id,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during registration' });
    }
});

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
router.post('/login', async (req, res) => {
    try {
        const { email, password, role } = req.body;

        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            if (role && user.role !== role) {
                return res.status(401).json({ message: 'Role mismatch' });
            }

            const token = jwt.sign(
                { id: user._id, role: user.role },
                process.env.JWT_SECRET || 'fallback_secret_key',
                { expiresIn: '30d' }
            );

            res.json({
                _id: user._id,
                email: user.email,
                role: user.role,
                token
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during login' });
    }
});

import Scheme from '../models/Scheme.js';
import NGO from '../models/NGO.js';

// @desc    Get admin metrics
// @route   GET /api/auth/admin/metrics
// @access  Public (mock safe for now)
router.get('/admin/metrics', async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalNGOs = await NGO.countDocuments();
        const totalSchemes = await Scheme.countDocuments();

        res.json({
            success: true,
            totalUsers,
            totalNGOs,
            totalSchemes
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching metrics' });
    }
});

export default router;
