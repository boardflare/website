---
title: Python for Excel
icon: python.png
---

# Python for Excel

Run Python code locally in Excel for free.

## Overview

Provides the ability to run Python code locally within Excel, enabling more powerful formulas and access to a vast array of open-source packages.

## Features

Key differences compared to the native Python in Excel:

🆓 Free with no Office 365 license required.<br>
🌐 Works in Excel for web as well as desktop.<br>
☁️ Runtime has network access for API calls, etc.<br>
📦 Import custom packages (pure Python only).<br>
🔒 Runs locally, so no data is shared outside Excel.<br>
🚀 Performance is only limited by your CPU.<br>

## Functions

All functions are accessed in the `BOARDFLARE` namespace (e.g. `=BOARDFLARE.PY.ARR(code, [data1])`).  See our [example workbook](https://whistlernetworks.sharepoint.com/:x:/s/Boardflare/EejrDLsCMzBFoY2r-QWdu5MB_6spaJau_Lbu4zWcHg_-HQ?e=9E70aL) for usage.

### PY.ARR

The `PY.ARR` function executes Python code with optional data.  

```excel
=BOARDFLARE.PY.ARR(code, [data1, data2, ...])
```

| Argument | Type   | Optional | Description |
|----------|--------|----------|-------------|
| code     | string | No       | Python code to execute. |
| data1, data2, ...  | array | Yes      | Data arrays set as globals. |

#### Code

The `code` argument is a string that contains the Python code you want to execute.  The value assigned to the global variable `result` must be a matrix and will be output to Excel as a range.  

A simple example is as follows:

```python
arr = [1, 2]
total = sum(arr)
result = [[total]]
```

```excel
=BOARDFLARE.PY.ARR("arr = [1, 2]\ntotal = sum(arr)\nresult = [[total]]")
```
Since `result = [[3]]`, this will output `3` in a single cell in Excel.

Instead of hardcoding the array, if we pass it as an array constant argument `{1,2}` it will be available as global `data1 = [[1,2]]`.  We can also use numpy to illustrate both an import and the fact that the total must be converted to a number as follows:

```python
import numpy as np
total = np.sum(data1).item()
result = [["total", total]]
```

```excel
=BOARDFLARE.PY.ARR("import numpy as np\n\ntotal = np.sum(data1).item()\nresult = [['total', total]]", {1,2})
```
Since `result = [["total",3]]`, this will output an Excel row of `total` in one cell and `3` in the next cell.

The `result` matrix must only contain elements of Python types `int, float, str, bool` which will be converted to Excel values of types `number, string, boolean`.  Some examples to illustrate different scenarios are as follows:

| `result` | Description | Output to Excel |
|----------|-------------|-----------------|
| `[[42]]` | A single number. | `42` in a single cell |
| `[['Hello']]` | A single string. | `"Hello"` in a single cell |
| `[[1, 2, 3]]` | A row of numbers. | `1, 2, 3` in separate cells in a row |
| `[[1], [2], [3]]` | A column of numbers. | `1, 2, 3` in separate cells in a column |
| `[[1, 2], [3, 4]]` | A 2x2 matrix. | A 2x2 range in Excel |
| `[[True, False], [False, True]]` | A matrix of booleans. | A 2x2 range with boolean values |
| `[['a', 1], ['b', 2]]` | Mixed types in a matrix. | A 2x2 range with mixed types |
| `[[np.sum([1, 2])]]` | Numpy scalar. | Error, element(s) not number, string, or boolean |
| `[[np.sum([1, 2]).item()]]` | Numpy scalar cast to number. | `3` in a single cell |
| `np.array([1, 2, 3])` | Numpy array. | Error, not a matrix |
| `set([1, 2, 3])` | Set type. | Error, not a matrix |
| `[[json.dumps({"key": "value"})]]` | Dictionary serialized to JSON. | `{"key": "value"}` in a single cell |
| `pd.DataFrame({"a": [1, 2], "b": [3, 4]})` | Pandas DataFrame. | Error, not a matrix |

#### Imports and packages

[Pyodide](https://pyodide.org/en/stable/index.html) is the Python runtime used by this add-in, and it includes a number of [built-in packages](https://pyodide.org/en/stable/usage/packages-in-pyodide.html).  You can import any of these packages as well as those from the Python standard library as usual in your code with imports.  There is no `requirements.txt`, the add-in will parse the import statements from the code and dynamically load the correct modules.  Any imports for external Python packages will be loaded from [PyPI](https://pypi.org/), but only if they are pure Python, which means there is a Python wheel in the PyPI downloads that ends with `-py3-none-any.whl`, e.g. `beautifulsoup4-4.12.3-py3-none-any.whl`.  If the package is not pure Python, you will not be able to use it.  For example, the fuzzy matching package [rapidfuzz](https://pypi.org/project/rapidfuzz/) is mostly written in C++, so will not work, whereas a similar pure Python package [jellyfish](https://jamesturk.github.io/jellyfish/) will work.  You can search for [OS-independent packages on PyPI](https://pypi.org/search/?q=&o=&c=Operating+System+%3A%3A+OS+Independent), but double-check the wheel.

#### Data

Data is passed to your code using a repeating function argument `data1, data2, ...` which accepts Excel arrays. Each will be loaded as a global variable with the name `data1, data2, ...`.

As with all array arguments in Excel, `data1, etc.` can be either a range reference (e.g. `A2:B3`), an array constant (e.g. `{2,3}`), or a formula that returns an array.

The following table provides various examples for the data argument:

| `data` argument | Description | `data` global |
|-----------------|-------------|---------------|
| `A1` | A single cell reference. | `[[value1]]` |
| `A1:A3` | A column range reference. | `[[value1], [value2], [value3]]` |
| `A1:C1` | A row range reference. | `[[value1, value2, value3]]` |
| `A1:B2` | A 2x2 matrix range reference. | `[[value1, value2], [value3, value4]]` |
| `{1}` | A single cell array constant. | `[[1]]` |
| `{1;2;3}` | A column array constant. | `[[1], [2], [3]]` |
| `{1,2,3}` | A row array constant. | `[[1, 2, 3]]` |
| `{1,2;3,4}` | A 2x2 matrix array constant. | `[[1, 2], [3, 4]]` |
| `=SEQUENCE(3,1,1,1)` | A formula that returns a column array. | `[[1], [2], [3]]` |
| `=SEQUENCE(1,3,1,1)` | A formula that returns a row array. | `[[1, 2, 3]]` |
| `=SEQUENCE(2,2,1,1)` | A formula that returns a 2x2 matrix. | `[[1, 2], [3, 4]]` |

The individual elements of the Excel arrays are converted to Python types as shown in the following table:

| Excel type | Python type |
|------------|-------------|
| Number     | int or float |
| Text       | str |
| Boolean    | bool |
| Error      | None |

If you need to pass a dictionary, or nest more complex data structures, you will need to serialize that data to a string in Excel and then deserialize it in Python.

#### STDOUT and STDERR

Any output to `stdout` or `stderr` is displayed in the Output area of the task pane. This is useful for debugging your code, and also for displaying intermediate results of long-running operations such as functions that are processing large input arrays.  Here is an example of how to print to `stdout` and `stderr`:

```python
import sys

print("This is printed to stdout")
print("This is also printed to stdout", file=sys.stdout)
print("This is printed to stderr", file=sys.stderr)
```

#### Example



## Applications

The purpose of the add-in is to create more powerful formulas by leveraging Python packages.  Some use-cases for this are as follows:

1. **Data extraction**: Python has several libraries available for extracting data from strings.  For example, if you load HTML using PowerQuery, you could parse it using [BeautifulSoup](https://pypi.org/project/beautifulsoup4/).

2. **Data manipulation**: [pandas](https://pandas.pydata.org/) is a popular library for manipulating tabular data and might be a good alternative to PowerQuery for some tasks.

3. **Using AI models**: AI models can be called via APIs with complex prompts and agentic patterns using packages like [LangChain](https://pypi.org/project/langchain/).

4. **Calling APIs**:  For example, let's say you're trying to call a REST API and manipulate the JSON response into something useful.  While in theory you could use the Excel `WEBSERVICE` function, it is much easier to use the `requests` and `json` packages in Python.

## Attribution

This add-in would not be possible without [Pyodide](https://github.com/pyodide/pyodide).

## Installation

Install from the Microsoft AppSource store at the link below, or directly from Excel.

<a href="https://appsource.microsoft.com/en-us/product/office/WA200007447?tab=Overview">
    <img 
        src="/images/MS_AppSource.png" 
        alt="AppSource"
        style="padding-top: 10px; width: 200px;"
    />
</a>