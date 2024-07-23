import { pipeline, env } from "https://cdn.jsdelivr.net/npm/@xenova/transformers@2.15.0";

// Skip local model check
env.allowLocalModels = false;

// Use the Singleton pattern to enable lazy construction of the pipeline.
class PipelineSingleton {
    static task = 'sentiment-analysis';
    static instance = null;
    static model = null;

    static async getInstance(model, progress_callback = null) {
        if (this.instance === null || this.model !== model) {
            this.model = model;
            this.instance = pipeline(this.task, this.model, { progress_callback });
        }
        return this.instance;
    }
}

let messageQueue = [];
let isProcessing = false;

async function processMessage() {
    if (messageQueue.length > 0 && !isProcessing) {
        isProcessing = true;
        const event = messageQueue.shift();
        //console.log('received data', event.data);
        const { batch, model } = event.data;
        let classifier = await PipelineSingleton.getInstance(model, x => {
            // We also add a progress callback to the pipeline so that we can
            // track model loading.
            self.postMessage(x);
        });
        // Actually perform the classification
        let labelledBatch = await classifier(batch);
        // Combine the input text with the output label in a single array of objects
        let output = batch.map((text, i) => {
            return {
                text: text,
                label: labelledBatch[i].label,
                score: labelledBatch[i].score
            };
        });
        //console.log('Classification complete', output);

        // Send the output back to the main thread
        self.postMessage({
            status: 'complete',
            input: batch,
            results: output,
        });
        isProcessing = false;
        processMessage();
    }
}

// Listen for messages from the main thread
self.addEventListener('message', (event) => {
    messageQueue.push(event);
    processMessage();
});