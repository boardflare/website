import { cancelLocalTasks } from "./opus-translate.js";
import { cancelBatch } from "../utils/batcher.js";
import { configureApiBaseUrl } from "../utils/routing.js";

// Set apiBaseUrl on the window object
configureApiBaseUrl();

// App configuration
window.appConfig = {
    app_version: "1.0.5",
    content_group: "translate",
    content_type: "excel",
    function: "TRANSLATE",
}

// Google Analytics config
window.dataLayer = window.dataLayer || [];
window.gtag = function () { dataLayer.push(arguments); };
window.gtag('js', new Date());
window.gtag('config', 'G-P6GVMW0P9R', {
    ...window.appConfig,
});

// Setup cancel button
document.addEventListener('DOMContentLoaded', function () {
    const cancelButton = document.getElementById('cancelButton');
    cancelButton.addEventListener('click', function () {
        this.disabled = true; // disable the button after first click
        console.log('Cancel button clicked from taskpane!');
        // Cancel the local tasks
        cancelLocalTasks();
        // Cancel the batched tasks
        cancelBatch();
        // Reloading the page so that tasks can resolve
        setTimeout(function () {
            location.reload();
        }, 2000); // 2000 milliseconds = 2 seconds
    });
});