// Custom functions for Excel to get matches of a search range values in a reference range of values.
// lookup_value = 'apple'
// lookup_array = [['apple'], ['banana'], ['cherry'], ['date']]

const worker = new Worker('worker.js', { type: 'module' });
let taskQueue = [];
let isWorkerBusy = false;
let task = null;

function processTasks() {
    try {
        if (!isWorkerBusy && taskQueue.length > 0) {
            task = taskQueue.shift(); // Get the next task
            worker.postMessage({
                needles: [[task.lookup]],
                haystack: task.haystack,
                threshold: task.threshold
            });
            isWorkerBusy = true;
        }
    } catch (error) {
        gtag('event', 'error', {
            'function': 'processTasks',
            'message': error.message
        });
    }
}

worker.onerror = function (error) {
    gtag('event', 'error', {
        'function': 'worker.onerror',
        'message': error.message
    });
    task.reject(error);
    isWorkerBusy = false;
    processTasks();
};

worker.onmessage = function (event) {
    try {
        if (event.data.type === "error") {
            throw new Error(event.data.value);
        }

        let result = event.data.value[0];
        if (result.score < task.threshold) {
            result = {
                item: "",
                score: 0,
                refIndex: -1
            };
        }
        if (task.functionId === 'FLOOKUP') {
            let row;
            const returnArrayRow = task.return_array && task.return_array[result.refIndex];
            if (!returnArrayRow) {
                row = [task.lookup, result.item, result.score, ""];
            } else {
                row = [task.lookup, result.item, result.score, ...returnArrayRow];
            }
            task.resolve([row]);
        } else if (task.functionId === 'FMATCH') {
            const entity = {
                type: Excel.CellValueType.entity,
                text: task.lookup,
                provider: {
                    "description": "Boardflare | Fuzzy Match for Excel",
                },
                properties: {
                    "Lookup": {
                        type: Excel.CellValueType.string,
                        basicValue: task.lookup,
                    },
                    "Match": {
                        type: Excel.CellValueType.string,
                        basicValue: result.item,
                        propertyMetadata: {
                            sublabel: "from lookup_array"
                        }
                    },
                    "Similarity": {
                        type: Excel.CellValueType.double,
                        basicValue: result.score,
                        propertyMetadata: {
                            sublabel: "0 (least) - 1 (most)"
                        }
                    },
                    "Row": {
                        type: Excel.CellValueType.double,
                        basicValue: result.refIndex + 1,
                        propertyMetadata: {
                            sublabel: "in lookup_array, 1-based"
                        }
                    }
                },
                layouts: {
                    compact: {
                        icon: Excel.EntityCompactLayoutIcons.tetrisApp
                    }
                }
            };
            task.resolve(entity);
        }
        isWorkerBusy = false;
        processTasks();
    } catch (error) {
        gtag('event', 'error', {
            'function': 'worker.onmessage',
            'message': error.message
        });
    }
};

function fuzzyLookup(lookup, haystack, return_array, threshold) {
    try {
        threshold = (threshold !== null && threshold >= 0 && threshold <= 1) ? threshold : 0.4;
        const flattenedHaystack = haystack.flat();
        gtag('event', 'fuzzy_lookup', {
            'lookup_array_length': flattenedHaystack?.length ?? 0,
            'threshold': threshold,
            'lookup_length': lookup.length,
            'model': 'fuse-bitap'
        });
        return new Promise((resolve, reject) => {
            taskQueue.push({ functionId: 'FLOOKUP', lookup, haystack, return_array, threshold, resolve, reject });
            processTasks();
        });
    } catch (error) {
        gtag('event', 'error', {
            'function': 'fuzzyLookup',
            'message': error.message
        });
    }
}

function fuzzyMatch(lookup, haystack, threshold) {
    try {
        threshold = (threshold !== null && threshold >= 0 && threshold <= 1) ? threshold : 0.4;
        const flattenedHaystack = haystack.flat();
        gtag('event', 'fuzzy_match', {
            'lookup_array_length': flattenedHaystack?.length ?? 0,
            'threshold': threshold,
            'lookup_length': lookup.length,
            'model': 'fuse-bitap'
        });
        return new Promise((resolve, reject) => {
            taskQueue.push({ functionId: 'FMATCH', lookup, haystack, threshold, resolve, reject });
            processTasks();
        });
    } catch (error) {
        gtag('event', 'error', {
            'function': 'fuzzyMatch',
            'message': error.message
        });
    }
}

CustomFunctions.associate("FLOOKUP", fuzzyLookup);
CustomFunctions.associate("FMATCH", fuzzyMatch);