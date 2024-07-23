/* 

This is the main script for the Excel add-in sidebar. It handles the user interactions, interacts with the Excel API, and communicates with the worker for text analysis.

*/

// Excel-specific UI elements
document.getElementById("supportLink").href = "mailto:support@boardflare.com?subject=Text Classification for Excel";

let officeToken = null;
Office.onReady().then(function () {
    Office.auth.getAccessToken({ allowSignInPrompt: true, allowConsentPrompt: true }).then(function (token) {
        officeToken = jwt_decode(token);
    }).catch(function (error) {
        console.error('Error getting token', error);
        officeToken = { oid: 'error' };
    }).finally(function () {
        gtag('config', 'G-9DR1JJBTX1', {
            cookie_flags: 'samesite=none;secure',
            page_title: "Text Classification for Excel",
            page_location: "https://text-classification.com/excel",
            content_group: "Text Classification",
            content_type: "Excel",
            user_id: officeToken.oid
        });
    });
});

const getSelectedText = async function () {
    return await Excel.run(async context => {
        const selectedRange = context.workbook.getSelectedRange();
        selectedRange.load("values, address");
        await context.sync();
        userNotice.textContent = "";

        // Check if the selected range is a single column
        if (selectedRange.values[0].length !== 1) {
            userNotice.textContent = "Please select a single column of text.";
            gtag('event', 'analysis_error', {
                'error': 'Not a single column'
            });
            return;
        }

        // Check if all values in the column are text
        for (let i = 0; i < selectedRange.values.length; i++) {
            if (typeof selectedRange.values[i][0] !== 'string') {
                userNotice.textContent = "The selected column should contain text only.";
                gtag('event', 'analysis_error', {
                    'error': 'Not a string'
                });
                return;
            }
        }

        return {
            values: selectedRange.values,
            address: selectedRange.address
        };
    });
}

const createOutputSheet = async function (sheetName) {
    return await Excel.run(async function (context) {
        const worksheets = context.workbook.worksheets;
        let sheet = worksheets.add(sheetName);
        sheet.activate();
        let table = sheet.tables.add("A1:C1", true);
        table.getHeaderRowRange().values = [
            ["Input Text", "Predicted Tag", "Confidence"]
        ];
        table.load('name');
        await context.sync();
        table.columns.getItemAt(0).getRange().format.columnWidth = 150;
        table.columns.getItemAt(1).getRange().format.columnWidth = 150;
        let confidenceColumn = table.columns.getItemAt(2).getRange();
        confidenceColumn.format.columnWidth = 60;
        confidenceColumn.numberFormat = [["0.00"]];
        await context.sync();
        return table.name;
    }).catch(function (error) {
        console.log(error);
    });
}

const outputResults = async function (rows, sheetName, tableName) {
    return Excel.run(function (context) {
        const worksheets = context.workbook.worksheets;
        let sheet = worksheets.getItem(sheetName);
        let table = sheet.tables.getItem(tableName);
        table.rows.add(null, rows);
        return context.sync();
    }).catch(function (error) {
        console.log(error);
    });
}

const createWorker = function () {
    return new Worker('worker.js', { type: 'module' });
}

const textRange = document.getElementById("textRange");
const labelRange = document.getElementById("labelRange");
const getTextRangeButton = document.getElementById("getTextRange");
const getLabelRangeButton = document.getElementById("getLabelRange");
const analyzeButton = document.getElementById("analyzeBtn");
const progressBar = document.getElementById("progressBar");
const progressDiv = document.getElementById("progress");
const userNotice = document.getElementById("userNotice");

function updateProgressBar(percentComplete) {
    progressBar.style.width = percentComplete + '%';
    progressBar.textContent = Math.round(percentComplete) + '%';
}

let worker;
let textValues;
let labelValues;

getTextRangeButton.addEventListener("click", async () => {
    const selectedText = await getSelectedText();
    textRange.textContent = selectedText.address;
    textValues = selectedText.values.flat().map(value => value.toLowerCase());
    gtag('event', 'text_range', {
        cells: textValues.length
    });
});

getLabelRangeButton.addEventListener("click", async () => {
    const selectedText = await getSelectedText();
    labelRange.textContent = selectedText.address;
    labelValues = selectedText.values.flat().map(value => value.toLowerCase());
    gtag('event', 'label_range', {
        cells: labelValues.length
    });
});

analyzeButton.addEventListener("click", async () => {
    analyzeButton.disabled = true;
    progressDiv.style.display = 'block';
    worker = createWorker();
    gtag('event', 'analysis_start');
    const startTime = Date.now();

    let batchIndex = 0;
    const batchSize = 1;
    const sheetName = "Classified Text -" + self.crypto.randomUUID().substring(0, 4);
    const tableName = await createOutputSheet(sheetName);

    const processBatch = (batch) => {
        return new Promise((resolve, reject) => {
            worker.onmessage = async (event) => {
                if (event.data.status === 'result') {
                    const rows = event.data.value.map(result => [result.text, result.label, result.score]);
                    await outputResults(rows, sheetName, tableName);
                    const progress = (batchIndex / textValues.length) * 100;
                    updateProgressBar(progress);
                    resolve();
                }
            };

            worker.onerror = function (error) {
                console.error('Error in worker:', error);
                reject(error);
            };

            worker.postMessage({
                textValues: batch,
                labelValues
            });
        });
    };

    const sendNextBatch = async () => {
        if (batchIndex < textValues.length) {
            const batch = textValues.slice(batchIndex, batchIndex + batchSize);
            await processBatch(batch);
            batchIndex += batchSize;
            await sendNextBatch();
        } else {
            analyzeButton.disabled = false;
            userNotice.textContent = 'Done';
            progressDiv.style.display = 'none';
            worker.terminate();
            const endTime = Date.now();
            const analysisTime = Math.round((endTime - startTime) / 1000);
            gtag('event', 'analysis_end', {
                'complete_time_sec': analysisTime
            });
        }
    };

    await sendNextBatch();
});

document.getElementById("cancel").addEventListener("click", () => {
    worker.terminate();
    analyzeButton.disabled = false;
    progressDiv.style.display = 'none';
    userNotice.textContent = 'Cancelled.';
    gtag('event', 'analysis_cancel');
});