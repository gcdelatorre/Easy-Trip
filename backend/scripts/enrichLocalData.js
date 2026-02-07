import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROCESSED_FILE = path.join(__dirname, '../jsons/countries_processed.json');
const SOURCE_FILE = path.join(__dirname, '../jsons/enrichment_source.json');

const enrichData = () => {
    try {
        console.log('Enriching data from local knowledge base...');
        const processedData = JSON.parse(fs.readFileSync(PROCESSED_FILE, 'utf8'));
        const sourceData = JSON.parse(fs.readFileSync(SOURCE_FILE, 'utf8'));

        const enrichedCount = { true: 0, false: 0 };

        const result = processedData.map(country => {
            const countryName = country.country;
            const knowledge = sourceData[countryName];

            if (knowledge) {
                enrichedCount.true++;
                return {
                    ...country,
                    destinationDescription: knowledge.description,
                    weatherSummary: knowledge.climate,
                    transportationModes: knowledge.modes
                };
            } else {
                enrichedCount.false++;
                // Fallback for missing knowledge
                return {
                    ...country,
                    destinationDescription: `A beautiful destination known for its unique culture and landscapes in the ${country.timezone} region.`,
                    weatherSummary: "Climate varies by region and season.",
                    transportationModes: ["Taxi", "Bus", "Car Rental"]
                };
            }
        });

        fs.writeFileSync(PROCESSED_FILE, JSON.stringify(result, null, 4));
        console.log(`Enrichment complete!`);
        console.log(`- High-quality matches: ${enrichedCount.true}`);
        console.log(`- Generic fallbacks: ${enrichedCount.false}`);
        console.log(`Ready for the final seed.`);

    } catch (error) {
        console.error('Enrichment failed:', error.message);
    }
};

enrichData();
