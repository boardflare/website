---
title: Sentiment Analysis for Sheets
---

# Sentiment Analysis for Sheets

Performs sentiment analysis in Google Sheets with no cloud API usage.  Unlimited free analysis and your data is not shared.

## Overview

Simple steps to use:
1.  Select a column of cells with text you want to analyze.
2.  Click the analyze button in the sidebar.
3.  Sentiment scores are output on a new sheet.

The analysis is performed by code running in the sidebar in your browser, instead of sending it to a cloud API for processing.  This means the add-on can provide you with unlimited processing at no cost.   Also, your text data never leaves the Google Sheets™️ environment.

## Installation

<a href="https://workspace.google.com/marketplace/app/sentiment_analysis_for_google_sheets/320314197906">
    <img 
        alt="Google Workspace Marketplace badge" 
        src="https://workspace.google.com/static/img/marketplace/en/gwmBadge.svg"  
        style="padding-top: 20px; width: 400px;"
    />
</a>

## Demo

Link to sample worksheet.

[Youtube Demo Video](http://www.youtube.com/watch?v=Qek18IJXClM)

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


## Changelog

1.2 - 2024-04-29
- Added Product Reviews multi-lingual sentiment model.
- Ability to split sentences using [WinkNLP](https://winkjs.org/wink-nlp/).

1.1 - 2024-04-11
- Ability to select different sentiment models.
- Added Twitter Messages and Finance News sentiment models to existing Movie Reviews model.

1.0 - 2024-03-29
- First version published to Google Workspace Marketplace.
- Single sentiment model (Reviews) with default settings.