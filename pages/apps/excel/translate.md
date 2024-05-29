---
title: Translate for Excel
---

# Translate for Excel

Like GOOGLETRANSLATE for Excel. Translates text to English for free, on your CPU, albeit slowly.

## Overview

Provides a TRANSLATE function for Excel similar to GOOGLETRANSLATE.  It translates text using a machine learning model running in Excel on your CPU so your data never leaves your spreadsheet, and you have unlimited free use.  The catch is that it is very slow, so it needs to be run while you do other things, possibly overnight if you have a lot of text.  Currently it is limited to translating a few languages to English, but the plan is to make it equivalent to the Google Translate (GOOGLETRANSLATE) function, but for Excel.

<h3>FEATURES</h3>

<ul>
    <li>🌐Translate text in several languages to English.</li>
    <li>🆓Unlimited free use.</li>
    <li>💻Runs locally on your computer.</li>
    <li>🔒No data is shared outside Excel.</li>
    <li>✅Relatively high accuracy.</li>
    <li>🐌Very slow, only ~1 word/sec, so run it in the background.</li>
</ul>

<h3>FUNCTION</h3>

<b>=BOARDFLARE.TRANSLATE</b>(input_text, input_lang)
<ul>
    <li>➡️input_text: text you want to translate</li>
    <li>➡️input_lang: language code of the input_text, see below for languages</li>
    <li>⬅️returns: translated text in English</li>
</ul>
For example, to translate a cell A1 from Spanish to English: =BOARDFLARE.TRANSLATE(A1, "es")

See <a href="https://www.boardflare.com/apps/excel/translate">Translate for Excel</a> on our website for more information.

<h3>LANGUAGES</h3>
Currently supports translating from the following languages to English only:
<ul>
    <li>Spanish (es)</li>
    <li>German (de)</li>
    <li>French (fr)</li>
</ul>
More languages are coming soon.

<h3>APPLICATIONS</h3>
You can translate multiple Excel cells with product descriptions, customer reviews, or any other text data in the spreadsheet.  It is like having <a href="http://www.boardflare.com/blog/2024/googletranslate-excel">GOOGLETRANSLATE for Excel</a>.

<h3>LIMITATIONS</h3>
<ul>
    <li>Only supports translating a few languages to English.</li>
    <li>Very slow, as in painfully slow, don't say we didn't warn you.</li>
</ul>

## Usage

The function is used as follows.  Since it only translates to English, only the input text and input language are required.  The input language is a two-letter language code, such as "es" for Spanish.  The function is used as follows

```excel
=BOARDFLARE.TRANSLATE(input_text, input_lang)
```

For example, to translate a cell A1 from Spanish to English:
```excel
=BOARDFLARE.TRANSLATE(A1, "es")
```

## Installation

Install from the Microsoft AppSource store at the link below, or directly from Excel.

<a href="https://appsource.microsoft.com/en-us/product/office/WA200006970?tab=Overview">
    <img 
        src="/images/MS_AppSource.png" 
        alt="AppSource"
        style="padding-top: 10px; width: 200px;"
    />
</a>
