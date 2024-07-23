---
title: Translate for Excel
---

# Translate for Excel

Unlimited free translation for 20 languages, locally in Excel.

## Overview

Provides a TRANSLATE function like <a href="http://www.boardflare.com/blog/2024/googletranslate-excel">GOOGLETRANSLATE for Excel</a>.  It translates 20 languages to or from English using machine learning models running on your CPU.  Your data never leaves Excel, and you have unlimited free use.  Now in preview, you also have an option to use a larger model via API that supports translation between any of 100 languages, and is faster and more accurate.  It is also free while in preview, but with a limit of 500,000 characters total usage.  Our plan is offer this larger model locally also, but we're not quite there yet, so this is an interim solution to help users that need broader language support.  We will be offering an inexpensive subscription soon to provide additional credits while we work out how to make this work locally.

<h3>FEATURES</h3>

LOCAL MODEL

🌐 Translates 20 languages to or from English.<br>
🆓 Unlimited free use<br>
💻 Processed locally on your computer.<br>
🔒 No data is shared outside Excel.<br>

API MODEL (PREVIEW)

🌐 Translates between any of 100 languages.<br>
🆓 Free while in preview, with a limit of 500,000 characters total usage.<br>
🚀 Faster and more accurate (due to larger model size).<br>
☁️ Runs in cloud, however none of your data is logged.<br>

<h3>FUNCTION</h3>

=<code>BOARDFLARE.TRANSLATE (text, source_language, target_language, [model])</code><br>
<code>text:</code> The text to translate, must be less than ~ 200 words.<br>
<code>source_language:</code> language code of the text to translate, e.g. "fr" for French.<br>
<code>target_language:</code> language code you want to translate to, e.g. "en" for English.<br>
<code>model:</code> optional, 3 for API model, see below.<br><br>
E.g., to translate French in cell A1 to English: <code>=BOARDFLARE.TRANSLATE(A1, "fr", "en")</code><br><br>
Either source or target language must be "<code>en</code>", and the other language one of the following: Afrikaans "<code>af</code>", Arabic "<code>ar</code>", Czech "<code>cs</code>", Danish "<code>da</code>", Dutch "<code>nl</code>", Finnish "<code>fi</code>", French "<code>fr</code>", German "<code>de</code>", Hindi "<code>hi</code>", Hungarian "<code>hu</code>", Indonesian "<code>id</code>", Italian "<code>it</code>", Japanese "<code>jap</code>", Russian "<code>ru</code>", Spanish "<code>es</code>", Swedish "<code>sv</code>", Ukrainian "<code>uk</code>", Vietnamese "<code>vi</code>", Xhosa "<code>xh</code>", Chinese "<code>zh</code>"

PREVIEW MODEL: If `model=3`, a larger model (currently too large to run locally) is used via API that supports any combination of 100 languages (shown below). Your free credits to use this model are displayed in the lower right corner when you are signed in. 1 credit = 1000 characters of text. Supported language codes:

