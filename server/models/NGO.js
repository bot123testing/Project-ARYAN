import mongoose from 'mongoose';

const ngoSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    location: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
        address: String
    },
    contact: {
        phone: String,
        email: String
    },
    services: [{
        type: { type: String, enum: ['Medicine', 'Food', 'Education', 'Shelter'] },
        quantity: Number,
        isUrgent: { type: Boolean, default: false }
    }],
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
    trustScore: { type: Number, default: 5 } // 1-5 rating
}, { timestamps: true });

export default mongoose.model('NGO', ngoSchema);
