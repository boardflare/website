import fs from 'fs';
import path from 'path';

// Read and parse the languages.json file
const languages = JSON.parse(fs.readFileSync(new URL('languages.json', import.meta.url), 'utf8'));
console.log('Languages:', languages);

// Read and parse the models.json file
const models = JSON.parse(fs.readFileSync(new URL('models.json', import.meta.url), 'utf8'));
console.log('Models:', models);

// Initialize the lists
let toEn = {};
let fromEn = {};
let bidirectional = {};

// Iterate over each language
for (let language in languages) {
    const languageCode = languages[language];

    // Check if there is a model for translation to English and from English
    const hasModelToEn = models.some(model => model.includes(`-${languageCode}-en`));
    const hasModelFromEn = models.some(model => model.includes(`-en-${languageCode}`));
    console.log(`Checking language ${language} (${languageCode}): toEn=${hasModelToEn}, fromEn=${hasModelFromEn}`);

    if (hasModelToEn) {
        toEn[language] = languageCode;
    }
    if (hasModelFromEn) {
        fromEn[language] = languageCode;
    }
    if (hasModelToEn && hasModelFromEn) {
        bidirectional[language] = languageCode;
    }
}

// Write the results to JSON files
fs.writeFileSync(new URL('toEn.json', import.meta.url), JSON.stringify(toEn, null, 2));
fs.writeFileSync(new URL('fromEn.json', import.meta.url), JSON.stringify(fromEn, null, 2));
fs.writeFileSync(new URL('bidirectional.json', import.meta.url), JSON.stringify(bidirectional, null, 2));