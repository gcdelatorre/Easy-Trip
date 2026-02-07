import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import travelPlanRoutes from './routes/travelPlanRoutes.js';
import authRoutes from './routes/authRoutes.js';
import destinationInfoRoutes from './routes/destinationInfoRoutes.js';
import helmet from 'helmet';

dotenv.config();

const app = express();

app.use(cors({
    origin: [process.env.FRONTEND_URL, 'http://localhost:5173'],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());

const PORT = process.env.PORT || 5000;

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/plans', travelPlanRoutes);
app.use('/api/destinations', destinationInfoRoutes);

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