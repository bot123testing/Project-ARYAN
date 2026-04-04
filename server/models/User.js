import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: { type: String }, // Optional or add it to frontend later
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['Citizen', 'NGO', 'Admin'], default: 'Citizen' },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String },
    aadhaarHash: { type: String },
    location: {
        lat: Number,
        lng: Number,
        address: String
    },
    savedSchemes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Scheme' }]
}, { timestamps: true });

// Pre-save hook to hash password if modified
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to verify password match
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('User', userSchema);
