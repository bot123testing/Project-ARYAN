import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['citizen', 'ngo_admin', 'super_admin'], default: 'citizen' },
    aadhaarHash: { type: String },
    location: {
        lat: Number,
        lng: Number,
        address: String
    },
    savedSchemes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Scheme' }]
}, { timestamps: true });

export default mongoose.model('User', userSchema);
