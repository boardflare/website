# Text Classification

## Overview

Text classification is a process of labeling text with one or more tags or classes. This application uses a Zero-Shot Text Classification approach to classify text data in a spreadsheet. 

## Text Classification for Excel

Link below is a placeholder, the extension is not yet available in the Microsoft AppSource store.

<a href="https://appsource.microsoft.com/en-us/product/office/WA200006918?tab=Overview">
    <img 
        src="/images/MS_AppSource.png" 
        alt="AppSource"
        style="padding-top: 10px; width: 200px;"
    />
</a>

This app is free for unlimited use.

### Basic Usage
- Once installed, open sidebar by clicking on Classify Text icon 🏷️in the Excel ribbon.
- The tool requires a range of cells containing the text to be classified and a range with a set of possible tags.
- In the workbook, select a range of cells to use for the **Text**, and click **Get Range** to load the values. Note that once the data is loaded, it won't be refreshed until you click **Get Range** again. So if you change the data in the cells, you will need to click **Get Range** again.
- Select a range of cells to use for the **Tags**, and click **Get Range** to load the values.

![Excel Select Text](/images/excel-classify-select-ranges.png)

- Click **Analyze** to start the classification. A progress bar will be displayed in the sidebar to show the progress. Only one classification can be run at a time, the Classify button will be disabled until the first classification is complete.
- The output will be generated in a new sheet. The first column will be a copy of the input text range, with the header "Input Text". The second column will contain the predicted tag, with the header "Predicted Tag". The third column is a confidence score for each prediction.
- Click **Cancel** at any time to stop the processing.

![Excel Results](/images/excel-classify-output.png)

### Joining with XLOOKUP
Once you have the output sheet with classifications, you can use the [XLOOKUP function](https://support.microsoft.com/en-us/office/xlookup-function-b7fd680e-6d10-43e6-84f9-88eae8bf5929) to join your data. 

## Model

The model used is an ONNX version of [DistilBERT MNLI](https://huggingface.co/typeform/distilbert-base-uncased-mnli) from [Typeform](https://www.typeform.com/), which is able to classify text into categories it has not seen during training.

## Zero-Shot Text Classification

There are two general approaches to text classification:

1. **Text Classification**: This is a supervised learning approach where the model is trained on a pre-labeled dataset. The model learns to associate the input (text) with the output (label) during training. Once the model is trained, it can be used to predict the labels of new, unseen text data. However, it can only classify text into labels that it has seen during training.  This the approach used for sentiment analysis, spam detection, and other similar tasks where the labels are known in advance.

2. **Zero-Shot Text Classification**: This is a more flexible approach where the model is not trained on any specific labels. Instead, it leverages pre-trained language models that understand language in a broad context. When given a text and a set of possible labels, the model generates predictions even if it has never seen those labels during training. This is particularly useful when you have a small amount of data or when you want the model to be able to handle a wide variety of labels.

Natural Language Inference (NLI) is a task in Natural Language Processing (NLP) where the goal is to determine if a given hypothesis can be inferred from a given premise. In other words, given two sentences, the task is to determine whether the second sentence is a consequence of the first one.

In the context of Zero-Shot Text Classification, NLI is used in a creative way. The idea is to frame the classification task as an inference problem. For each possible label, a template sentence is created that includes the label. The model is then asked to infer if this template sentence is a consequence of the text to be classified.

For example, if we have a text "The cat is sleeping on the sofa" and we want to classify it into either "animal behavior" or "furniture", we would create two template sentences: "This text is about animal behavior" and "This text is about furniture". The model then infers which of these sentences is a more likely consequence of the original text.

This approach allows us to use NLI models for classification tasks, even if the model has never seen the specific labels during training, hence the term "Zero-Shot". 

## Changelog

1.0.0 - 2024-05-20
- Initial version for Excel.