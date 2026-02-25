import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import travelPlanRoutes from './routes/travelPlanRoutes.js';
import authRoutes from './routes/authRoutes.js';
import destinationInfoRoutes from './routes/destinationInfoRoutes.js';
import pexelsRoutes from './routes/pexelsRoutes.js'
import helmet from 'helmet';
import blogRoutes from './routes/blogRoutes.js'

const app = express();
app.set('trust proxy', 1); // Trust first proxy (Render/Vercel)


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
app.use('/api/travel-plans', travelPlanRoutes);
app.use('/api/destinations', destinationInfoRoutes);
app.use('/api/generate-pexels', pexelsRoutes)
app.use('/api/blogs', blogRoutes)

// health check, for keeping the server awake
app.get("/api/health", (req, res) => {
    console.log("Triggered")
    res.json({ message: "Server is running" });
});

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