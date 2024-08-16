---
title: Hugging Face for Excel
---

# Hugging Face for Excel

Inference models and spaces on Hugging Face using Excel custom functions. 100% free and unlimited use.

## Overview

This app provides functions which wrap existing Hugging Face JavaScript libraries (specifically `@huggingface/inference, @gradio/client, @xenova/transformers`) so that you can inference models and spaces on Hugging Face without having to build/host/publish an Excel add-in.  

We're thinking this could be useful for the following types of users: 
- Data scientists that want an easy way to enable end-users to use their models from the familiar interface of Excel.
- Excel wizards that want to build their own custom AI functions using existing models available on Hugging Face. 
- Model testers and labelers that need an easy way to run datasets through a model and annotate results.

As an example, you could build a custom function that translates text from one language to another using a Hugging Face model, similar to what we did in our [Translate for Excel](/apps/excel/translate) add-in, which uses [Transformers.js](https://github.com/xenova/transformers.js) and the Opus-MT series of models.  The possibilities are endless.

These functions are intended to be consumed in a named Excel [LAMBDA function](https://support.microsoft.com/en-us/office/lambda-function-bd212d27-1cd1-4321-a34a-ccbf254b8b67) to conceal details not relevant to end-users (e.g. task, model, hf_token, endpoint, etc.).

We love open source, but moving the code behind this into its own public repo is a project for another day. 

## Features

🆓 Unlimited free use.<br>
🔒 None of your data is sent to our servers.<br>
💻 Option to inference locally.<br>
🚀 Fast way to test or operationalize your model.<br>

## Functions

As outlined below, the Gradio function uses a repeating parameter function signature to enable it to pass an arbitrary data payload.  All other functions are designed around Transformers pipeline tasks such as translation, summarization, etc. regardless of whether inferencing is local or via API (serverless or dedicated). We have initially supported the most common parameters for each task, and may add more in the future.

Local inference is happening in the same browser iframe that is running the add-in inside Excel, using a separate web worker thread.  Right now this runs on the CPU and is painfully slow for anything but very small models.  This situation will change with the coming release of v3 Transformers.js and the long-awaited WebGPU support.  Stay tuned!

### Gradio

[Gradio](https://www.gradio.app/) is a great way to build AI demos, and is increasingly be used to host APIs for production applications.  Our HF.GRADIO function uses the [Gradio JavaScript client](https://www.gradio.app/docs/js-client) under the hood to connect to the API of a Gradio space and provide user feedback on queue status, ETA, etc.  The function signature is as follows:

```excel
=HF.GRADIO(hf_space, hf_token, arg1, arg2, ...)
```

| Parameter | Required | Description |
| --- | --- | --- |
| hf_space | Yes | Gradio Space ID (e.g. "boardflare/translation"). |
| hf_token | No | Needed for private spaces (e.g. "hf_eiffw3.."). |
| arg1, arg2, ... | Yes | Data array elements to be passed to the space. |

e.g. `=HF.GRADIO("boardflare/translation", "hf_eiffw3..", "Hello", "en", "fr")` for a translation space with similar functionality to the `HF.TRANSLATION` function below.

The `arg1, arg2, ...` is a repeating parameter in Excel which means you can pass as many arguments as you like and they will be packaged as an array and sent to the space as a payload of shape `{data: [arg1, arg2, ...]}`. The args can be of any Excel scalar type (e.g. string, number, boolean). You need to ensure they are passed in the order they are expected by your Gradio app.  The return from the Gradio app must be a scalar of one of the above types.  In case you're wondering if it is possible for each of the args and the return to be matrix values (an Excel range), the answer is yes.  This is not supported currently because it means all arguments would be sent as a matrix, even if they are just single cells, e.g. `{data: [[["foo"]], [["bar"]], ...]}`, since there can be only one repeating parameter in the function.  This doesn't work with single-line standard Gradio app interfaces, so we left that for another day and a different function.

### Translation

The `HF.TRANSLATION` function signature is as follows:

```excel
=HF.TRANSLATION(hf_model, text, [src_lang], [tgt_lang], [hf_token], [hf_endpoint])
```
The parameters are as follows:

| Parameter | Required | Description |
| --- | --- | --- |
| hf_model | Yes | model name (e.g. `Helsinki-NLP/opus-mt-en-de`). |
| text | Yes | Text to be translated. |
| src_lang | No | Source language code (e.g. "en"). |
| tgt_lang | No | Target language code (e.g. "de"). |
| hf_token | No | HF token (e.g. hf_ddie3kd...). |
| hf_endpoint | No | Inference endpoint (e.g. "https://xyz.eu-west-1.aws.endpoints.huggingface.cloud/gpt2"). |

Output: the translated text string.

e.g. `=HF.TRANSLATION("facebook/mbart-large-50-many-to-many-mmt", "Hello, how are you?", "en", "de")` for translation from English to German using serverless API with no token.

e.g. `=HF.TRANSLATION("Xenova/m2m100_418M", "Hello, how are you?", "en", "de")` for translation from English to German using local inference.

If you are new to using translation on Hugging Face, here are some tips:
- Single language-pair models such as `Helsinki-NLP/opus-mt-en-de`, do not need the src_lang and tgt_lang parameters, as the model has been trained to just handle that single pair.
- Multi-lingual models such as `facebook/mbart-large-50-many-to-many-mmt` need the `src_lang` and `tgt_lang` parameters. However, the supported languages and formats are not always on the model card, and vary between models (e.g. `en`, `en_XX`, etc.). The [translation pipeline with Transformers.js](https://huggingface.co/docs/transformers.js/api/pipelines#pipelinestranslationpipeline) has good documentation on which parameters to use for common models.  Note: there are also cases where models requiring `src_lang` and `tgt_lang` such as `facebook/m2m100_418M` have been incorrectly set up on the inference API to use the Text2Text Generation task, and so will throw an error when the parameters are passed.
- Generalized text-to-text models such as T5 are trained to do translation and can be inferenced using the transformers pipeline with a task of `translation_xx_to_yy`, e.g. `translation_en_to_fr`, which will prepend the required prompt to your text, e.g. `translate English to French: My name is Wolfgang and I live in Berlin`.  However, when using the inference API with a Text2Text model like T5, you need to prepend your own translation prompt for the desired language pair, e.g. `translate English to French:...`, because it is running a Text2Text Generation task.  Note that T5 prompts are also in English, regardless of the languages.

### Summarization

The `HF.SUMMARIZATION` function signature is as follows:

```excel
=HF.SUMMARIZATION(hf_model, text, [max_length], [hf_token], [hf_endpoint])
```

The parameters are as follows:

| Parameter   | Required | Description                                                   |
|-------------|----------|---------------------------------------------------------------|
| hf_model    | Yes      | Model name (e.g. `facebook/bart-large-cnn`).               |
| text        | Yes      | Text to be summarized.                                        |
| max_length  | No       | Maximum length of the summary (tokens).                           |
| hf_token    | No       | HF token (e.g. hf_ddie3kd...).                                |
| hf_endpoint | No       | Inference endpoint (e.g. "https://xyz.eu-west-1.aws.endpoints.huggingface.cloud/gpt2"). |

Output: the summarized text string.

e.g. `=HF.SUMMARIZATION("facebook/bart-large-cnn", "The tower is 324 meters (1,063 ft) tall, about the same height as an 81-story building, and the tallest structure in Paris. Its base is square, measuring 125 meters (410 ft) on each side. During its construction, the Eiffel Tower surpassed the Washington Monument to become the tallest building in the world, a title it held for more than 40 years until the completion of the Chrysler Building in New York City in 1930.")` for summarization using serverless API with no token.

### Zero-shot Classification

The `HF.ZERO_SHOT_CLASSIFICATION` function signature is as follows:

```excel
=HF.ZERO_SHOT_CLASSIFICATION(hf_model, text, labels, [hf_token], [hf_endpoint])
```

The parameters are as follows:

| Parameter   | Required | Description                                                                                   |
|-------------|----------|-----------------------------------------------------------------------------------------------|
| hf_model    | Yes      | Model name (e.g. `facebook/bart-large-mnli`).                                                 |
| text        | Yes      | Text to classify.                                                                             |
| labels      | Yes      | Range of labels to score (e.g. D2:D5)                                                                              |
| hf_token    | No       | HF token (e.g. hf_ddie3kd...).                                                                |
| hf_endpoint | No       | Inference endpoint (e.g. "https://xyz.eu-west-1.aws.endpoints.huggingface.cloud/gpt2").     |

Output: a range of scores for each label which will spill across columns.

e.g. `=HF.ZERO_SHOT_CLASSIFICATION("facebook/bart-large-mnli", "I am feeling great today", D2:D5)` for zero-shot classification using serverless API with no token, where D2:D5 contains the labels to score, e.g. "positive", "negative", "neutral", "mixed".

## Installation

Install from the Microsoft AppSource store at the link below, or directly from Excel.

<a href="https://appsource.microsoft.com/en-us/product/office/WA200007046?tab=Overview">
    <img 
        src="/images/MS_AppSource.png" 
        alt="AppSource"
        style="padding-top: 10px; width: 200px;"
    />
</a>