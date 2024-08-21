---
title: About
---

# About

Boardflare is a side project I started in 2024 as a way to learn how AI worked, or didn't work, as was often the case.  While I hadn't written much code since my engineering degree ages ago, I discovered that programming is easier with an LLM tutor, better tools, etc.  I also discovered that there is a huge difference between writing barely functional code and good code, that LLMs currently tend to write the former, and it takes a lot of time and experience to write the latter. I am repenting many things I used to say as a software CEO about why it took so long to get from a proof of concept to a production-ready product.

In many ways I am the target user for Boardflare's tools, which I guess makes sense since people tend to try to solve their own problems.  I have an analytical background (in my case engineering and finance), but no formal data science training.  My ad-hoc calculation tool of choice is a spreadsheet, whereas a data scientist would likely opt for a Jupyter notebook.

There are over a billion Excel users by [some accounts](https://scottmax.com/excel-statistics/#Excel_User_Statistics), and you could argue it is the [world's most popular programming language](https://www.microsoft.com/en-us/research/blog/innovation-by-and-beyond-the-numbers-a-history-of-research-collaborations-in-excel/), especially since Google Sheets' syntax is virtually identical, and that is likely another billion users.  Let's say 1% of the billion Excel users are analytically competent enough to write complex Excel formulas, so we have ~10 million power users.

The [Bureau of Labor Statistics](https://www.bls.gov/ooh/math/data-scientists.htm#tab-6) estimates that in 2022 there were 168,900 data scientist jobs in the US. Let's round that up to say ~1 million data scientists worldwide, so there are 10x more Excel power users than data scientists.  Maybe the actual number is 5x or 50x, but the idea is that if those Excel power users could become DIY data scientists, that would be a big deal.

Now along come some key enablers, as follows:
- [Python in Excel](https://techcommunity.microsoft.com/t5/excel-blog/announcing-python-in-excel-combining-the-power-of-python-and-the/ba-p/3893439#:~:text=(6%2F10%2F24),Version%202406%20(Build%2017726.20016)), which has been in beta since the fall 2023, is rolling out.  This initial version uses an Azure cloud runtime, but Anaconda have also released [Anacode Code](https://docs.anaconda.com/excel/code/) for Excel which runs locally. In theory, this enables Excel to become the Jupyter notebook for everyone else.
- [Copilot in Excel](https://support.microsoft.com/en-us/office/get-started-with-copilot-in-excel-d7110502-0334-4b4f-a175-a73abdfc118a), and LLMs in general (e.g. ChatGPT) enable non-programmers to quickly learn how to [write Python code in Excel](https://techcommunity.microsoft.com/t5/excel-blog/introducing-copilot-support-for-python-in-excel-advanced-data/ba-p/3928120).
- Virtually free local AI inferencing in Excel is being made possible by a technology stack made up of the following: high-level inferencing libraries such as [Transformers.js](https://github.com/xenova/transformers.js), new small language models like [Phi-3](https://huggingface.co/microsoft/Phi-3-mini-4k-instruct), powered by runtimes such as [ONNX web](https://onnxruntime.ai/docs/tutorials/web/) which use the new [WebGPU](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API) capabilities in the browser, which in turn run on rapidly advancing GPU/NPU hardware.  This low/no cost inferencing will further encourage experimentation and use.

But let's not get carried away.  The initial implementation of Python in Excel has limitations and is no Jupyter notebook for the time being.  Similarly, even GPT-4o, arguably the best coding model the time of writing, often writes shit code, so you need some knowledge of Python and a lot of patience to generate anything useful.  Local inferencing in Excel is also painfully slow on my mediocre laptop for all but the smallest models.

But these things are changing rapidly, and gradually many of those ~10 million spreadsheet power users will become DIY data scientists, representing a massive increase in the number of people who can build AI tools.  These people will not have the proficiency of a real data scientist, but they will understand their problems very well, and enable AI to reach a much longer tail of niche use-cases.  These are the users Boardflare is focused on enabling.

My name is Brent Bolleman. I'm based in Whistler, Canada and would love to [hear from you](mailto:support@boardflare.com). 

![Whistler Mountain](/images/whistler-mtn.jpg)