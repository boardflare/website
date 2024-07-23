import { pipeline, env, AutoTokenizer } from "https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.1";

// Skip local model check
env.allowLocalModels = false;

class PipelineSingleton {
    static task = 'translation';
    static instance = null;
    static model = null;
    static tokenizer = null;

    static async getInstance(source_lang, target_lang, progress_callback = null) {
        if (this.instance === null || this.model !== `Xenova/opus-mt-${source_lang}-${target_lang}`) {
            this.model = `Xenova/opus-mt-${source_lang}-${target_lang}`;
            this.instance = pipeline(this.task, this.model, { progress_callback });
            this.tokenizer = await AutoTokenizer.from_pretrained(this.model);
        }
        return this.instance;
    }
}


self.addEventListener('message', async (event) => {
    try {
        //console.log('task message received by worker:', event.data);
        const { text, source_lang, target_lang, quality } = event.data;

        const start = performance.now(); // Start time

        let pipeline = await PipelineSingleton.getInstance(source_lang, target_lang, x => {
            // callback so that we can track model loading status.
            self.postMessage(x);
        });

        // Log the number of tokens
        const encoded = PipelineSingleton.tokenizer.encode(text);
        const tokenCount = encoded.length;

        const tokenLimit = 250;
        // Check if tokenCount is over 250
        if (tokenCount > tokenLimit) {
            self.postMessage({ type: "result", value: `Your text is too long. It is ${tokenCount} tokens (~ words), and the limit for this model is ${tokenLimit}.` });
            return;
        }

        // Perform the translation
        const result = await pipeline(text, {
            // src_lang: source_lang,
            // tgt_lang: target_lang,
            temperature: 0.6,
            num_beams: quality, // Use quality to set num_beams
            callback_function: function (beams) {
                const decodedText = pipeline.tokenizer.decode(beams[0].output_token_ids, {
                    skip_special_tokens: true,
                })

                self.postMessage({
                    type: 'update',
                    value: decodedText
                });
            }
        });
        const translation = result[0].translation_text;

        const end = performance.now(); // End time
        const rate = Math.round(tokenCount / ((end - start) / 1000));
        //console.log(`Tokens/sec: ${rate} `);

        self.postMessage({ type: "result", value: translation, rate: rate });
    } catch (error) {
        // Post the error back to the main thread
        console.log('Error occurred:', error.stack);
        self.postMessage({ type: "error", value: error.message });
    }
});