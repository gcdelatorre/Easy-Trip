import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INPUT_FILE = path.join(__dirname, '../jsons/countries.json');
const OUTPUT_FILE = path.join(__dirname, '../jsons/countries_processed.json');

const transformData = () => {
    try {
        console.log('Reading countries.json...');
        const rawData = JSON.parse(fs.readFileSync(INPUT_FILE, 'utf8'));

        console.log(`Processing ${rawData.length} countries...`);

        const processedData = rawData.map(country => {
            // Extract currency
            let currency = { code: 'N/A', name: 'N/A', symbol: 'N/A' };
            if (country.currencies) {
                const currencyKeys = Object.keys(country.currencies);
                if (currencyKeys.length > 0) {
                    const code = currencyKeys[0];
                    currency = {
                        code: code,
                        name: country.currencies[code].name || 'N/A',
                        symbol: country.currencies[code].symbol || 'N/A'
                    };
                }
            }

            return {
                country: country.name?.common || 'Unknown',
                destinationDescription: '', // To be filled by Gemini
                capital: (country.capital && country.capital.length > 0) ? country.capital[0] : 'N/A',
                timezone: (country.timezones && country.timezones.length > 0) ? country.timezones[0] : 'N/A',
                primaryLanguage: Object.values(country.languages || {})[0] || 'N/A',
                languages: country.languages || {}, // Stores all languages used
                currency: currency,
                weatherSummary: '', // To be filled by Gemini
                transportationModes: [], // To be filled by Gemini
            };
        });

        fs.writeFileSync(OUTPUT_FILE, JSON.stringify(processedData, null, 4));
        console.log(`Successfully transformed data! Saved to: ${OUTPUT_FILE}`);
        console.log(`Redundancies removed. Ready for fast seeding.`);

    } catch (error) {
        console.error('Transformation failed:', error.message);
    }
};

transformData();
