import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Load env variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic Route
app.get('/', (req, res) => {
    res.send('ARYAN Network (Civic API) is Running');
});

// Routes
import schemeRoutes from './routes/schemes.js';
import ngoRoutes from './routes/ngos.js';

app.use('/api/schemes', schemeRoutes);
app.use('/api/ngos', ngoRoutes);


// Database Connection (Mock or Real)
const connectDB = async () => {
    try {
        if (process.env.MONGO_URI) {
            await mongoose.connect(process.env.MONGO_URI);
            console.log('MongoDB Connected');
        } else {
            console.log('No MONGO_URI found, using Mock Data mode');
        }
    } catch (error) {
        console.error('Database connection error:', error);
    }
};

// Start Server
app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port ${PORT}`);
});
