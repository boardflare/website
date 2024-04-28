---
title: Sentiment Analysis
---

# Sentiment Analysis

## Overview

Sentiment analysis classifies text as having positive or negative overall sentiment, and is commonly used in customer support, market research, finance, etc.  The following table shows an example output from sentiment analysis:

| Example Text  | Sentiment | Score |
| :----- | :----: | ----: |
| I love this product! |  Positive |  0.90 |
| This is the best service I've ever had. | Positive | 0.95 |
| I'm really enjoying this. | Positive | 0.92 |
| I'm not happy with this. | Negative | 0.93 |
| This is the worst experience I've had. | Negative | 0.99 |

## Tools

The following tools are available:
- [Sentiment Analysis for Excel](/tools/text/sentiment/excel)
- [Sentiment Analysis for Google Sheets](/tools/text/sentiment/sheets)
- [Sentiment Analyiss Online Tool](/tools/text/sentiment/online)

Key features:
- Use open source AI models for sentiment analysis.
- Analysis is done locally in your browser, no data is sent to the cloud.
- Free for unlimited use, with no account creation required.

## Models

Sentiment analysis is performed using AI models which have been trained on datasets (e.g. movie reviews, tweets, etc.) where the sentiment has been labeled by human annotators.  The AI model then learns to predict the sentiment of new text based on the patterns it has learned from the human labeled data.

### Available Models

The sentiment analysis models currently are available in our tools are shown in the table below:

| Name | Model | Training Data | Output Labels |
| :--- | :---- | :---------- | :---------- |
| Reviews (default)| [distilbert-base-uncased-finetuned-sst-2-english](https://huggingface.co/distilbert/distilbert-base-uncased-finetuned-sst-2-english) | Movie review phrases from the [Stanford Sentiment Treebank](https://paperswithcode.com/dataset/sst) dataset. | Positive, Negative |
| Finance | [finbert](https://huggingface.co/ProsusAI/finbert) | Financial phrases from the [financial phrasebank dataset](https://huggingface.co/datasets/financial_phrasebank). | Positive, Negative, Neutral |
| Tweets | [twitter-roberta-base-sentiment-latest](https://huggingface.co/cardiffnlp/twitter-roberta-base-sentiment-latest) | ~124M tweets from the [TweetEval](https://github.com/cardiffnlp/tweeteval) dataset. | Positive, Negative, Neutral |

All of these models have the following limitations:
- English language only.
- Maximum text length of ~400 words per cell.  Text beyond this will be ignored.

### Datasets

Examples taken from the datasets and the corresponding model results are shown below.

<iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSgDjLzGHTqZ081JU2ErXbOpJDNewYfqfj5hvuZVsVpeprPkwm-BmdYijBzLjlwO94_MqIaoljTTerr/pubhtml?widget=true&amp;headers=false" width="830" height="500"></iframe>

### Accuracy

Accuracy in sentiment analysis depends on how close the training set is to the type of text you are analyzing.  For example, a model trained on movie reviews may not perform well on financial text, but may perform acceptably on hotel reviews.  Other factors which can affect accuracy include the length of the text, the presence of sarcasm, irony, and negation, and the presence of emojis and emoticons.

For example, "I love how it took 3 hours to get my food" is a sarcastic negative sentiment, but the model may classify it as positive because of the word "love".

You can try using different models to see which one gives the best result on your data.  However, in many cases, to get high accuracy you will need to train a custom model using your data and labels.  We don't currently support doing this, but it is something we are considering for the future.

### Performance

The tools currently use a single CPU thread on your computer to run the sentiment analysis.   If you have a large dataset, for now you can easily let it run in the background for as long as needed (e.g. several hours is fine), and in the future we will offer other options for accelerated processing.

## Version History

1.3 - 2024-04-11
- Ability to select pre-trained sentiment model.
- Added Tweets and Finance News sentiment models to existing Reviews model.
- Changed UI to Google standards.
- Added link to support.

1.2 - 2024-03-29
- First version published to Google Workspace Marketplace.
- Progress bar added.
- Error handling improvements.

1.1 - 2024-03-15
- Private beta release.
- Single review model.

1.0 - 2024-03-01
- Internal POC.