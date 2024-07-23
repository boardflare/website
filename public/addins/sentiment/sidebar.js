import winkNlp from 'https://cdn.jsdelivr.net/npm/wink-nlp@2.2.0/+esm';
import winkEngLiteWebModel from 'https://cdn.jsdelivr.net/npm/wink-eng-lite-web-model@1.7.0/+esm';

// Load the NLP model
const nlp = winkNlp(winkEngLiteWebModel);

// Model display names
const modelDisplayNames = {
    'Xenova/distilbert-base-uncased-finetuned-sst-2-english': 'Movie Reviews',
    'Xenova/bert-base-multilingual-uncased-sentiment': 'Product Reviews',
    'Xenova/finbert': 'Finance News',
    'Xenova/twitter-roberta-base-sentiment-latest': 'Twitter Messages'
};

// Populate the model select dropdown
const modelSelect = document.getElementById('modelSelect');
for (const [key, value] of Object.entries(modelDisplayNames)) {
    const option = document.createElement('option');
    option.value = key;
    option.text = value;
    modelSelect.appendChild(option);
}

// Create a new module worker
let worker = createWorker();

// Set user notice
function userNotice(message) {
    document.getElementById('userNotice').innerText = message;
}

// Update progress bar
function updateProgressBar(percentComplete) {
    const progressBar = document.getElementById('progressBar');
    progressBar.style.width = percentComplete + '%';
    progressBar.textContent = Math.round(percentComplete) + '%';
}

// Analysis function triggered by clicking the Analyze button
let isAnalyzing = false;
async function analyzeText() {
    // Check if an analysis is already in progress and return if true
    if (isAnalyzing) {
        console.log('Analysis is already in progress');
        return;
    }
    isAnalyzing = true;

    try {
        // set up progress bar, user notices, and model
        let progressCounter = 0;
        const model = document.getElementById('modelSelect').value;
        const modelName = modelDisplayNames[model];
        const splitChecked = document.getElementById('split').checked;
        updateProgressBar(0); //reset progress bar
        userNotice(''); //clear user notices

        // get text from selected cells
        let selectedTextArray = await getSelectedText();
        if (!selectedTextArray) {
            userNotice('No text selected. Please select a range of cells and click Analyze.');
            isAnalyzing = false;
            return;
        }
        // create analysis properties object for GA events
        const totalCharacters = selectedTextArray.reduce((acc, val) => acc + val[0].length, 0);
        const avgCharacters = Math.round(totalCharacters / selectedTextArray.length);
        const analysisProperties = {
            cells: selectedTextArray.length,
            model: model,
            total_chars: totalCharacters,
            avg_chars: avgCharacters,
            split_sentences: splitChecked
        };
        // send GA event for start of analysis
        gtag('event', 'analysis_start', analysisProperties);

        // Check if selectedTextArray is a single column
        if (selectedTextArray[0].length > 1) {
            userNotice(`Selected range is not a single column. Please adjust your selection and click Analyze again.`);
            // send GA event for error
            gtag('event', 'analysis_error', {
                'error': 'Not a single column'
            });
            isAnalyzing = false;
            return;
        }
        // Check if all selectedTextArray are strings
        for (let i = 0; i < selectedTextArray.length; i++) {
            if (typeof selectedTextArray[i][0] !== 'string') {
                userNotice(`Cell ${i + 1} does not contain text. Please adjust your selection and click Analyze again.`);
                // send GA event for error
                gtag('event', 'analysis_error', {
                    'error': 'Not a string'
                });
                isAnalyzing = false;
                return;
            }
        }

        //console.log('Selected text:', selectedTextArray);

        // Create a new sheet for the analysis
        const sheetName = "Sentiment-" + self.crypto.randomUUID().substring(0, 4);
        const tableName = await newSheet(sheetName, modelName);

        // if split checkbox is checked, split into sentences
        if (splitChecked) {
            let splitSentencesArray = [];
            for (let i = 0; i < selectedTextArray.length; i++) {
                const sentences = nlp.readDoc(selectedTextArray[i][0]).sentences().out();
                sentences.forEach(sentence => {
                    if (sentence.length > 5) {
                        splitSentencesArray.push([sentence]);
                    }
                });
            }
            selectedTextArray = splitSentencesArray;
        }

        // Send the selected text in batches to worker for processing
        document.getElementById('progress').style.display = 'block'; // show progress bar
        const startTime = Date.now();

        const batchSize = 10;

        for (let i = 0; i < selectedTextArray.length; i += batchSize) {
            const batch = selectedTextArray.slice(i, i + batchSize);
            // simpleBatch is an array of strings as expected by model
            const simpleBatch = batch.map(text => text[0]);
            // Send the batch to the worker for processing
            worker.postMessage({ batch: simpleBatch, model: model });
            progressCounter++;
        }

        // Listen for messages from the worker
        worker.onmessage = async function (event) {
            //console.log('Worker message:', event.data);
            if (event.data.status === 'progress' && event.data.file === 'onnx/model_quantized.onnx') {
                // update progress bar for model loading
                const percentComplete = Math.round(event.data.progress);
                updateProgressBar(percentComplete);
                userNotice(`Model is loading. Subsequent cache loads will be faster.`);

            } else if (event.data.status === 'complete') {
                // update progress bar for batch completion
                progressCounter--;
                const percentComplete = ((selectedTextArray.length - progressCounter * batchSize) / selectedTextArray.length) * 100;
                updateProgressBar(percentComplete);
                userNotice(`Analysis is underway.  Results will appear in the new sheet.`);

                // Output batch results to the sheet
                await outputResults(event.data.results, sheetName, tableName, progressCounter);

                // Once all batches have been processed, update UI and send GA event
                if (progressCounter === 0) {
                    const endTime = Date.now();
                    const analysisTime = Math.round((endTime - startTime) / 1000);
                    gtag('event', 'analysis_end', {
                        'complete_time_sec': analysisTime
                    });
                    userNotice(`Analysis complete. ${selectedTextArray.length} cells in ${analysisTime} seconds.`);
                    document.getElementById('progress').style.display = 'none';
                    isAnalyzing = false;
                }
            }
        };

        // Listen for errors from the worker
        worker.onerror = function (event) {
            console.error('Worker error:', event.message);
        };

    } catch (error) {
        console.error('Error during analysis:', error);
        isAnalyzing = false;
    }
}

// Button event listeners

// Analyze button event listener
document.getElementById('analyzeBtn').addEventListener('click', analyzeText);

// Cancel button event listener
document.getElementById('cancel').addEventListener('click', () => {
    // terminate the worker and create a new one, update UI
    worker.terminate();
    worker = createWorker();
    userNotice('Analysis cancelled');
    document.getElementById('progress').style.display = 'none'
    // send GA event for cancel of analysis
    gtag('event', 'analysis_cancel');
    isAnalyzing = false;
});