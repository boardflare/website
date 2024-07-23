import { addToBatch } from '../utils/batcher.js';

export function apiTranslate(text, source_lang, target_lang) {
    // check if source and target languages are supported by the model
    if (!Object.values(m2mLanguages).includes(source_lang) || !Object.values(m2mLanguages).includes(target_lang)) {
        return Promise.resolve("Source or target language is not supported by the model.");
    }

    // Prepare the arguments for the batch operation
    const args = { text, source_lang, target_lang };

    // Add this translation request to the batch
    return addToBatch("translate", args);
}