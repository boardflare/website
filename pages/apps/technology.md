---
title: Technology
---

# Technology

A core part of our technology is the ability to run calculations locally on the users machine to reduce costs, improve privacy, and in some cases performance as well.  This is made possible by the following key technologies.

## Pyodide

[Pyodide](https://pyodide.org/en/stable/index.html) is a Python runtime which is based on [WebAssembly](https://webassembly.org/) and thus capable of running in the browser used by Google Sheets and Excel (including desktop also) to host add-ins.  This enables us to access a broad range of Python libraries, including machine learning libraries like [scikit-learn](https://scikit-learn.org/stable/), [pandas](https://pandas.pydata.org/), and [numpy](https://numpy.org/).  

## Web AI

Web AI is a stack of technologies that enable machine learning models to run in the browser.  Some of the key pieces are as follows.

### Small Language Models

There have been many new language models in the 2-3 B parameter size scale that when quantized are small enough (e.g. 2-3 GB of RAM) to practically run in the browser with slow, but acceptable, inference speeds (e.g. 5-10 tokens/sec).  These models are not as powerful as the larger models, but they are still quite capable and can be used for a wide range of tasks.  They are also rapidly improving in quality, as is the performance of the rest of the technology stack.

### Inference Libaries

Inferencing a language model in the browser is not a trivial task.  There are a number of libraries that have been developed to make this easier.  Some of the key ones are:

- [Transformers.js](https://huggingface.co/docs/transformers.js/index), which is a library that enables machine learning models on Hugging Face to run in a browser.  Since Excel and Sheets extensions are just web apps, it provides a means of running machine learning models without moving the data out of the spreadsheet environment.  The models are cached in the browser, but there is nothing installed on the local operating system.



### WebGPU

The [WebGPU](https://gpuweb.github.io/gpuweb/) API is a new web standard that provides a low-level, high-performance interface between web applications and the GPU.  It is designed to be a successor to WebGL and is supported by all major browsers.  Even on computers with mediocre integrated GPUs, it provides sufficient performance to run small language models.

