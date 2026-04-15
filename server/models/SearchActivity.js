import mongoose from 'mongoose';

const searchActivitySchema = new mongoose.Schema({
    locationName: { type: String, required: true },
    aidType: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('SearchActivity', searchActivitySchema);
