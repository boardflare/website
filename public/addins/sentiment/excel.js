// UI elements
document.getElementById("supportLink").href = "mailto:support@boardflare.com?subject=Sentiment Analysis for Excel";

// Get the user's ID and set up GA config, oid is common to all Office apps.
let officeToken = null;
Office.onReady().then(function () {
    Office.auth.getAccessToken({ allowSignInPrompt: true, allowConsentPrompt: true }).then(function (token) {
        officeToken = jwt_decode(token);
        //console.log('officeToken', officeToken);
        gtag('config', 'G-P6GVMW0P9R', {
            cookie_flags: 'samesite=none;secure',
            page_title: "Sentiment Home",
            page_location: "https://apps.boardflare.com/sentiment/excel",
            content_group: "Sentiment",
            content_type: "Excel",
            user_id: officeToken.oid
        });
    }).catch(function (error) {
        console.error('Error getting token', error);
    });
});

// Function to get selected text range from sheet
const getSelectedText = async function () {
    return await Excel.run(async context => {
        const selectedRange = context.workbook.getSelectedRange();
        selectedRange.load("values, address");
        await context.sync();
        //console.log(selectedRange.values);
        return selectedRange.values;
    });
}

// Function to create table and add the model name
const newSheet = async function (sheetName, modelName) {
    return await Excel.run(async function (context) {
        const worksheets = context.workbook.worksheets;
        let sheet = worksheets.add(sheetName);
        sheet.activate(); // Make the new sheet the active one
        let table = sheet.tables.add("A1:C1", true /*hasHeaders*/);
        table.getHeaderRowRange().values = [
            ["Text - Model: " + modelName, "Label", "Score"]
        ];
        table.load('name');
        await context.sync(); // This is required to get the table name
        // Set the width of the columns
        table.columns.getItemAt(0).getRange().format.autofitColumns();
        table.columns.getItemAt(1).getRange().format.autofitColumns();
        table.columns.getItemAt(2).getRange().format.autofitColumns();
        await context.sync();
        return table.name;
    }).catch(function (error) {
        console.log(error);
    });
}

// Output results received from worker to the table
const outputResults = async function (results, sheetName, tableName, progressCounter) {
    const rows = results.map(result => [
        result.text,
        result.label,
        result.score,
    ]);

    return Excel.run(function (context) {
        const worksheets = context.workbook.worksheets;
        let sheet = worksheets.getItem(sheetName);
        let table = sheet.tables.getItem(tableName);
        table.rows.add(null /*add at the end*/, rows);
        return context.sync();
    }).catch(function (error) {
        console.log(error);
    });
}

const createWorker = function () {
    return new Worker('worker.js', { type: 'module' });
}