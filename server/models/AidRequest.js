import mongoose from 'mongoose';

const aidRequestSchema = new mongoose.Schema({
    ngoId: { type: String, required: true },
    ngoName: { type: String, required: true },
    address: { type: String, required: true },
    needs: [String],
    suggestedRelief: String,
    timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('AidRequest', aidRequestSchema);
