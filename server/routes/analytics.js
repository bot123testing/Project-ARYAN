import express from 'express';
import SearchActivity from '../models/SearchActivity.js';
import AidRequest from '../models/AidRequest.js';

const router = express.Router();

// ... (existing search routes)

// POST a new aid request
router.post('/aid-request', async (req, res) => {
    try {
        const newRequest = new AidRequest(req.body);
        await newRequest.save();
        res.status(201).json({ success: true, data: newRequest });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to submit aid request', error: error.message });
    }
});

// GET all aid requests
router.get('/aid-requests', async (req, res) => {
    try {
        const requests = await AidRequest.find().sort({ timestamp: -1 });
        res.json({ success: true, data: requests });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch aid requests', error: error.message });
    }
});

// Existing Search Routes
// POST a new search log
router.post('/search', async (req, res) => {
    try {
        const { locationName, aidType } = req.body;
        const newSearch = new SearchActivity({
            locationName: locationName || 'Unknown',
            aidType: aidType || 'All Categories'
        });
        await newSearch.save();
        res.status(201).json({ success: true, data: newSearch });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to log search activity', error: error.message });
    }
});

// GET aggregated search stats
router.get('/search-stats', async (req, res) => {
    try {
        const topAidTypes = await SearchActivity.aggregate([
            { $group: { _id: "$aidType", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 4 }
        ]);
        const topLocations = await SearchActivity.aggregate([
            { $group: { _id: "$locationName", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 4 }
        ]);
        const totalSearches = await SearchActivity.countDocuments();
        res.json({
            success: true,
            totalSearches,
            topAidTypes: topAidTypes.map(k => ({ name: k._id, count: k.count })),
            topLocations: topLocations.map(k => ({ name: k._id, count: k.count }))
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch search stats', error: error.message });
    }
});

export default router;
