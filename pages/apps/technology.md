---
title: Technology
---

# Technology

> Think globally, process locally...

A core part of our products is the ability to do processing locally that in many cases normally happens on a server.  This reduces costs, improves privacy, and in some cases offers better performance as well.  Some of the technologies that make this possible are as follows:

## Pyodide

[Pyodide](https://pyodide.org/en/stable/index.html) is a Python runtime which is based on [WebAssembly](https://webassembly.org/) and thus capable of running locally in the browser.

## WebGPU

[WebGPU](https://gpuweb.github.io/gpuweb/) provides a low-level, high-performance interface between web applications and the GPU and is supported by major browsers.  Even on computers with mediocre integrated GPUs, it provides sufficient performance to run smaller LLMs.

## Smaller LLMs

There have been many new language models in the 2-3 B parameter size scale that when quantized are small enough (e.g. 2-3 GB of RAM) to practically run in the browser without a discrete GPU. These models are obviously not as powerful as the larger models, but they are becoming good enough to handle many basic tasks.  They are also rapidly improving in quality.

### WebAI Libaries

Inferencing a language model in the browser is not a trivial task.  There are a number of libraries that have been developed to make this easier.  Some of the key ones are:

- [Transformers.js](https://huggingface.co/docs/transformers.js/index) is a library that enables machine learning models on Hugging Face of various architectures to run in the browser.  It uses 
- [ONNX runtime](https://github.com/microsoft/onnxruntime) is a library that enables models in ONNX format to run in the browser.  It is a bit more general than Transformers.js, but also a bit more complex to use.
- [WebLLM](https://github.com/mlc-ai/web-llm) is a library that enables models in the MLC format to run in the browser.  It is focused on text completion models only, whereas Transformers.js works with other model types.
- [Tensorflow.js](https://www.tensorflow.org/js) is a library from Google that enables models in the Tensorflow format to run in the browser.  It is similar to the ONNX runtime, but focused on the Tensorflow ecosystem.
- [MediaPipe](https://ai.google.dev/edge/mediapipe/solutions/guide) is a library from Google that has task-specific pipelines similar to Transformers.js and can use Tensorflow.js under the hood.


