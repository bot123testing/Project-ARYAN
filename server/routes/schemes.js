import express from 'express';
import Scheme from '../models/Scheme.js';
import { initialSchemes } from '../data/mockData.js';

const router = express.Router();

// GET all schemes (with simulated delay)
router.get('/', async (req, res) => {
    try {
        // Return mock data if DB is empty or not connected
        // For demo purposes, we will prioritize returning data 
        res.json(initialSchemes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST match schemes based on user profile logic
router.post('/match', async (req, res) => {
    const { age, income, gender, occupation } = req.body;

    // Logic Engine (Weighted Matching)
    const matches = initialSchemes.filter(scheme => {
        // 1. Basic Eligibility Checks
        if (scheme.criteria.minAge && age < scheme.criteria.minAge) return false;
        if (scheme.criteria.maxAge && age > scheme.criteria.maxAge) return false;
        if (scheme.criteria.maxIncome && income > scheme.criteria.maxIncome) return false;
        if (scheme.criteria.gender !== 'Any' && scheme.criteria.gender !== gender) return false;

        // 2. Occupation Match (Optional)
        if (scheme.criteria.occupation && scheme.criteria.occupation.length > 0) {
            if (!scheme.criteria.occupation.includes(occupation)) return false;
        }

        return true;
    });

    res.json(matches);
});

export default router;
