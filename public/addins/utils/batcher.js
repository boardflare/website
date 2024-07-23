/*
example functions.js

function mul2(first, second) {
    return addToBatch(
        "mul2",
        [first, second]
    );
}
 */

let _batch = [];
let _batchCredits = 0;
let _isBatchProcessing = false;
let controller = new AbortController();
let _batchCopy = []; // Moved batchCopy to a global scope
const oldMessage = `Sorry, there was an error. If this persists, please close and re-open your workbook.`

export function cancelBatch(errorMessage = "canceled") {
    controller.abort(); // Abort fetch operations
    // Resolve all pending promises with the provided error message
    [..._batch, ..._batchCopy].forEach((entry) => {
        entry.resolve(errorMessage);
    });
    _batch = []; // Clear the batch
    _batchCopy = []; // Clear batchCopy
    _isBatchProcessing = false; // Reset the controller
    _batchCredits = 0; // Reset the credits
}

export function addToBatch(op, args) {
    if (_batchCredits > 200) {
        return Promise.resolve("Combined cost of multiple function calls exceeded limit of 200. Try copying the formula on fewer rows at once to avoid this.");
    }
    if (args.text) { // Ensure args.text exists to avoid errors
        const creditsPerChar = 0.001;
        _batchCredits += args.text.length * creditsPerChar;
    }

    // Create an entry for your custom function invocation.
    const invocationEntry = {
        operation: op, // e.g., "translate"
        args: args, // e.g., { text: "Hello", source_lang: "en", target_lang: "es" }
        resolve: undefined,
        reject: undefined,
    };

    // Create a unique promise for this invocation
    const promise = new Promise((resolve, reject) => {
        invocationEntry.resolve = resolve;
        invocationEntry.reject = reject;
    });

    // Push the invocation entry into the next batch.
    _batch.push(invocationEntry);

    // If a remote request hasn't been scheduled yet,
    // schedule it after a certain timeout, e.g., 100 ms.
    if (!_isBatchProcessing) {
        _isBatchProcessing = true;
        setTimeout(_processBatch, 100);
    }

    // Return the promise for this invocation, which will resolve to the function result in the Excel cell.
    return promise;
}

// This function makes a request for remote processing of the whole batch,
// and matches the response batch to the request batch.

async function _processBatch() {
    const chunkSize = 5; // Define the size of each chunk
    // Move items to batchCopy and clear _batch
    _batchCopy = _batch.splice(0, _batch.length);
    _batchCredits = 0; // batch has been cleared, so reset the credits

    // Function to process a single chunk of the batch
    async function processChunk(chunk) {
        // Extract the operation from the first item in the chunk
        const operation = chunk[0].operation;
        // Prepare the requestBatch with operation as a top-level property
        const requestBatch = {
            operation: operation,
            payload: chunk.map(item => item.args)
        };
        try {
            const responseBatch = await _callAPI(requestBatch);
            // Update credits 
            window.credits = responseBatch.credits;
            document.getElementById('credits').innerText = `Credits: ${window.credits.toFixed(0)}`;
            // Handle the response for each item in the chunk
            responseBatch.translations.forEach((translated_text, index) => {
                chunk[index].resolve(translated_text);
            });
        } catch (error) {
            console.error(error);
            // If the call fails, reject all promises in the chunk
            chunk.forEach(item => item.reject(error));
        }
    }

    // Splitting batchCopy into chunks and processing each chunk
    for (let i = 0; i < _batchCopy.length; i += chunkSize) {
        const chunk = _batchCopy.slice(i, i + chunkSize);
        await processChunk(chunk); // Process each chunk sequentially
    }

    // Reset controller to allow processing of new batch after the current batch is done.
    _isBatchProcessing = false;
}

// Adjust the _callAPI function to handle the new structure of requestBatch
async function _callAPI(requestBatch) {
    try {
        const response = await fetch(`${apiBaseUrl}/${requestBatch.operation}`, {
            method: 'POST',
            body: JSON.stringify(requestBatch.payload),
            //signal: controller.signal,
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${window.bearerToken}`,
            }
        });
        if (!response.ok) {
            console.log('response text:', await response.text());
        }
        return response.json();
    } catch (error) {
        if (error.name === 'AbortError') {
            console.log('Fetch aborted');
        } else {
            throw error;
        }
    }
}