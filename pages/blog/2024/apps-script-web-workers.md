---
title: Creating a Web Worker with Google Apps Script
date: 2024-04-15
---

# Creating a Web Worker with Google Apps Script
April 15, 2024

## Background

In Google Sheets extensions, Google Apps Script is used to serve the HTML page for the sidebar in the UI.  To do machine learning (or any other intensive processing) client-side, ideally you want to use a [web worker](https://web.dev/articles/workers-basics) so the UI can remain responsive (e.g. to report on progress, cancel the operation, etc.) and also to enable multi-threaded processing. 

## Problem

Google Apps Script doesn't support serving a worker script directly from a file.

## Solution

We'll use the [inline worker](https://web.dev/articles/workers-basics#inline_workers) pattern. The first step is to put the worker code in an html file in the Google Apps Script project, e.g. `worker.html`, with no html tags as shown below.  

```html
self.onmessage = function(e) {
  console.log('Message received from main script');
  var workerResult = 'Result: ' + (e.data[0] * e.data[1]);
  console.log('Posting message back to main script');
  self.postMessage(workerResult);
}
```
Next, we inline the worker code in the main HTML file using a Google Apps scriptlet to assign the text contents of the worker.html to a variable.  Note the `<?!=` syntax with the exclamation mark to prevent escaping of the script. After that we create a blob and object URL, and then a new Worker using the object URL.  In our case we use the `type: 'module'` option on the Worker constructor, which creates a [module worker](https://web.dev/articles/module-workers), which we need for the ESM-only library we are using in the worker.

```html
<!DOCTYPE html>
<html>
  <head>
    <base target="_top">
  </head>
  <body>
    <script type="module">
    var workerScript = `<?!= HtmlService.createTemplateFromFile('worker').evaluate().getContent() ?>`
    var blob = new Blob([workerScript], {type: 'application/javascript'});
    var workerUrl = URL.createObjectURL(blob);
    var worker = new Worker(workerUrl, {type: 'module'});
    worker.onmessage = function(e) {
      console.log(e.data);
    };
    worker.postMessage('Start processing data');
    </script>
  </body>
</html>

```

One problem with this approach is that `worker.html`, without script tags, is not treated by a code editor as JavaScript, so no syntax highlighting, etc.  You could add script tags in the `worker.html` file to fix this and then strip them back out again from the string in `workerScript` before passing it into the blob.  In our case we're developing the worker code in a plain web app first before copying it into the Google Apps Script project, so this isn't an issue.