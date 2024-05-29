---
title: Translate for Excel
---

# Translate for Excel

Translates text from several languages to English with high accuracy, for free, using your CPU, albeit very slowly.

## Overview

Provides a function which translates text using a machine learning model running locally in Excel on your CPU so your data never leaves your spreadsheet, and you have unlimited free use.  The catch is that it is very slow, so it needs to be run while you do other things, possibly overnight if you have a lot of text.  It is similar to the Google Translate (GOOGLETRANSLATE) function in Google Sheets. 

<h3>FEATURES</h3>

<ul>
    <li>🌐Translate text in (fr, de, es) to English.</li>
    <li>🆓Unlimited free use.</li>
    <li>💻Runs locally on your computer.</li>
    <li>🔒No data is shared outside Excel.</li>
    <li>✅Relatively high accuracy.</li>
    <li>🐌Very slow, only ~1 word/sec, so run it in the background.</li>
</ul>

<h3>CUSTOM FUNCTION</h3>

<b>=BOARDFLARE.TRANSLATE</b>(input_text, input_lang)
<ul>
    <li>➡️input_text: text you want to translate</li>
    <li>➡️input_lang: language code of the input_text (es,fr,de)</li>
    <li>⬅️returns: translated text in English</li>
</ul>
For example, to translate a cell A1 from Spanish to English: =BOARDFLARE.TRANSLATE(A1, "es")

See <a href="https://www.boardflare.com/apps/excel/translate">Translate for Excel</a> on our website for more information.

<h3>APPLICATIONS</h3>
You can translate multiple Excel cells with product descriptions, customer reviews, or any other text data in the spreadsheet.

<h3>LIMITATIONS</h3>
Only supports translating a few languages to English only and is very slow.  More languages are coming soon.

## Function

### =BOARDFLARE.TRANSLATE

<table>
    <tr>
        <th>Arguments</th>
        <th>Description</th>
    </tr>
    <tr>
        <td><b>input_text</b></td>
        <td>text to translate</td>
    </tr>
    <tr>
        <td><b>input_lang</b></td>
        <td>language code of the input_text, see table below for codes</td>
    </tr>
    <!-- <tr>
        <td><b>output_lang</b></td>
        <td>language code for translation</td>
    </tr> -->
</table>
<table>
    <tr>
        <th>Language</th>
        <th>Code</th>
    </tr>
    <tr>
        <td>Spanish</td>
        <td>es</td>
    </tr>
    <tr>
        <td>German</td>
        <td>de</td>
    </tr>
    <tr>
        <td>French</td>
        <td>fr</td>
    </tr>
</table>

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
