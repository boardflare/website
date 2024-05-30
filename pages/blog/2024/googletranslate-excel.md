---
title: GOOGLETRANSLATE for Excel
date: 2024-05-29
---

# GOOGLETRANSLATE for Excel
May 29, 2024

In today's globalized world, the need for quick and accurate translation is more important than ever. This is especially true in the realm of data analysis, where understanding information across languages can provide key insights. Many Excel users have long been looking for a GOOGLETRANSLATE-like function to facilitate this process. 

We're excited to introduce Translate for Excel, a solution that brings the power of translation directly into your spreadsheet. 

## What is Translate for Excel?

Translate for Excel is a function similar to GOOGLETRANSLATE, but designed specifically for Excel. It uses a machine learning model to translate text directly within your spreadsheet. This means your data never leaves your document, ensuring privacy and security. It is also free because it runs on your CPU, so there are no usage limits or fees.

## Key Features

Translate for Excel offers several key features:

- **Translation of several languages to English**: Currently, the function supports translation from Spanish, German, and French to English. We plan to expand this list in the future.
- **Unlimited free use**: There are no usage limits or fees.
- **Local operation**: The function runs on your computer, so your data stays secure.
- **High accuracy**: The function provides relatively high accuracy in translation.
- **Background operation**: The function is slow (translating approximately one word per second), so it's designed to run in the background while you work on other tasks.

## How to Use Translate for Excel

Using Translate for Excel is simple. The function requires only the text you want to translate and the language code of the input text. Here's how you can use it:

```excel
=BOARDFLARE.TRANSLATE(input_text, input_lang)
```

For example, to translate a cell A1 from Spanish to English, you would use:

```excel
=BOARDFLARE.TRANSLATE(A1, "es")
```

## Installation

You can install Translate for Excel from the Microsoft AppSource store or directly from Excel. 

## Conclusion

Translate for Excel fills a significant gap in Excel's functionality, providing a powerful translation tool directly within your spreadsheet. While it's not as fast as GOOGLETRANSLATE, it offers the advantage of privacy, security, and unlimited free use. We're excited to see how this function will empower Excel users to work more effectively with multilingual data.