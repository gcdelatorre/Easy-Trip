import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import Blog from '../models/Blog.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const BLOGS_PATH = path.join(__dirname, '../jsons/blogs.json');

const seedBlogs = async () => {
    try {
        await connectDB();
        console.log('Connected to MongoDB...');

        if (!fs.existsSync(BLOGS_PATH)) {
            throw new Error(`File not found: ${BLOGS_PATH}`);
        }

        const blogs = JSON.parse(fs.readFileSync(BLOGS_PATH, 'utf8'));
        console.log(`Found ${blogs.length} blogs to seed.\n`);

        const startTime = Date.now();

        for (let i = 0; i < blogs.length; i++) {
            const blog = blogs[i];
            process.stdout.write(`\rSeeding [${i + 1}/${blogs.length}] "${blog.title}"...`);

            await Blog.findOneAndUpdate(
                { slug: blog.slug },
                { ...blog },
                { upsert: true, new: true }
            );
        }

        const duration = ((Date.now() - startTime) / 1000).toFixed(2);
        console.log(`\n\n✅ Blog seeding complete in ${duration}s! ${blogs.length} blogs saved.`);
        process.exit(0);
    } catch (error) {
        console.error('\n❌ Seeding failed:', error.message);
        process.exit(1);
    }
};

seedBlogs();
