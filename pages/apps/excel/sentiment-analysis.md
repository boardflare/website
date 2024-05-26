---
title: Sentiment Analysis for Excel
---

# Sentiment Analysis for Excel

Provides sentiment analysis for text in Excel spreadsheets.

## Overview

Sentiment analysis classifies text as having positive or negative overall sentiment, and is commonly used in customer support, market research, finance, etc.

<h3>FEATURES</h3>

<ul>
    <li>💻Analysis is performed locally in your spreadsheet, not in the cloud.</li>
    <li>🤗Uses open source machine learning models on <a href="https://huggingface.co">Hugging Face</a>.</li>
    <li>🆓Unlimited free processing, no usage fees.</li>
    <li>🔒Your data stays in your spreadsheet, no privacy concerns.</li>
</ul>

<h3>BASIC USAGE</h3>

<ul>
    <li>Select column of text to analyze.</li>
    <li>Click analyze button in taskpane.</li>
    <li>Results appear in new sheet.</li>
</ul>

<h3>ADVANCED USAGE</h3>

<ul>
    <li>Choose from four different sentiment analysis models.</li>
    <li>Optionally split paragraphs into individual sentences.</li>
</ul>

See <a href="https://www.boardflare.com/tasks/nlp/sentiment">documentation</a> for further details.


## Installation

<a href="https://appsource.microsoft.com/en-us/product/office/WA200006918?tab=Overview">
    <img 
        src="/images/MS_AppSource.png" 
        alt="AppSource"
        style="padding-top: 10px; width: 200px;"
    />
</a>

## Instructions

### Basic Usage
- Once installed, open the task pane by clicking on the 🙂 icon in the ribbon.
- Select the range of cells containing the text you want to analyze. The range must be a single column, with no limit on the number of cells, although we haven't tested to find the breaking point on this yet.
- Click "Analyze", and a new sheet is added to your workbook to hold the results.
analysis will run in your spreadsheet.

![Excel Select Text](/images/excel-sentiment-select.png)

- On first use, it will take some additional time for the model to download from [Hugging Face](https://huggingface.co/).  Subsequent uses will be faster, as the model will be cached in your browser storage, including for Excel desktop.
- As analysis progresses, the results will appear in the new sheet.
- You can click cancel at any time to stop the analysis and start over.

![Excel Results](/images/excel-sentiment-results.png)

A close-up hypothetical example of the output is as follows:

| Text - Model: Movie Reviews | Label | Score |
| :----- | :----: | ----: |
| I really enjoyed it. | POSITIVE | 0.99 |
| This is the worst movie I've ever seen. | NEGATIVE | 0.99 |
| I liked Karim, but story was awful. |  POSITIVE |  0.70 |

The first column is a copy of the text you selected, with a header identifying the model used. The default model will be Movie Reviews, see [advanced](#advanced) below on how to select other models.  The second column is the sentiment label (e.g. POSITIVE).  The third column is the confidence score (0 to 1) of the sentiment prediction.  The higher the score, the more confident the model is in the prediction.  Note in the example above, the model is less confident that the last row of text is positive, because it actually contains two different sentiments.

### Advanced Usage

Toggling the Advanced options button will reveal the following additional options:

- Model selection:  Select the [sentiment model](#models) you wish to use.  The default is Movie Reviews, as it is a popular general-purpose sentiment model. Product Reviews would also be a good general-purpose option, with the benefit of supporting more languages. The other models are more specialized, e.g. Finance News is trained on financial phrases, Twitter Messages is trained on tweets, etc.
- Split into sentences:  This will use [sentence boundary detection](https://en.wikipedia.org/wiki/Sentence_boundary_disambiguation) to split the text into sentences.  This is useful for breaking up paragraphs which may contain different sentiments, e.g. a support ticket which contains a complaint and a compliment.  We are exploring [Aspect-based Sentiment Analysis](https://paperswithcode.com/task/aspect-based-sentiment-analysis) as more powerful solution to this.

### Demo

[Youtube Demo Video](http://www.youtube.com/watch?v=Qek18IJXClM)

## Changelog

1.0.0 - 2024-04-30 (published to AppSource)
- Initial release.
- Added Product Reviews multi-lingual sentiment model.
- Ability to split sentences using [WinkNLP](https://winkjs.org/wink-nlp/).

0.2.0 - 2024-04-11 (insider preview)
- Ability to select different sentiment models.
- Added Twitter Messages and Finance News sentiment models to existing Movie Reviews model.

0.1.0 - 2024-03-29 (insider preview)
- Single sentiment model (Reviews) with default settings.