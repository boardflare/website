// Code for custom functions in Excel

let worker;
let taskQueues = {};
let isWorkerBusy = false;
let currentTask = null;
let currentLanguagePair = null;

export function cancelLocalTasks() {
    worker.terminate(); // otherwise will keep streaming
    // Resolve the current task with "canceled" if it exists
    if (currentTask) {
        currentTask.resolve('canceled');
    }
    // Resolve all remaining tasks in the queues with "canceled"
    for (let queue of Object.values(taskQueues)) {
        for (let task of queue) {
            window.gtag('event', 'cancel', {
                'text_length': task.text.length,
            });
            task.resolve('canceled');
        }
    }
};

function setupWorker() {
    worker = new Worker('opus-worker.js', { type: 'module' });

    worker.onerror = function (error) {
        console.error('Task rejected with error:', error);
        window.gtag('event', 'error', {
            'function_js': 'worker.onerror',
            'message': error.message
        });
        currentTask.reject(error);
        isWorkerBusy = false;
        processTasks();
        document.getElementById('update').innerText = error.message;
    };

    worker.onmessage = function (event) {
        //console.log('message received from worker:', event.data);
        try {
            if (event.data.type === "error") {
                throw new Error(event.data.value);
            } else if (event.data.type === "result") {
                const { value, rate } = event.data;
                currentTask.resolve(value);
                window.gtag('event', 'speed', {
                    'model': 'opus-mt',
                    'chars': currentTask?.text?.length ?? 0,
                    'num_beams': currentTask?.quality ?? 1,
                    'tokenpersec': rate ?? 0
                });
                isWorkerBusy = false;
                processTasks();
                document.getElementById('update').innerText = '';
            } else if (event.data.type === "update") {
                document.getElementById('update').innerText = event.data.value;
            } else if (event.data.status === 'progress') {
                const { name, file, progress, loaded, total } = event.data;
                let updateDiv = document.getElementById('update');
                // Add static message at the beginning of the progress updates
                if (updateDiv.innerHTML === '') {
                    updateDiv.innerHTML = 'The model files are loading. Each language pair, e.g. fr-en uses a different model.  On first load, the model (~100 MB) must be downloaded, so it may take a bit longer. Subsequent loads will be faster from the browser cache.  You can track progress below:<br><br>';
                    window.gtag('event', 'model_loading', {
                        'model': name,
                    });
                }
                updateDiv.innerHTML += `${file.slice(0, 30)}, ${Math.round(progress)}%<br>`;
            }

        } catch (error) {
            console.error('onmessage task rejected with error:', error);
            window.gtag('event', 'error', {
                'function_js': 'worker.onmessage',
                'message': error.message
            });
            document.getElementById('update').innerText = error.message;
        }
    };
}

setupWorker();

function displayTaskCounts() {
    let taskCounts = '';
    for (let languagePair in taskQueues) {
        taskCounts += `${languagePair}: ${taskQueues[languagePair].length}  remaining\n`;
    }
    document.getElementById('taskCounts').innerText = taskCounts;
}

function processTasks() {
    try {
        displayTaskCounts();
        if (!isWorkerBusy && Object.keys(taskQueues).length > 0) {

            if (!taskQueues[currentLanguagePair]) {
                // If the current queue is falsey, switch to the next one
                currentLanguagePair = Object.keys(taskQueues)[0];
                // Terminate the existing worker and create a new one
                worker.terminate();
                setupWorker();
            }

            currentTask = taskQueues[currentLanguagePair].shift(); // Get the next task
            const { text, source_lang, target_lang, quality } = currentTask;

            if (taskQueues[currentLanguagePair].length === 0) {
                delete taskQueues[currentLanguagePair]; // Delete the queue if it's empty
            }

            worker.postMessage({ text, source_lang, target_lang, quality });
            isWorkerBusy = true;
        }

    } catch (error) {
        window.gtag('event', 'error', {
            'function_js': 'processTasks',
            'message': error.message
        });
        document.getElementById('update').innerText = error.message;
    }
}

export function opusTranslate(text, source_lang, target_lang) {
    const opusLanguagesValues = Object.values(opusLanguages);
    const hasTarget = opusLanguagesValues.includes(target_lang);
    const hasSource = opusLanguagesValues.includes(source_lang);

    const quality = 1;

    if (source_lang === 'en' && !hasTarget) {
        return Promise.reject("target_lang must be one of " + opusLanguagesValues.join(", "));
    }

    if (target_lang === 'en' && !hasSource) {
        return Promise.reject("source_lang must be one of " + opusLanguagesValues.join(", "));
    }

    if (source_lang !== 'en' && target_lang !== 'en') {
        return Promise.reject("Either source_lang or target_lang must be English (en)");
    }

    return new Promise((resolve, reject) => {
        try {
            const languagePair = `${source_lang}-${target_lang}`;
            if (!taskQueues[languagePair]) {
                taskQueues[languagePair] = [];
            }
            taskQueues[languagePair].push({ text, source_lang: source_lang, target_lang: target_lang, quality, resolve, reject });
            processTasks();
        } catch (error) {
            window.gtag('event', 'error', {
                'function_js': 'translateText',
                'message': error.message
            });
            reject(error);
            document.getElementById('update').innerText = error.message;
        }
    });
}