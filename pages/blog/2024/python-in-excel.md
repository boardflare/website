---
title: Python in Excel
date: 2024-09-16
---

# Python in Excel
September 16, 2024

## Overview

Microsoft's [Python in Excel](https://techcommunity.microsoft.com/t5/excel-blog/python-in-excel-available-now/ba-p/4240212) has now reached GA.  It enables the user to input Python code and it will return the result as either a Python object or Excel values.  You can read in more detail how to use this function in the [official documentation](https://support.microsoft.com/en-us/office/introduction-to-python-in-excel-55643c2e-ff56-4168-b1ce-9428c8308545).

The Python in Excel feature is only available to Microsoft 365 subscribers, and access to the higher performance runtime requires a separate [add-on license](https://www.microsoft.com/en-us/microsoft-365/python-in-excel).

The purpose of this post is to focus on the strengths and potential weaknesses of this implementation and to explore alternatives.

## Strengths

- **Directly reference cells**:  Users can reference cells in Excel directly from Python code using the python `xl` function, e.g. `foo = xl(A1)`.  This makes it super easy to use Excel data in Python code, similar to how you would with Excel formulas.

- **Outputs Python object or Excel values**:  Users can select whether the value returned is a Python object or Excel values.  This is useful for when you want to use the output in further Python code or in Excel formulas.

- **Consistent Python runtime**:  An Anaconda Python runtime running in the Microsoft cloud which provides a consistent version of packages and performance for all users regardless of their local machine. 

- **Microsoft Copilot integration**:  This is currently in beta, but provides a great way for non-programmers to get started with Python code in Excel.

## Potential Weaknesses

We realize all of these weaknesses could be considered strengths, depending on the needs of the target market, and we're sure the Excel product team explicitly chose to do things this way for a reason.  However, in some of the use-cases we're familiar with, these could be considered weaknesses.

- **No custom packages**:  The Python runtime is limited to the packages available in the Anaconda distribution, which is quite comprehensive, but may lack something specific you need.

- **No internet access**:  Your Python does not have access to the internet, so you cannot do things like access OpenAI models, call APIs, etc.  This basically limits you to analyzing the data in your workbook.

- **PY is not an Excel function**:  While `PY` appears to be an Excel function, you can't use it as a function in formula.  For example, if you want to create a LAMBDA that embeds some Python code using PY, e.g. `=LAMBDA(x, PY(x + 2))`, this does not work.

- **Code is stored in workbook**:  The Python code is embedded directly in the xlsx file, which is consistent with the Excel paradigm.  However, this means that any code changes must be copied manually to each workbook containing it rather than being managed centrally with version control.

- **Code does not run locally**:  Since the Python runtime is in the Microsoft cloud, the code cannot run locally, which can create security issues for some, lack of offline capability, and a dependence on Microsoft cloud for performance.

- **Python cells share state**:  The Python cells are executed in the order they appear in the workbook, and they share state, similar to a Jupyter notebook.  This is both a positive and a negative, and can make it difficult to debug and understand the code.

## Alternatives

### PyXLL

[PyXLL](https://www.pyxll.com/index.html) is package for Windows only which enables developers to build traditional Excel add-ins (not modern web-based add-ins) using Python.  The Python runtime is running on Windows so it is able to use virtually all Python libraries, including those that use C and C++ extensions.

### xlwings

[xlwings](https://www.xlwings.org/) comes in two variants.  The client product runs on Windows or Mac and is similar to PyXLL in terms of being able to build traditional Excel add-ins.  The [xlwings Server](https://server.xlwings.org/en/latest/) is used to create modern Excel web add-ins entirely in Python.  This is a very clever strategy that eliminates the intermediate step of building a web app which calls a Python API. The xlwings Server is the web app, but all the web bits are built automatically based on the Python functions.  So there are no Excel JavaScript APIs to deal with and making sure that your `functions.js` matches any changes you have made to your Python functions.  They are also working on an xlwings Script version which will run in the browser, which sounds very promising.

### Anaconda Code

[Anaconda](https://www.anaconda.com/) partnered with Microsoft to provide Python in Excel.  Shortly after the the Python in Excel beta was released in August 2023, Anaconda released the [Anaconda Toolbox](https://www.anaconda.com/blog/anaconda-toolbox-brings-ai-assistant-no-code-development-to-python-in-excel) which initially was focused on providing a no-code AI assistant for Python in Excel as well as a way to centralize the storage of external data.  In July 2024, [Anaconda Code](https://www.anaconda.com/blog/introducing-anaconda-code-add-in-for-microsoft-excel) was added to the toolbox, which enabled users to run Python code locally in Excel using [PyScript](https://pyscript.net/), which in turn uses [Pyodide](https://pyodide.org/en/stable/).  This targeted a different set of users than the Microsoft implementation, as it allowed for internet access, custom packages, and local execution.  It is unclear if this was planned all-along, or if it was a response to the limitations of the Microsoft implementation.

It uses the `REF(A1)` function syntax to reference cells in Excel from within Python code, similar to the `xl(A1)`syntax used by Python in Excel.

### Python for Excel

Boardflare's [Python for Excel](/apps/excel/python.md) was just launched into beta and is the latest addition to the available options. It is a free add-in that is similar to Anaconda Code in that it enables users to run Python code locally in Excel using [Pyodide](https://pyodide.org/en/stable/).

Some of the key benefits are as follows:

🆓 Free add-in, no Microsoft 365 license required.<br/>
🌐 Works in Excel for web as well as desktop.<br/>
☁️ Runtime has network access for API calls.<br/>
📦 Import custom packages (pure Python only).<br/>
🔒 Runs locally, so no data is shared outside Excel.<br/>
✅ Can be used inside formulas and LAMBDA functions.<br/>
➡️ Code can be centralized and loaded from a URL.<br/>
🚀 Performance is only limited by your CPU.<br/>

## Conclusion

Python in Excel is a great addition to the Excel ecosystem, and we're excited to see how it evolves.  There are now several options available for running Python code in Excel, each with their own strengths and weaknesses.  We hope this post has helped you understand the differences between them and choose the one that best fits your needs.

