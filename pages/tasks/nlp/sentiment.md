---
title: Sentiment Analysis
---

# Sentiment Analysis

## Overview

[Sentiment analysis](https://paperswithcode.com/task/sentiment-analysis) classifies text as having positive or negative overall sentiment, and is commonly used in customer support, market research, finance, etc.  Click on a buttons below to get started with the Excel or Sheets extension.

### Spreadsheet Apps

- [Sentiment Analysis for Excel](/apps/excel/sentiment-analysis)
- [Sentiment Analysis for Sheets](/apps/sheets/sentiment-analysis)

### Python Functions

- [azure_sentiment](/functions/text/sentiment-analysis/azure_sentiment).  Uses the [Azure AI Language](https://learn.microsoft.com/en-us/azure/ai-services/language-service/sentiment-opinion-mining/overview?tabs=prebuilt) service to analyze sentiment and opinions in the provided documents. It returns an array containing the sentiment analysis results with sentiment polarity at the document, sentence, and aspect levels. It also provides the opinions used at the aspect level.

## Models

Sentiment analysis is performed using transformer machine learning models which have been trained on datasets (e.g. movie reviews, tweets, etc.) where the sentiment has been labeled by human annotators.  The accuracy of the model depends on how similar your text is to the data the model was trained on.

The sentiment analysis models currently available are shown in the table below:

| Name | Model | Training Data | Output Labels | Language |
| :--- | :---- | :---------- | :---------- | :---------- |
| Movie Reviews | [distilbert-base-uncased-finetuned-sst-2-english](https://huggingface.co/distilbert/distilbert-base-uncased-finetuned-sst-2-english) | Movie review phrases from the [Stanford Sentiment Treebank](https://paperswithcode.com/dataset/sst) dataset. | Positive, Negative | English |
| Finance News| [finbert](https://huggingface.co/ProsusAI/finbert) | Financial phrases from the [financial phrasebank dataset](https://huggingface.co/datasets/financial_phrasebank). | Positive, Negative, Neutral | English |
| Twitter Messages | [twitter-roberta-base-sentiment-latest](https://huggingface.co/cardiffnlp/twitter-roberta-base-sentiment-latest) | ~124M tweets from the [TweetEval](https://github.com/cardiffnlp/tweeteval) dataset. | Positive, Negative, Neutral | English |
| Product Reviews | [bert-base-multilingual-uncased-sentiment](https://huggingface.co/nlptown/bert-base-multilingual-uncased-sentiment) | Trained on multilingual product reviews. | 1 - 5 stars | English, Dutch, German, French, Spanish, and Italian |

## Limitations

- Accuracy: Sentiment analysis is far from an exact science.  The presence of sarcasm, irony, negation, and emojis often confuses sentiment analysis models and leads to errors. YMMV.
- Custom Models: Using a custom model on [Hugging Face](https://huggingface.co/) is not supported at this time, but if this is something you need, please [let us know](/company/support).
- Text length: The models have a maximum input length of about 500 tokens, so any additional text may be truncated.  Sentence splitting may be a workaround for this limitation.
- Language: The models are mostly trained on English text, so the accuracy of the sentiment analysis will be lower for other languages.  We are exploring models for other languages.
- Performance: The extensions currently use a single CPU thread.  If you have a very large dataset, for now you can just let it run in the background for as long as needed (e.g. several hours).  Since it is only using a single CPU thread, it won't slow down whatever else you are doing, lol.  In the future we will offer other options for accelerated processing (e.g. multi-threaded CPU, WebGPU, etc.).

## Applications

- Customer Support: Automatically categorize incoming support tickets as positive, negative, or neutral.
- Market Research: Analyze social media posts to gauge public sentiment about a product or service.
- Finance: Monitor news articles for sentiment about a company or industry.
- Education: Analyze student feedback to improve course content and delivery.
- Healthcare: Analyze patient feedback to improve services and patient outcomes.

## Cloud Options

If you need to integrate sentiment analysis into a real-time workflow (e.g. analyze sentiment of support tickets for routing), you'll need to use an API which processes the text and returns the sentiment analysis results.

The open source models we use in our tools are are downloaded from [Hugging Face](https://huggingface.co/models), which provides a large collection of pre-trained models for natural language processing tasks, including sentiment analysis. They also offer [Inference Endpoints](https://huggingface.co/docs/inference-endpoints/index) whereby the same models can be used via API.  This is a good option if you want to use the same models we use in our tools, but need to integrate them into your own applications.

Here are some NLP API providers which offer sentiment analysis:

- [MonkeyLearn](https://www.monkeylearn.com/)
- [MeaningCloud](https://www.meaningcloud.com/)
- [Rosette](https://www.rosette.com/)
- [Lexalytics](https://www.lexalytics.com/)

All the large cloud providers offer natural language processing API's, which include sentiment analysis.  Most of them offer a free tier for limited usage so they are easy to try out.

- [Google Cloud Natural Language API](https://cloud.google.com/natural-language)
- [IBM Watson](https://www.ibm.com/watson/services/natural-language-understanding/)
- [Microsoft Azure Text Analytics API](https://azure.microsoft.com/en-us/services/cognitive-services/text-analytics/)
- [Amazon Comprehend](https://aws.amazon.com/comprehend/)