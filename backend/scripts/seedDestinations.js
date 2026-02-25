import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Blog from '../models/Blog.js';
import connectDB from '../config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const PROCESSED_DATA_PATH = path.join(__dirname, '../jsons/blogs.json');

const seedDestinations = async () => {
    try {
        await connectDB();
        console.log('Connected to MongoDB...');

        console.log('Reading processed countries data...');
        if (!fs.existsSync(PROCESSED_DATA_PATH)) {
            throw new Error(`File not found: ${PROCESSED_DATA_PATH}. Please run transformCountries.js and enrichLocalData.js first.`);
        }

        const blogs = JSON.parse(fs.readFileSync(PROCESSED_DATA_PATH, 'utf8'));
        console.log(`Found ${blogs.length} blogs to seed.`);

        console.log('Starting lightning-fast seeding...');
        const startTime = Date.now();

        // Use Promise.all with chunks or just a loop for 250 records (loop is fine for 250)
        for (let i = 0; i < blogs.length; i++) {
            const blogData = blogs[i];
            const blogName = blogData.country;

            process.stdout.write(`\rSeeding [${i + 1}/${blogs.length}] ${blogName}...`);

            await Blog.findOneAndUpdate(
                { country: blogName },
                {
                    ...blogData,
                    lastUpdated: new Date()
                },
                { upsert: true, new: true }
            );
        }

        const duration = ((Date.now() - startTime) / 1000).toFixed(2);
        console.log(`\n\nSeeding completed in ${duration} seconds! 🚀`);
        process.exit(0);
    } catch (error) {
        console.error('\nSeeding failed:', error.message);
        process.exit(1);
    }
};

seedDestinations();
