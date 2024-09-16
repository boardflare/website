---
title: Python for Excel
icon: python.png
---

# Python for Excel

Run Python code locally in Excel for free.

## Overview

Provides the ability to run Python code as a function locally within Excel.  It is intended solely for the purpose of enabling more powerful formulas by encapsulating Python code, typically in a user-friendly named LAMBDA function.  It does not provide a Jupyter notebook style execution environment, or the ability to directly reference Excel ranges from Python, like [Python in Excel](https://support.microsoft.com/en-au/office/get-started-with-python-in-excel-a33fbcbe-065b-41d3-82cf-23d05397f53d) does.

## Features

🆓 Free with no Office 365 license required.<br>
🌐 Works in Excel for web as well as desktop.<br>
☁️ Runtime has network access for API calls, etc.<br>
📦 Import custom packages (pure Python only).<br>
🔒 Runs locally, so no data is shared outside Excel.<br>
🚀 Performance is only limited by your CPU.<br>

## Runtime

[Pyodide](https://pyodide.org/en/stable/index.html) is the Python runtime, which is based on [WebAssembly](https://webassembly.org/) running in the browser used by Excel desktop and web to host add-ins.  The runtime is sandboxed by the browser and has no direct access to the file system.  It does have network access, so you can make API calls to external services.

### Packages

 Pyodide includes a number of [built-in packages](https://pyodide.org/en/stable/usage/packages-in-pyodide.html). You can import any of these packages as well as those from the Python standard library. Any imports for external Python packages will be loaded from [PyPI](https://pypi.org/), but only if they are pure Python, which means there is a Python wheel that ends with `-py3-none-any.whl`, e.g. `beautifulsoup4-4.12.3-py3-none-any.whl`.  Packages tagged as [OS-independent](https://pypi.org/search/?q=&o=&c=Operating+System+%3A%3A+OS+Independent) on PyPI should work, but double-check the wheel.

### Console

Any output to `stdout` or `stderr` is displayed in the Console area of the add-in task pane. This is useful for debugging your code, and also for displaying intermediate results of long-running operations such as functions that are processing large input arrays. 

### Globals

Global variables are used to pass data to your code, as discussed in more detail below.  Global variables are cleared after each function invocation, so no state is maintained between calls.

## Functions

Functions are accessed in the `BOARDFLARE` namespace (e.g. `=BOARDFLARE.PY(code, [data1])`).  See our [example workbook](https://whistlernetworks.sharepoint.com/:x:/s/Boardflare/EejrDLsCMzBFoY2r-QWdu5MB_6spaJau_Lbu4zWcHg_-HQ?e=9E70aL) for usage.

### PY

The `PY` function executes Python code with optional repeating **scalar** arguments `data1, data2, ...` which are assigned to global variables and returns a **scalar** (e.g. 5 in a single cell).

```excel
=BOARDFLARE.PY(code, [data1])
```

| Argument | Type   | Optional | Description |
|----------|--------|----------|-------------|
| code     | string | No       | Python code must assign global variable `pyout` with a **scalar** of type `int, float, bool, or str`. |
| data1    | number, string, boolean | Yes       | Repeating argument that will set global **scalar** variables `data1, data2, ..`. |

A simple example is as follows:

```excel
=BOARDFLARE.PY("pyout = data1 * data2", 5, 3)
```
This sets global variables `data1 = 5 ; data2 = 3`, evaluates to `pyout = 15`, and returns `15` in a single cell.

You could assign serialized arrays (e.g. using `ARRAYTOTEXT`) to `data1, data2, ..` and return a serialized array which you deserialize in Excel, but a simpler approach is to use the `PY.ARR` function below which natively handles arrays.

### PY.ARR

The `PY.ARR` function is the same as `PY` except that it takes arrays for `data1, data2, ...` and outputs an array result to Excel.  Remember that **an array variable in Excel is always a 2D array, or matrix**, even if it represents a single row or column, or even a single cell.  Excel custom functions use the term **matrix** instead of array to help clarify this, and that is what we will do here also.

```excel
=BOARDFLARE.PY.ARR(code, [data1])
```

| Argument | Type   | Optional | Description |
|----------|--------|----------|-------------|
| code     | string | No       | Python code must assign global variable `pyout` with an **matrix** of elements of type `int, float, bool, or str`. |
| data1    | array | Yes       | Repeating argument that will set global **matrix** variables `data1, data2, ..`. Values can be a range `A2:A3`, array constant `{2,3}`, or a function that returns an array. | 

You could use `PY.ARR` for scalars, but since everything is handled as a matrix, it can be a bit cumbersome.  Let's implement the previous example using `PY.ARR`:
    
```excel
=BOARDFLARE.PY.ARR("pyout = [[data1[0][0] * data2[0][0]]]", {5}, {3})
```

See what we mean?  But for anything involving arrays, `PY.ARR` is the way to go.  Here's a simple example that takes a row array and returns a single cell:

```excel
=BOARDFLARE.PY.ARR("total = sum(data1[0]); pyout = [[total]]", {1,2})
```
This sets global `data1 = [[1,2]]`, so `pyout = [[3]]`, which outputs `3` in a single cell in Excel.

Or using numpy and returning a row:

```excel
=BOARDFLARE.PY.ARR("import numpy as np; total = np.sum(data1[0]).item(); pyout = [['Sales', total]]", {1,2})
```
This sets global `data1 = [[1,2]]`, so `pyout = [['Sales', 3]]`, which outputs a row with `Sales` in one cell and `3` in the next cell.

More examples coming soon!

## Applications

Some example applications are as follows:

1. **Data extraction**: Python has several libraries available for extracting data from strings.  For example, if you load HTML using PowerQuery, you could parse it using [BeautifulSoup](https://pypi.org/project/beautifulsoup4/).

2. **Data manipulation**: [pandas](https://pandas.pydata.org/) is a popular library for manipulating tabular data and might be a good alternative to PowerQuery for some tasks.

3. **Using AI models**: AI models can be called via APIs with complex prompts and agentic patterns using packages like [LangChain](https://pypi.org/project/langchain/).

4. **Calling APIs**:  For example, let's say you're trying to call a REST API and manipulate the JSON response into something useful.  While in theory you could use the Excel `WEBSERVICE` function, it is much easier to use the `requests` and `json` packages in Python.

## Installation

Install from the Microsoft AppSource store at the link below, or directly from Excel.

<a href="https://appsource.microsoft.com/en-us/product/office/WA200007447?tab=Overview">
    <img 
        src="/images/MS_AppSource.png" 
        alt="AppSource"
        style="padding-top: 10px; width: 200px;"
    />
</a>