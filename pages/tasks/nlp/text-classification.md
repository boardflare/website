# Text Classification

## Overview

Text classification is a process of labeling text with one or more tags or classes.  There are two approaches to text classification: supervised learning and zero-shot learning.  [Sentiment analysis](/tasks/nlp/sentiment) and spam detection are examples of supervised learning, where the model is trained on a pre-labeled dataset.  Zero-shot text classification is a more flexible approach where the model is not trained on any specific labels.  Instead, it leverages pre-trained language models that understand language in a broad context.  When given a text and a set of possible labels, the model generates predictions even if it has never seen those labels during training.  This is used when it it is impractical to train a specific model using using supervised learning (e.g. not enough labelled data, labels constantly changing, etc.).  This task is about the zero-shot text classification approach.

## Models

- [DistilBERT MNLI](https://huggingface.co/typeform/distilbert-base-uncased-mnli) from [Typeform](https://www.typeform.com/), which is able to classify text into categories it has not seen during training.


## Natural Language Inference (NLI)

Natural Language Inference (NLI) is a task in Natural Language Processing (NLP) where the goal is to determine if a given hypothesis can be inferred from a given premise. In other words, given two sentences, the task is to determine whether the second sentence is a consequence of the first one.

In the context of Zero-Shot Text Classification, NLI is used in a creative way. The idea is to frame the classification task as an inference problem. For each possible label, a template sentence is created that includes the label. The model is then asked to infer if this template sentence is a consequence of the text to be classified.

For example, if we have a text "The cat is sleeping on the sofa" and we want to classify it into either "animal behavior" or "furniture", we would create two template sentences: "This text is about animal behavior" and "This text is about furniture". The model then infers which of these sentences is a more likely consequence of the original text.

This approach allows us to use NLI models for classification tasks, even if the model has never seen the specific labels during training, hence the term "Zero-Shot". 