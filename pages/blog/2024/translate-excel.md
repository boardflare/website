---
title: Excel TRANSLATE Function
date: 2024-06-27
---

# Excel TRANSLATE Function
June 27, 2024

## Overview

Microsoft announced a new Excel [TRANSLATE function](https://techcommunity.microsoft.com/t5/microsoft-365-insider-blog/new-translation-functions-in-excel-translate-and-detectlanguage/ba-p/4231456) that allows users to translate text directly within their spreadsheets. This function is similar to the [GOOGLETRANSLATE](https://support.google.com/docs/answer/3093331?hl=en) function in Google Sheets and provides a convenient way to work with multilingual data in Excel. In this article, we'll explore the syntax and usage of the TRANSLATE function in Excel.

It is currently available to Beta Channel users on Windows and Mac. It is unclear if this will offer unlimited free use once it reaches GA.

## Functions

### TRANSLATE

The [TRANSLATE() function](https://support.microsoft.com/en-us/office/translate-function-d34f71c7-2ffe-409a-9a63-5eb5e91aa3dd) translates text from one language to another using Microsoft Translation Services.

`=TRANSLATE(text, [source_language], [target_language])`

The function has the following arguments:

- **text**: The text to translate, either in quotation marks or as a cell reference.
- **source_language** (optional): The language code of the source language (e.g., "en" for English, "es" for Spanish). If not specified, the language is auto-detected. Specifying the language is recommended for shorter texts.
- **target_language** (optional): The language code of the target language (e.g., "en" for English, "es" for Spanish). If not specified, the system language is used.

Supported languages and their codes can be found in [Supported Languages and Language Codes](https://learn.microsoft.com/en-us/azure/ai-services/Translator/language-support).

For example, to translate the text "Hello, World!" in cell A1 to Spanish, use:

`=TRANSLATE(A1, "en", "es")`

Here, the source language is English ("en") and the target language is Spanish ("es"). The translated text "Hola mundo!" will appear in the cell with the formula.

### DETECTLANGUAGE

The [DETECTLANGUAGE()](https://support.microsoft.com/en-us/office/detectlanguage-function-0748e285-1912-4d24-b735-57d18142fa3b) function is used to identify the language in a specified text or range. 

The syntax for the DETECTLANGUAGE() function is as follows:

`=DETECTLANGUAGE(text)`

The function has the following arguments:

- **text** - The text or reference to cells containing text.

[Supported Languages](https://learn.microsoft.com/en-us/azure/ai-services/Translator/language-support).

For example, if you have the following text in cell A1: "Hola mundo!" and you want to find out what the language of the text is. You can use the DETECTLANGUAGE() function as follows:

`=DETECTLANGUAGE(A1)`

This will return the detected language for the text in cell A1. The language code "es" for Spanish will be displayed in the cell where you entered the formula.

## Alternatives

The TRANSLATE function is similar to the [GOOGLETRANSLATE function](http://www.boardflare.com/blog/2024/googletranslate-excel) in Google Sheets and the [Translate for Excel](http://www.boardflare.com/apps/excel/translate) function provided by BoardFlare. 

The main advantages of Boardflare's [Translate for Excel](http://www.boardflare.com/apps/excel/translate) are as follows:
- no throttling or quotas on usage.
- your data stays in Excel and is not shared.