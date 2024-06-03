---
title: Translate for Excel
---

# Translate for Excel

Translates 20 languages to and from English.  Like GOOGLETRANSLATE for Excel.

## Overview

Provides a TRANSLATE function for Excel similar to GOOGLETRANSLATE.  It translates 20 languages to or from English using machine learning models running on your CPU.  Your data never leaves Excel, and you have unlimited free use.  The catch is that it is a bit slow (~5 words/sec), and can only handle text cells up to ~200 words.

<h3>FEATURES</h3>

🌐 Translate 20 languages to or from English.<br>
🆓 Unlimited free use.<br>
💻 Processed locally on your computer.<br>
🔒 No data is shared outside Excel.<br>

<h3>FUNCTION</h3>

=<code>BOARDFLARE.TRANSLATE (text, source_language, target_language, [quality])</code><br>
<code>text:</code> The text to translate, must be less than ~ 200 words.<br>
<code>source_language:</code> The language code of the text to translate, e.g. "fr" for French.<br>
<code>target_language:</code> The language code you want to translate to, e.g. "en" for English.<br><br>
E.g., to translate French in cell A1 to English: <code>=BOARDFLARE.TRANSLATE(A1, "fr", "en")</code><br><br>
Either source or target language must be "<code>en</code>", and the other language one of the following: Afrikaans "<code>af</code>", Arabic "<code>ar</code>", Czech "<code>cs</code>", Danish "<code>da</code>", Dutch "<code>nl</code>", Finnish "<code>fi</code>", French "<code>fr</code>", German "<code>de</code>", Hindi "<code>hi</code>", Hungarian "<code>hu</code>", Indonesian "<code>id</code>", Italian "<code>it</code>", Japanese "<code>jap</code>", Russian "<code>ru</code>", Spanish "<code>es</code>", Swedish "<code>sv</code>", Ukrainian "<code>uk</code>", Vietnamese "<code>vi</code>", Xhosa "<code>xh</code>", Chinese "<code>zh</code>"

See <a href="https://www.boardflare.com/apps/excel/translate">Translate for Excel</a> for details.

<h3>APPLICATIONS</h3>

Use it for any translation task in Excel. For example, translate multiple Excel cells with product descriptions, customer reviews, or any other relatively short text cells.

<h3>LIMITATIONS</h3>
<ul>
    <li>Only translates to and from English.</li>
    <li>Limited to 20 languages.</li>
    <li>Slow, about 5 word/sec.</li>
    <li>Limited to about 200 words per text cell.</li>
    <li>Models use ~500 MB of RAM, and ~100 MB of disk.</li>
</ul>
So, so not quite <a href="http://www.boardflare.com/blog/2024/googletranslate-excel">GOOGLETRANSLATE for Excel</a> just yet, but better than nothing, and we'll be closing the capability gap in future versions.

## Installation

Install from the Microsoft AppSource store at the link below, or directly from Excel.

<a href="https://appsource.microsoft.com/en-us/product/office/WA200006970?tab=Overview">
    <img 
        src="/images/MS_AppSource.png" 
        alt="AppSource"
        style="padding-top: 10px; width: 200px;"
    />
</a>
