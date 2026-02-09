import mongoose from 'mongoose';

const schemeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    ministry: { type: String, required: true },
    description: { type: String, required: true },
    financialCap: { type: Number, required: true }, // Max benefit amount
    criteria: {
        minAge: Number,
        maxAge: Number,
        maxIncome: Number,
        gender: { type: String, enum: ['Any', 'Male', 'Female'] },
        occupation: [String]
    },
    applicationUrl: String,
    status: { type: String, enum: ['Active', 'Closed'], default: 'Active' },
    category: { type: String, enum: ['Health', 'Education', 'Agriculture', 'Housing', 'Pension'] }
}, { timestamps: true });

export default mongoose.model('Scheme', schemeSchema);
