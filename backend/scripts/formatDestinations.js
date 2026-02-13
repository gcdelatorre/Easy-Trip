import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 1. Set up paths (boilerplate for Node.js scripts)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INPUT_FILE = path.join(__dirname, '../../frontend/src/constants/countries+states.json');
const OUTPUT_FILE = path.join(__dirname, '../../frontend/src/constants/destinations.js');

const formatData = () => {
    try {
        console.log('--- Starting Data Formatting ---');

        // 2. Read the JSON file
        const rawResponse = fs.readFileSync(INPUT_FILE, 'utf8');
        const data = JSON.parse(rawResponse);

        console.log(`Processing ${data.length} countries...`);

        // 3. Transform the data
        // We want to turn: { name: "USA", states: ["California"] } 
        // into: "California, USA"
        const flatList = [];

        data.forEach(item => {
            const countryName = item.name;

            // Add the country itself first
            flatList.push(countryName);

            // Add each state in "State, Country" format
            item.states.forEach(state => {
                flatList.push(`${state}, ${countryName}`);
            });
        });

        // 4. Save as a JavaScript constant
        const fileContent = `export const destinations = ${JSON.stringify(flatList, null, 4)};`;
        fs.writeFileSync(OUTPUT_FILE, fileContent);

        console.log('--- Success! ---');
        console.log(`Created ${flatList.length} destinations.`);
        console.log(`Saved to: ${OUTPUT_FILE}`);

    } catch (error) {
        console.error('Error during formatting:', error.message);
    }
};

formatData();