Afrikaans "<code>af</code>", Amharic "<code>am</code>", Arabic "<code>ar</code>", Asturian "<code>ast</code>", Azerbaijani "<code>az</code>", Bashkir "<code>ba</code>", Belarusian "<code>be</code>", Bulgarian "<code>bg</code>", Bengali "<code>bn</code>", Breton "<code>br</code>", Bosnian "<code>bs</code>", Catalan; Valencian "<code>ca</code>", Cebuano "<code>ceb</code>", Czech "<code>cs</code>", Welsh "<code>cy</code>", Danish "<code>da</code>", German "<code>de</code>", Greeek "<code>el</code>", English "<code>en</code>", Spanish "<code>es</code>", Estonian "<code>et</code>", Persian "<code>fa</code>", Fulah "<code>ff</code>", Finnish "<code>fi</code>", French "<code>fr</code>", Western Frisian "<code>fy</code>", Irish "<code>ga</code>", Gaelic; Scottish Gaelic "<code>gd</code>", Galician "<code>gl</code>", Gujarati "<code>gu</code>", Hausa "<code>ha</code>", Hebrew "<code>he</code>", Hindi "<code>hi</code>", Croatian "<code>hr</code>", Haitian; Haitian Creole "<code>ht</code>", Hungarian "<code>hu</code>", Armenian "<code>hy</code>", Indonesian "<code>id</code>", Igbo "<code>ig</code>", Iloko "<code>ilo</code>", Icelandic "<code>is</code>", Italian "<code>it</code>", Japanese "<code>ja</code>", Javanese "<code>jv</code>", Georgian "<code>ka</code>", Kazakh "<code>kk</code>", Central Khmer "<code>km</code>", Kannada "<code>kn</code>", Korean "<code>ko</code>", Luxembourgish; Letzeburgesch "<code>lb</code>", Ganda "<code>lg</code>", Lingala "<code>ln</code>", Lao "<code>lo</code>", Lithuanian "<code>lt</code>", Latvian "<code>lv</code>", Malagasy "<code>mg</code>", Macedonian "<code>mk</code>", Malayalam "<code>ml</code>", Mongolian "<code>mn</code>", Marathi "<code>mr</code>", Malay "<code>ms</code>", Burmese "<code>my</code>", Nepali "<code>ne</code>", Dutch; Flemish "<code>nl</code>", Norwegian "<code>no</code>", Northern Sotho "<code>ns</code>", Occitan (post 1500) "<code>oc</code>", Oriya "<code>or</code>", Panjabi; Punjabi "<code>pa</code>", Polish "<code>pl</code>", Pushto; Pashto "<code>ps</code>", Portuguese "<code>pt</code>", Romanian; Moldavian; Moldovan "<code>ro</code>", Russian "<code>ru</code>", Sindhi "<code>sd</code>", Sinhala; Sinhalese "<code>si</code>", Slovak "<code>sk</code>", Slovenian "<code>sl</code>", Somali "<code>so</code>", Albanian "<code>sq</code>", Serbian "<code>sr</code>", Swati "<code>ss</code>", Sundanese "<code>su</code>", Swedish "<code>sv</code>", Swahili "<code>sw</code>", Tamil "<code>ta</code>", Thai "<code>th</code>", Tagalog "<code>tl</code>", Tswana "<code>tn</code>", Turkish "<code>tr</code>", Ukrainian "<code>uk</code>", Urdu "<code>ur</code>", Uzbek "<code>uz</code>", Vietnamese "<code>vi</code>", Wolof "<code>wo</code>", Xhosa "<code>xh</code>", Yiddish "<code>yi</code>", Yoruba "<code>yo</code>", Chinese "<code>zh</code>", Zulu "<code>zu</code>"

<h3>APPLICATIONS</h3>

Use it for any translation task in Excel. For example, translate multiple Excel cells with product descriptions, customer reviews, or any other relatively short text cells.

<h3>LIMITATIONS</h3>

LOCAL MODEL<br>
<ul>
    <li>Only translates to and from English.</li>
    <li>Limited to 20 languages.</li>
    <li>Slow, about 5 word/sec.</li>
    <li>Limited to 1000 characters per text cell.</li>
    <li>Models use ~500 MB of RAM, and ~100 MB of disk.</li>
</ul>

API MODEL (PREVIEW)<br>
<ul>
    <li>Limited to 1000 characters per text cell.</li>
    <li>Limit of 500,000 characters total usage while in preview.</li>
    <li>Your data must leave Excel to use API.</li>
</ul>

See <a href="https://www.boardflare.com/apps/excel/translate">Translate for Excel</a> for details.

## Installation

Install from the Microsoft AppSource store at the link below, or directly from Excel.

<a href="https://appsource.microsoft.com/en-us/product/office/WA200006970?tab=Overview">
    <img 
        src="/images/MS_AppSource.png" 
        alt="AppSource"
        style="padding-top: 10px; width: 200px;"
    />
</a>