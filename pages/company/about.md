---
title: About
---

# About

## What we do

Our focus is on providing tools for spreadsheet power users to solve their business problems with AI. Spreadsheets have always been used to solve a long-tail of niche use-cases that are impractical to address with traditional ISV and SI solutions. We see this continuing in the AI era, and are building the tools to help make it possible.

## AI as a function

Chat-based AI tools (e.g., ChatGPT, Copilot, etc.) are great for ad-hoc data analysis use-cases such as uploading a CSV of data and asking the model questions about it. However, we see AI solutions in spreadsheets generally solving a different problem. It is more about repeatedly performing a task on some subset of the data (e.g., a row), and then returning a result that can become an input to another formula. In other words, AI as a function, e.g. `f(x) = CLASSIFY(x)`. For example, a user might want to classify a row of data, then use that classification to look up a value in a table, then use that value to make a calculation, etc. Trying to do this row-by-row with ChatGPT, while theoretically possible with a code interpreter and function calling, is cumbersome.

## Target market

There are likely over a [billion Excel users](https://scottmax.com/excel-statistics/#Excel_User_Statistics), making it arguably the [world's most popular programming language](https://www.microsoft.com/en-us/research/blog/innovation-by-and-beyond-the-numbers-a-history-of-research-collaborations-in-excel/). Of these, we estimate 150 million are corporate Excel users, out of a total of roughly 320 million corporate paid Office users, based on [400 million paid total users](https://office365itpros.com/2024/01/31/office-365-reaches-400-million/) - [80 million paid consumer users](https://www.microsoft.com/en-us/Investor/earnings/FY-2024-Q4/press-release-webcast). Research shows that roughly [a third](https://www.acuitytraining.co.uk/news-tips/new-excel-facts-statistics-2022/) of corporate Excel users are capable of writing formulas with functions (e.g., IF, VLOOKUP, etc.).  So that gives us a corporate power-user market of ~50 million.

We need to further refine the market to users that are familiar enough with AI tools (e.g. ChatGPT) such that they can envisage how to build an AI solution in a spreadsheet, if they had the right tools.  We estimate this AI-savvy segment is 2% of corporate Excel power users, or 1 million. This is our initial target market.

## Key enablers

These are some of the key enabling technologies that we see for using AI in spreadsheets.

### AI models
- **Time-series models**: These models that can reason over patterns in numerical data, making them useful for [time-series forecasting](https://arxiv.org/pdf/2403.14735).  This brings AI capabilities closer to the core use-cases of spreadsheets.  Some example models include [Salesforce Morai](https://blog.salesforceairesearch.com/moirai/), [Amazon Chronos](https://www.amazon.science/blog/adapting-language-model-architectures-for-time-series-forecasting), [Google TimesFM](https://research.google/blog/a-decoder-only-foundation-model-for-time-series-forecasting/), etc.
- **Fine-tuning models**: Historically fine-tuning of models was expensive, and something only done by professional data scientists for high-value use-cases.  The introduction of LoRA (Low-Rank Adaptation) enables models to be practically fine-tuned and inferenced for even niche use cases. [Google Gemini](https://ai.google.dev/gemini-api/docs/model-tuning) is now offering this at no extra cost.
- **Context-caching**: There are models such as [DeepSeek](https://platform.deepseek.com/api-docs/news/news0802/) and [Gemini](https://ai.google.dev/gemini-api/docs/caching?lang=python) that can save the input context to cache, and re-use it again at a fraction of the cost (e.g., 10-20%).  This enables repeated use of the same dataset in context without incurring the full cost (or time) to process that data again.

### Spreadsheets
- [**Lambda Functions**](https://techcommunity.microsoft.com/t5/excel-blog/announcing-lambda-turn-excel-formulas-into-custom-functions/ba-p/1925546) enable Excel to in theory do anything other programming languages can do.  Together with named functions, they enable power users to build functions which conceal complexity and can be used easily by less capable users.
- [**Python in Excel**](https://techcommunity.microsoft.com/t5/excel-blog/announcing-python-in-excel-combining-the-power-of-python-and-the/ba-p/3893439) is rolling out, and Anaconda has released a similar capability with [Anacode Code](https://docs.anaconda.com/excel/code/) which runs Python locally in the browser.  Both of these tools give Excel functionality similar to a Jupyter notebook.
- [**Copilot in Excel**](https://support.microsoft.com/en-us/office/get-started-with-copilot-in-excel-d7110502-0334-4b4f-a175-a73abdfc118a), and LLMs in general (e.g., ChatGPT) enable power users to write far more complex Excel code, and also write Python code without really knowing Python. This greatly expands the complexity of what can be practically built in Excel.
- **No-cost AI in Excel.** Excel add-ins are just web apps (even for desktop Excel), so they can take advantage of the rapidly evolving WebML stack which consists of high-level inferencing libraries such as [Transformers.js](https://github.com/xenova/transformers.js), small language models like [Phi-3](https://huggingface.co/microsoft/Phi-3-mini-4k-instruct), web runtimes such as [ONNX](https://onnxruntime.ai/docs/tutorials/web/) which use new [WebGPU](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API) capabilities in the browser, which in turn run on the new NPU hardware shipping with most new PCs. Since everything is running locally, there are no AI inferencing costs, and this will further encourage the use of AI in Excel.

## Who we are

Boardflare was started in 2024 by [Brent Bolleman](https://www.linkedin.com/in/bolleman/) and operates out of Whistler, Canada.  We would love to hear from you [by email](mailto:support@boardflare.com), or if you happen to be in Whistler, please let us know!

![Whistler Mountain](/images/whistler-mtn.jpg)