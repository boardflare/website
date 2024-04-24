---
title: Sentiment Analysis API
US: 540
---

# Sentiment Analysis API

If you need to integrate sentiment analysis into a real-time workflow (e.g. analyze sentiment of support tickets for routing), you'll need to use an API which processes the text and returns the sentiment analysis results.  Here are some APO options to help you get started down this path.

## Hugging Face Inference Endpoints

The open source models we use in our tools are are downloaded from [Hugging Face](https://huggingface.co/models), which provides a large collection of pre-trained models for natural language processing tasks, including sentiment analysis. They also offer [Inference Endpoints](https://huggingface.co/docs/inference-endpoints/index) whereby the same models can be used via API.  This is a good option if you want to use the same models we use in our tools, but need to integrate them into your own applications.

## Specialist NLP API Providers

- [MonkeyLearn](https://www.monkeylearn.com/)
- [MeaningCloud](https://www.meaningcloud.com/)
- [Rosette](https://www.rosette.com/)
- [Lexalytics](https://www.lexalytics.com/)

## Large Cloud API Providers

All the large cloud providers offer natural language processing API's, which include sentiment analysis.  These use proprietary models are typically more expensive, but also offer more features and higher accuracy.  Most of them offer a free tier for limited usage so they are easy to try out.

Here are some options:

- [Google Cloud Natural Language API](https://cloud.google.com/natural-language)
- [IBM Watson](https://www.ibm.com/watson/services/natural-language-understanding/)
- [Microsoft Azure Text Analytics API](https://azure.microsoft.com/en-us/services/cognitive-services/text-analytics/)
- [Amazon Comprehend](https://aws.amazon.com/comprehend/)