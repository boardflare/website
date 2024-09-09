---
title: FreeGPT for Excel
icon: freegpt.png
---

# FreeGPT for Excel

Unlimited free AI functions running locally in Excel.

## Overview

Provides unlimited free and secure AI functions by using a small model that runs locally on your computer.  While not as fast and smart as ChatGPT, maybe it is all you need for simple tasks.

## Features

🆓 Unlimited free use.<br>
💻 Processed locally on your computer.<br>
🔒 No data is shared outside Excel.<br>

## Requirements
- You must have a device that supports [WebGPU](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API) with `shader-f16`.

## Limitations
- Much slower and less powerful than ChatGPT. 

## Functions

These are the initial functions provided.  PROMPT is the most versatile and enables you to prompt the model to do a wide range of tasks.  The other functions are more specialized and are provided for convenience.

### Classify

=<code>FREEGPT.CLASSIFY (text, categories)</code><br>
<code>text:</code> Text to classify.<br>
<code>categories:</code> Range of categories.<br>
E.g., to classify the content of cell A1 into categories listed in cells B1 to B5:<br>
<code>=FREEGPT.CLASSIFY(A1, B1:B5)</code><br>

### Prompt

=<code>FREEGPT.PROMPT (prompt, [data], [options])</code><br>
<code>prompt:</code> Instructions for model, e.g. "What is the problem this user is having?<br>
<code>data:</code> Optional data to provide context to the model. If a range of cells is provided, it will be converted to a comma-separated list that is added to the prompt.  Continuing with the example above, this could be a cell with a support ticket description.<br>

### Summarize

=<code>FREEGPT.SUMMARIZE (text)</code><br>
<code>text:</code> Text to summarize.<br>
E.g., to summarize the content of cell A1:<br>
<code>=FREEGPT.SUMMARIZE(A1)</code><br>

This just uses the PROMPT function with a default prompt of "Summarize the following text:".  It is provided for convenience.

### Translate

=<code>FREEGPT.TRANSLATE (text, source_lang, target_lang, [model])</code><br>
<code>text:</code> Must be less than 1000 characters.<br>
<code>source_lang:</code> Text language, e.g. "fr" for French.<br>
<code>target_lang:</code> Translation language, e.g. "en" for English.<br>
E.g., to translate cell A1 from French to English:<br>
<code>=FREEGPT.TRANSLATE(A1, "fr", "en")</code><br>

Either the source or target language must be English "<code>en</code>", and the other language may be any one of the following: 

Afrikaans "<code>af</code>", Arabic "<code>ar</code>", Czech "<code>cs</code>", Danish "<code>da</code>", Dutch "<code>nl</code>", Finnish "<code>fi</code>", French "<code>fr</code>", German "<code>de</code>", Hindi "<code>hi</code>", Hungarian "<code>hu</code>", Indonesian "<code>id</code>", Italian "<code>it</code>", Japanese "<code>jap</code>", Russian "<code>ru</code>", Spanish "<code>es</code>", Swedish "<code>sv</code>", Ukrainian "<code>uk</code>", Vietnamese "<code>vi</code>", Xhosa "<code>xh</code>", Chinese "<code>zh</code>"


## Applications

Use for simple or less critical tasks that do not require a powerful AI model.

## Attribution

This add-in would not be possible without the following great open-source software projects:

- [WebLLM](https://github.com/mlc-ai/web-llm), see [license](https://github.com/mlc-ai/web-llm/blob/main/LICENSE)
- [Transformers.js](https://github.com/xenova/transformers.js), see [license](https://github.com/xenova/transformers.js/blob/main/LICENSE)
- [Gemma](https://github.com/google-deepmind/gemma), see [license] (https://github.com/google-deepmind/gemma/blob/main/LICENSE)

## Installation

Install from the Microsoft AppSource store at the link below, or directly from Excel.

<a href="https://appsource.microsoft.com/en-us/product/office/WA200007427?tab=Overview">
    <img 
        src="/images/MS_AppSource.png" 
        alt="AppSource"
        style="padding-top: 10px; width: 200px;"
    />
</a>