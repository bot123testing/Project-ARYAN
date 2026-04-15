import express from 'express';
import Scheme from '../models/Scheme.js';
import { initialSchemes } from '../data/mockData.js';

const router = express.Router();

// GET all schemes
// Returns from DB. If DB is empty, falls back to mockData (for demo)
router.get('/', async (req, res) => {
    try {
        const schemes = await Scheme.find({});
        if (schemes.length === 0) {
             return res.json(initialSchemes);
        }
        res.json(schemes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new Scheme (Admin)
router.post('/', async (req, res) => {
    try {
        const newScheme = new Scheme(req.body);
        await newScheme.save();
        res.status(201).json(newScheme);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT update an existing Scheme (Admin)
router.put('/:id', async (req, res) => {
    try {
        const scheme = await Scheme.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(scheme);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a Scheme (Admin)
router.delete('/:id', async (req, res) => {
    try {
        await Scheme.findByIdAndDelete(req.params.id);
        res.json({ message: "Scheme deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST match schemes based on user profile logic
router.post('/match', async (req, res) => {
    const { age, income, gender, occupation } = req.body;

    let schemesToMatch = await Scheme.find({});
    if (schemesToMatch.length === 0) schemesToMatch = initialSchemes;

    const matches = schemesToMatch.filter(scheme => {
        // Safe check for criteria object
        if (!scheme.criteria) return true;

        if (scheme.criteria.minAge && age < scheme.criteria.minAge) return false;
        if (scheme.criteria.maxAge && age > scheme.criteria.maxAge) return false;
        if (scheme.criteria.maxIncome && income > scheme.criteria.maxIncome) return false;
        if (scheme.criteria.gender && scheme.criteria.gender !== 'Any' && scheme.criteria.gender !== gender) return false;

        if (scheme.criteria.occupation && scheme.criteria.occupation.length > 0) {
            if (!scheme.criteria.occupation.includes(occupation)) return false;
        }
        return true;
    });

    res.json(matches);
});

export default router;
