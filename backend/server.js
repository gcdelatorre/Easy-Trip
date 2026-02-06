import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import travelPlanRoutes from './routes/travelPlanRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Routes
app.use('/api/plans', travelPlanRoutes);

const startServer = async () => {
    try {
        await connectDB();
        console.log("DB Connected");
    } catch (err) {
        console.error("DB connection failed", err.message);
    } finally {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    }
};

startServer();