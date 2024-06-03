---
title: Machine Translation
---

# Machine Translation

## Overview

Machine Translation is a subfield of computational linguistics that focuses on the automatic translation of text from one language to another. The goal of machine translation is to produce translations that are as accurate and natural-sounding as those produced by human translators. Machine translation can be used in a variety of applications, such as translating web pages, documents, or user-generated content in real-time.

## Datasets

There are several datasets available for training and evaluating machine translation models. Some of the most popular ones include:

- [Flores 101](https://www.kaggle.com/datasets/mathurinache/flores101): This dataset contains parallel text data for 101 languages. It is designed to be used for low-resource machine translation.  Flores [language codes](https://github.com/openlanguagedata/flores).

- [WMT](https://www.statmt.org/): This has links to an annual workshop that provides datasets for several language pairs and organizes shared tasks for machine translation.

- [OPUS](http://opus.nlpl.eu/): This is a collection of translated texts from the web. It covers a wide range of languages and domains.

## Models

There are several pre-trained models available for machine translation, most of which are based on the Transformer architecture. Some of the most popular ones include:

- [Opus MT](https://huggingface.co/Helsinki-NLP): These models are trained for specific language pairs using the MarianMT architecture. See their [paper](https://arxiv.org/pdf/2212.01936) and [GitHub repo](https://github.com/Helsinki-NLP/Opus-MT). They are small enough to be run on a typical desktop CPU, consuming roughly 500 MB of RAM, and 100 MB of disk (encoder and decoder).  On a single thread of a mid-range CPU, with greedy decoding (beams = 1), they generate around 5-10 tokens per second.

- [Facebook M2M-100](https://huggingface.co/facebook/m2m100_418M): This model is trained on 100 languages and can translate between any pair of them. It is based on the mBART architecture.  The quantized 418M version is roughly 600 MB in size, consuming about 2 GB of RAM.  On a single thread of a mid-range CPU, with greedy decoding (beams = 1), it generates around 1-2 tokens per second.

- [Facebook NLLB-200](https://huggingface.co/facebook/nllb-200-distilled-600M): This model is trained on 200 languages and can translate between any pair of them. It is also based on the mBART architecture.  The quantized 600M version is roughly 900 MB in size.

## Evaluation Metrics

The quality of machine translation is typically evaluated using automatic metrics that compare the machine-generated translations to reference translations produced by human translators. Some of the most commonly used metrics include:

- **BLEU (Bilingual Evaluation Understudy)**: This metric calculates the precision of the machine-generated translation at the n-gram level. It is the most widely used metric for machine translation.

- **METEOR (Metric for Evaluation of Translation with Explicit ORdering)**: This metric considers precision, recall, synonymy, stemming, and word order to evaluate the quality of the machine-generated translation.

- **TER (Translation Edit Rate)**: This metric calculates the number of edits (insertions, deletions, substitutions, and shifts) needed to change the machine-generated translation into one of the reference translations.

- **CHRF (Character n-gram F-score)**: This metric calculates the F-score at the character level, which can be more sensitive to small differences in the translations.

- **BERTScore**: This metric uses BERT embeddings to evaluate the semantic similarity between the machine-generated translation and the reference translation.

## Benchmarks

https://opus.nlpl.eu/dashboard/
