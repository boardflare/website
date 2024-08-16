---
title: Machine Translation
---

# Machine Translation

## Overview

Machine Translation is a subfield of computational linguistics that focuses on the automatic translation of text from one language to another. The goal of machine translation is to produce translations that are as accurate and natural-sounding as those produced by human translators. Machine translation can be used in a variety of applications, such as translating web pages, documents, or user-generated content in real-time.

## Models

Translation-specific models are typically text-to-text models that have been fine-tuned for translation, and come in two main types: single language pair models and multi-lingual models.  Text-to-text models such as T5 are also trained on translation tasks.  Recently, LLM's such as GPT-4o and Gemini Pro 1.5 have become very good at translation tasks across a large number of languages as well, typically surpassing the quality of specialized open and closed models in common language pairs.

### Single Language Pair

For example, [Opus MT](https://huggingface.co/Helsinki-NLP) has a wide variety of models trained for specific language pairs using the MarianMT architecture. See their [paper](https://arxiv.org/pdf/2212.01936). 8-bit quantized versions consume roughly 500 MB of RAM, and 100 MB of disk (encoder and decoder).  On a single thread of a low-end CPU, with greedy decoding (num_beams = 1), they generate around 5-10 tokens per second.

These models do not require the `src_lang` and `tgt_lang` parameters, as they are designed for a specific language pair.

### Multi-lingual

These models are trained on multiple languages and can translate between any pair of them. The `src_lang` and `tgt_lang` parameters are required to guide the model with the source and target languages. They have been trained on data that includes parallel sentences in multiple languages, with each sentence prefixed by a token indicating its language, e.g. 

- **Source Sentence**: `<en> My name is Wolfgang and I live in Berlin`
- **Target Sentence**: `<de> Mein Name ist Wolfgang und ich lebe in Berlin`

A custom tokenizer is used to inject the src_lang and tgt_lang tokens into the input and output sequences.  The model is trained to associate these tokens with the corresponding languages, so when it sees `<en>`, it expects English text, and when it sees `<de>`, it expects German text.

Some of the popular open-source models are as follows:

- [facebook/mbart-large-50-many-to-many-mmt](https://huggingface.co/mbart-large-50-many-to-many-mmt): This model is trained on 100 languages and can translate between any pair of them.

- [facebook/m2m100_1.2B](https://huggingface.co/facebook/m2m100_1.2B): This model is trained on 100 languages and can translate between any pair of them.

- [facebook/nllb-200-1.3B](https://huggingface.co/facebook/nllb-200-1.3B): This model is trained on 200 languages and can translate between any pair of them. 

### Text to Text Generation models

Text-to-text models such as T5 are also trained on translation tasks.  They require a prompt to specify the task, e.g. "translate English to German: My name is Wolfgang and I live in Berlin".  The model is trained to generate the target language text based on the source language text and the task prompt.

## Datasets

There are several datasets available for training and evaluating machine translation models. Some of the most popular ones include:

- [Flores 101](https://www.kaggle.com/datasets/mathurinache/flores101): This dataset contains parallel text data for 101 languages. It is designed to be used for low-resource machine translation.  Flores [language codes](https://github.com/openlanguagedata/flores).

- [WMT](https://www.statmt.org/): This has links to an annual workshop that provides datasets for several language pairs and organizes shared tasks for machine translation.

- [OPUS](http://opus.nlpl.eu/): This is a collection of translated texts from the web. It covers a wide range of languages and domains.

## Evaluation Metrics

The quality of machine translation is typically evaluated using automatic metrics that compare the machine-generated translations to reference translations produced by human translators. Some of the most commonly used metrics include:

- **BLEU (Bilingual Evaluation Understudy)**: This metric calculates the precision of the machine-generated translation at the n-gram level. It is the most widely used metric for machine translation.

- **METEOR (Metric for Evaluation of Translation with Explicit ORdering)**: This metric considers precision, recall, synonymy, stemming, and word order to evaluate the quality of the machine-generated translation.

- **TER (Translation Edit Rate)**: This metric calculates the number of edits (insertions, deletions, substitutions, and shifts) needed to change the machine-generated translation into one of the reference translations.

- **CHRF (Character n-gram F-score)**: This metric calculates the F-score at the character level, which can be more sensitive to small differences in the translations.

- **BERTScore**: This metric uses BERT embeddings to evaluate the semantic similarity between the machine-generated translation and the reference translation.

## Benchmarks

https://opus.nlpl.eu/dashboard/
