import { pipeline, env } from "https://cdn.jsdelivr.net/npm/@xenova/transformers@2.15.0";

// Skip local model check
env.allowLocalModels = false;

// Use the Singleton pattern to enable lazy construction of the pipeline.
class PipelineSingleton {
    static task = 'zero-shot-classification';
    static instance = null;
    static model = 'Xenova/distilbert-base-uncased-mnli';

    static async getInstance(progress_callback = null) {
        if (this.instance === null) {
            this.instance = pipeline(this.task, this.model, { progress_callback });
        }
        return this.instance;
    }
}

// Listen for messages from the main thread
self.addEventListener('message', async (event) => {
    //console.log('Worker received message:', event.data);
    const { textValues, labelValues } = event.data;
    let classifier = await PipelineSingleton.getInstance(x => {
        // We also add a progress callback to the pipeline so that we can
        // track model loading.
        self.postMessage(x);
    });

    // Initialize an empty array to store the output
    let output = [];

    // Loop over textValues and perform the classification for each element
    for (let text of textValues) {
        let result = await classifier(text, labelValues, { multi_label: false });
        //console.log(result);
        output.push({
            text: text,
            label: result.labels[0],
            score: result.scores[0]
        });
    }

    // console.log('Worker finished processing:', output);
    // Send the output back to the main thread
    self.postMessage({
        status: 'result',
        value: output,
    });
});