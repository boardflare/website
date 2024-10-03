---
title: Translate for Excel
---

# Translate for Excel

Unlimited free translation for 20 languages to and from English.

## Overview

Provides a TRANSLATE function like <a href="http://www.boardflare.com/blog/2024/googletranslate-excel">GOOGLETRANSLATE for Excel</a>.  It translates 20 languages to or from English using machine learning models running on your CPU.  Your data never leaves Excel, and you have unlimited free use.

## Features

🌐 Translates 20 languages to or from English.<br>
🆓 Unlimited free use<br>
💻 Processed locally on your computer.<br>
🔒 No data is shared outside Excel.<br>
💽 Uses ~500MB of RAM, ~100MB of browser cache

## Function

=<code>BOARDFLARE.TRANSLATE (text, source_lang, target_lang)</code><br>
<code>text:</code> Must be less than 1000 characters.<br>
<code>source_lang:</code> Text language, e.g. "fr" for French.<br>
<code>target_lang:</code> Translation language, e.g. "en" for English.<br>
E.g., to translate cell A1 from French to English:<br>
<code>=BOARDFLARE.TRANSLATE(A1, "fr", "en")</code><br>

## Languages

Either the source or target language must be English "<code>en</code>", and the other language may be any one of the following: 

Afrikaans "<code>af</code>", Arabic "<code>ar</code>", Czech "<code>cs</code>", Danish "<code>da</code>", Dutch "<code>nl</code>", Finnish "<code>fi</code>", French "<code>fr</code>", German "<code>de</code>", Hindi "<code>hi</code>", Hungarian "<code>hu</code>", Indonesian "<code>id</code>", Italian "<code>it</code>", Japanese "<code>jap</code>", Russian "<code>ru</code>", Spanish "<code>es</code>", Swedish "<code>sv</code>", Ukrainian "<code>uk</code>", Vietnamese "<code>vi</code>", Xhosa "<code>xh</code>", Chinese "<code>zh</code>"

## Applications

Use it for any translation task in Excel. For example, translate multiple Excel cells with product descriptions, customer reviews, or any other relatively short text cells.

- Shipping manifests:  Translate product descriptions in shipping manifests to your local language. 
- Catalogs:  Translate vendor catalogs to your local language.
- Customer reviews:  Translate customer reviews to your local language.
- E-commerce:  Localize product descriptions for your e-commerce site.

## Alternatives

Microsoft has announced a new native [TRANSLATE](https://techcommunity.microsoft.com/t5/microsoft-365-insider-blog/new-translation-functions-in-excel-translate-and-detectlanguage/ba-p/4231456) function with similar functionality but broader language coverage.  It is currently available to Beta Channel users on Windows and Mac.  It is unclear of this will offer unlimited free use once it reaches GA.

## Installation

Install from the Microsoft AppSource store at the link below, or directly from Excel.

<a href="https://appsource.microsoft.com/en-us/product/office/WA200007046?tab=Overview">
    <img 
        src="/images/MS_AppSource.png" 
        alt="AppSource"
        style="padding-top: 10px; width: 200px;"
    />
</a>