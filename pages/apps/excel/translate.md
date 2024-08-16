---
title: Translate for Excel
---

# Translate for Excel

Unlimited free translation for 20 languages to and from English, and between 100 languages using a premium model.

## Overview

Provides a TRANSLATE function like <a href="http://www.boardflare.com/blog/2024/googletranslate-excel">GOOGLETRANSLATE for Excel</a>.  It translates 20 languages to or from English using machine learning models running on your CPU.  Your data never leaves Excel, and you have unlimited free use.  An optional premium model is available via API that supports translation between any of 100 languages, and is faster and more accurate.

## Features

FREE LOCAL MODEL

🌐 Translates 20 languages to or from English.<br>
🆓 Unlimited free use<br>
💻 Processed locally on your computer.<br>
🔒 No data is shared outside Excel.<br>
💽 Uses ~500MB of RAM, ~100MB of browser cache

PREMIUM API MODEL

🌐 Translates between any of 100 languages.<br>
💲 [Subscription](/apps/pricing) costs ~US$1 per million characters.<br>
🚀 Faster and more accurate (due to larger model size).<br>
☁️ Runs in cloud, however none of your data is logged.<br>

## Function

=<code>BOARDFLARE.TRANSLATE (text, source_lang, target_lang, [model])</code><br>
<code>text:</code> Must be less than 1000 characters.<br>
<code>source_lang:</code> Text language, e.g. "fr" for French.<br>
<code>target_lang:</code> Translation language, e.g. "en" for English.<br>
<code>model:</code> Optional, see premium model below.<br><br>
E.g., to translate cell A1 from French to English:<br>
<code>=BOARDFLARE.TRANSLATE(A1, "fr", "en")</code><br>

## Languages

<b>FREE MODEL:</b> Either the source or target language must be English "<code>en</code>", and the other language may be any one of the following: 

Afrikaans "<code>af</code>", Arabic "<code>ar</code>", Czech "<code>cs</code>", Danish "<code>da</code>", Dutch "<code>nl</code>", Finnish "<code>fi</code>", French "<code>fr</code>", German "<code>de</code>", Hindi "<code>hi</code>", Hungarian "<code>hu</code>", Indonesian "<code>id</code>", Italian "<code>it</code>", Japanese "<code>jap</code>", Russian "<code>ru</code>", Spanish "<code>es</code>", Swedish "<code>sv</code>", Ukrainian "<code>uk</code>", Vietnamese "<code>vi</code>", Xhosa "<code>xh</code>", Chinese "<code>zh</code>"

<b>PREMIUM MODEL:</b> Open premium section in add-in task pane and sign in with a Microsoft work/school account to try for free. Sorry, personal accounts are not supported by the AppSource subscription platform. See <a href="https://www.boardflare.com/apps/pricing" target="_blank" rel="noopener">pricing</a> for details. Once signed-in, all translation will be done using the premium model by default, but you may opt to use the free model by setting model = "free" and it will not use credits. Supported languages:

Afrikaans "<code>af</code>", Amharic "<code>am</code>", Arabic "<code>ar</code>", Asturian "<code>ast</code>", Azerbaijani "<code>az</code>", Bashkir "<code>ba</code>", Belarusian "<code>be</code>", Bulgarian "<code>bg</code>", Bengali "<code>bn</code>", Breton "<code>br</code>", Bosnian "<code>bs</code>", Catalan; Valencian "<code>ca</code>", Cebuano "<code>ceb</code>", Czech "<code>cs</code>", Welsh "<code>cy</code>", Danish "<code>da</code>", German "<code>de</code>", Greeek "<code>el</code>", English "<code>en</code>", Spanish "<code>es</code>", Estonian "<code>et</code>", Persian "<code>fa</code>", Fulah "<code>ff</code>", Finnish "<code>fi</code>", French "<code>fr</code>", Western Frisian "<code>fy</code>", Irish "<code>ga</code>", Gaelic; Scottish Gaelic "<code>gd</code>", Galician "<code>gl</code>", Gujarati "<code>gu</code>", Hausa "<code>ha</code>", Hebrew "<code>he</code>", Hindi "<code>hi</code>", Croatian "<code>hr</code>", Haitian; Haitian Creole "<code>ht</code>", Hungarian "<code>hu</code>", Armenian "<code>hy</code>", Indonesian "<code>id</code>", Igbo "<code>ig</code>", Iloko "<code>ilo</code>", Icelandic "<code>is</code>", Italian "<code>it</code>", Japanese "<code>ja</code>", Javanese "<code>jv</code>", Georgian "<code>ka</code>", Kazakh "<code>kk</code>", Central Khmer "<code>km</code>", Kannada "<code>kn</code>", Korean "<code>ko</code>", Luxembourgish; Letzeburgesch "<code>lb</code>", Ganda "<code>lg</code>", Lingala "<code>ln</code>", Lao "<code>lo</code>", Lithuanian "<code>lt</code>", Latvian "<code>lv</code>", Malagasy "<code>mg</code>", Macedonian "<code>mk</code>", Malayalam "<code>ml</code>", Mongolian "<code>mn</code>", Marathi "<code>mr</code>", Malay "<code>ms</code>", Burmese "<code>my</code>", Nepali "<code>ne</code>", Dutch; Flemish "<code>nl</code>", Norwegian "<code>no</code>", Northern Sotho "<code>ns</code>", Occitan (post 1500) "<code>oc</code>", Oriya "<code>or</code>", Panjabi; Punjabi "<code>pa</code>", Polish "<code>pl</code>", Pushto; Pashto "<code>ps</code>", Portuguese "<code>pt</code>", Romanian; Moldavian; Moldovan "<code>ro</code>", Russian "<code>ru</code>", Sindhi "<code>sd</code>", Sinhala; Sinhalese "<code>si</code>", Slovak "<code>sk</code>", Slovenian "<code>sl</code>", Somali "<code>so</code>", Albanian "<code>sq</code>", Serbian "<code>sr</code>", Swati "<code>ss</code>", Sundanese "<code>su</code>", Swedish "<code>sv</code>", Swahili "<code>sw</code>", Tamil "<code>ta</code>", Thai "<code>th</code>", Tagalog "<code>tl</code>", Tswana "<code>tn</code>", Turkish "<code>tr</code>", Ukrainian "<code>uk</code>", Urdu "<code>ur</code>", Uzbek "<code>uz</code>", Vietnamese "<code>vi</code>", Wolof "<code>wo</code>", Xhosa "<code>xh</code>", Yiddish "<code>yi</code>", Yoruba "<code>yo</code>", Chinese "<code>zh</code>", Zulu "<code>zu</code>"

## Applications

Use it for any translation task in Excel. For example, translate multiple Excel cells with product descriptions, customer reviews, or any other relatively short text cells.

- Shipping manifests:  Translate product descriptions in shipping manifests to your local language. 
- Catalogs:  Translate vendor catalogs to your local language.
- Customer reviews:  Translate customer reviews to your local language.
- E-commerce:  Localize product descriptions for your e-commerce site.

## Installation

Install from the Microsoft AppSource store at the link below, or directly from Excel.

<a href="https://appsource.microsoft.com/en-us/product/office/WA200007046?tab=Overview">
    <img 
        src="/images/MS_AppSource.png" 
        alt="AppSource"
        style="padding-top: 10px; width: 200px;"
    />
</a>