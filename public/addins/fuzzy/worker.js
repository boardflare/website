/*
 * Finds matches of a search range of values in a reference range of values
 * Example data shape:
 *  needle = 'apple'
 *  haystack = [['apple'], ['banana'], ['cherry'], ['date']]
 *  returns [{"item": "Microsoft Corp","refIndex": 3,"score": 0.14740203517287173},..]
 */

import Fuse from 'https://cdn.jsdelivr.net/npm/fuse.js@7.0.0/dist/fuse.mjs'

self.onmessage = function (event) {
    try {
        const { needles, haystack, threshold } = event.data;

        // Flatten needles and haystack to simple arrays
        const flattenedNeedles = needles.flat();
        const flattenedHaystack = haystack.flat();

        const fuseOptions = {
            ignoreLocation: true,
            includeScore: true,
            threshold: 1 - threshold,
            minMatchCharLength: 1,
        };

        // Create a new Fuse instance with the reference range and options
        const fuse = new Fuse(flattenedHaystack, fuseOptions);

        const results = flattenedNeedles.map(needle => {
            const searchResult = fuse.search(needle);
            const noMatch = { item: 'no match', refIndex: 0, score: 1 };
            const match = searchResult.length > 0 ? searchResult[0] : noMatch;
            match.score = Math.round((1 - match.score) * 100) / 100; // Normalize
            return match;
        });

        self.postMessage({ type: "result", value: results });
    } catch (error) {
        // Post the error back to the main thread
        self.postMessage({ type: "error", value: error.message });
    }
};