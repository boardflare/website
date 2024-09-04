---
title: FreeGPT for Excel
---

# FreeGPT for Excel

Unlimited free AI running locally in Excel.

## Overview

Provides unlimited free and secure AI by using smaller models that can run locally on your computer.  The catch?  These models are slower and less powerful than ChatGPT, and are best suited for simple or less critical tasks.  However, GPUs are becoming more powerful, and small models are getting smarter, so speed and quality should both continue to improve.  We're starting with a handful of functions and will add more over time.

## Features

🆓 Unlimited free use<br>
💻 Processed locally on your computer.<br>
🔒 No data is shared outside Excel.<br>

## Functions

### Translate

=<code>FREEGPT.TRANSLATE (text, source_lang, target_lang, [model])</code><br>
<code>text:</code> Must be less than 1000 characters.<br>
<code>source_lang:</code> Text language, e.g. "fr" for French.<br>
<code>target_lang:</code> Translation language, e.g. "en" for English.<br>
E.g., to translate cell A1 from French to English:<br>
<code>=FREEGPT.TRANSLATE(A1, "fr", "en")</code><br>

Either the source or target language must be English "<code>en</code>", and the other language may be any one of the following: 

Afrikaans "<code>af</code>", Arabic "<code>ar</code>", Czech "<code>cs</code>", Danish "<code>da</code>", Dutch "<code>nl</code>", Finnish "<code>fi</code>", French "<code>fr</code>", German "<code>de</code>", Hindi "<code>hi</code>", Hungarian "<code>hu</code>", Indonesian "<code>id</code>", Italian "<code>it</code>", Japanese "<code>jap</code>", Russian "<code>ru</code>", Spanish "<code>es</code>", Swedish "<code>sv</code>", Ukrainian "<code>uk</code>", Vietnamese "<code>vi</code>", Xhosa "<code>xh</code>", Chinese "<code>zh</code>"

### Summarize

=<code>FREEGPT.SUMMARIZE (text)</code><br>
<code>text:</code> Text to summarize.<br>
E.g., to summarize the content of cell A1:<br>
<code>=FREEGPT.SUMMARIZE(A1)</code><br>

### Classify

=<code>FREEGPT.CLASSIFY (text, categories)</code><br>
<code>text:</code> Text to classify.<br>
<code>categories:</code> Range of categories.<br>
E.g., to classify the content of cell A1 into categories listed in cells B1 to B5:<br>
<code>=FREEGPT.CLASSIFY(A1, B1:B5)</code><br>

## Applications

Use for simple or less critical tasks that do not require a powerful AI model.

## Installation

Install from the Microsoft AppSource store at the link below, or directly from Excel.

<a href="https://appsource.microsoft.com/en-us/product/office/WA200007046?tab=Overview">
    <img 
        src="/images/MS_AppSource.png" 
        alt="AppSource"
        style="padding-top: 10px; width: 200px;"
    />
</a>