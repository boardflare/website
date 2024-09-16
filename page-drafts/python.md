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

All functions are accessed in the `BOARDFLARE` namespace (e.g. `=BOARDFLARE.PY.ARR(code, [globals])`).  See our [example workbook](https://whistlernetworks.sharepoint.com/:x:/s/Boardflare/EejrDLsCMzBFoY2r-QWdu5MB_6spaJau_Lbu4zWcHg_-HQ?e=9E70aL) for usage.

### PY.ARR

The `PY.ARR` function executes Python code with optional globals for passing in data.  

```excel
=BOARDFLARE.PY.ARR(code, [globals])
```

| Argument | Type   | Optional | Description |
|----------|--------|----------|-------------|
| code     | string | No       | Python code to execute. |
| globals  | array | Yes      | Global variables in 2 x n array. |

#### Code

The `code` argument is a string that contains the Python code you want to execute. The code can be a simple expression or a block of code. The value you want to return to Excel must be assigned to the variable `result`, and must be of type `string, number, boolean, list, or dictionary`.  

A simple example is as follows:

```python
data = [1, 2, 3, 4, 5]
result = sum(data)
```
A slightly more complex example is as follows:

```python
import numpy as np
import sys

def main():
    try:
        data = [1, 2, 3, 4, 5]
        total = np.sum(data).item()
        return total
    except Exception as e:
        print(str(e), file=sys.stderr)
        return None

result = main()
```

If `result` is a 2D nested list, and all inner elements are arrays of the same length, it will become a 2D Excel array.  All other nested lists will throw an error.  A dictionary will be converted to a 2D Excel array with the top-level keys in the first column and their values in the second column.  If any the top-level values are not of type `string, number, or boolean`, they will be serialized to JSON.

In the last example, if instead it was `total = np.sum(data)`, then it would return because without calling `item()`, `total` is a numpy scalar, not a primitive.  The error handling for this is still in development, so if you code returns an odd result or an error, try printing it to stdout to check if the problem is with the conversion of the return value.

#### Imports and packages

Pyodide is the Python runtime used by this add-in, and it includes a number of [built-in packages](https://pyodide.org/en/stable/usage/packages-in-pyodide.html).  You can import any of these packages as well as those from the Python standard library as usual in your code with imports.  The add-in will parse the import statements and load the correct modules.  Any imports for external Python packages will be loaded from [PyPI](https://pypi.org/) only if they are pure Python, which means the Python wheel must end with `-py3-none-any.whl`.  If the package is not pure Python, you will not be able to use it.  For example, a great fuzzy matching package is [rapidfuzz](https://pypi.org/project/rapidfuzz/), but is mostly written in C++, so will not work, whereas a similar pure Python package [jellyfish](https://jamesturk.github.io/jellyfish/) will work.  At this time we have not found a convenient way to search pure Python packages on PyPI, so you'll have to either look at the download wheel file names or the corresponding GitHub repository to determine if the package is pure Python.

#### Globals

Data is passed to your code using the `globals` argument which is an `m x 2` array where each row will be converted to a global variable using the first column as the variable name and the second column as its value.  Globals are cleared after each function execution.

For example, let's say you have the following range in the upper corner of a worksheet:

|  Name |  Value |
|:---:|:---:|
| x | 1 |
| y | foo |
| z | TRUE |

If you set `globals` equal to `A2:B5` then the following variables will be set as globals: `x = 1`, `y = "foo"`, and `z = TRUE`.  The variable values can be any Excel primitive: `string, number, or boolean`.

As with all array arguments in Excel, `globals` can be either a range reference (e.g. `A2:B5` as in the example above), an array constant (e.g. `{"x", 1; "y", "foo"; "z", TRUE}`), or a formula that returns an array.

If you want to pass an Excel array as the value for a variable, you need to serialize it to string first, and then deserialize it in your code.  One option for serializing is to use the Excel [ARRAYTOTEXT](https://support.microsoft.com/en-us/office/arraytotext-function-9cdcad46-2fa5-4c6b-ac92-14e7bc862b8b) function.

For example, if you have an array in `A1:B1` that you want to pass as the value for the variable `y`:

| A  | B  |
|---|---|
| foo | bar |

Using `=ARRAYTOTEXT(A1:B1, 1)` (strict format) will return the string `{"foo", "bar"}`, which obviously isn't JSON, but it is worth noting this.  So now globals is as follows:

|  Name |  Value |
|:---:|:---:|
| x | 1 |
| y | {"foo", "bar"} |
| z | TRUE |

Using `=ARRAYTOTEXT(A1:B1, 0)` (concise format) will return the string `foo, bar`, which might be preferable if you know your inputs do not contain commas.  So now globals is as follows:

|  Name |  Value |
|:---:|:---:|
| x | 1 |
| y | foo, bar |
| z | TRUE |

Of course you can use any serialization method you prefer.  We plan to add an `ARRAYTOJSON` function so you can use `json.loads` for simplicity.

#### STDOUT and STDERR

Any output to `stdout` or `stderr` is displayed in the Output area of the task pane. This is useful for debugging your code, and also for displaying intermediate results of long-running operations such as functions that are processing large input arrays.  Here is an example of how to print to `stdout` and `stderr`:

```python
import sys

print("This is printed to stdout")
print("This is also printed to stdout", file=sys.stdout)
print("This is printed to stderr", file=sys.stderr)
```

#### Example

=LAMBDA(arr1, arr2, BOARDFLARE.PY.ARR("result = sum(arr1) + sum(arr2)", {"arr1", arr1; "arr2", arr2}))(A1:A5, B1:B5)

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