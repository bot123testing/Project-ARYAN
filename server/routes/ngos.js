import express from 'express';
import NGO from '../models/NGO.js';
import { initialNGOs } from '../data/mockData.js';

const router = express.Router();

// GET all NGOs
router.get('/', async (req, res) => {
    res.json(initialNGOs);
});

// GET nearby NGOs (Geo-Spatial Query Simulation)
router.post('/nearby', (req, res) => {
    const { lat, lng, radius } = req.body; // User location

    // Simple distance calculation (Haversine formula placeholder)
    // For now, returning all NGOs for the map visualization
    res.json(initialNGOs);
});

export default router;
