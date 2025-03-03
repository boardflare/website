---
title: Python for Excel
---

# Python for Excel

## Overview

Install the [add-in](https://go.microsoft.com/fwlink/?linkid=2261819&templateid=WA200007447&templatetitle=Python%20for%20Excel).  Create an Excel custom function from a Python function in two easy steps as follows:
 
### 1. Write a Python function
Using the add-in code editor, write or paste your function code, e.g.:
```python
def inches_to_mm(inches):
    """ Converts inches to millimeters. """
    return inches * 25.4
```
 
### 2. Run as an Excel function
Python code is stored in workbook settings, and the custom function is added to the name manager:
```excel
=LAMBDA(inches, BOARDFLARE.EXEC("workbook-settings:inches_to_mm", inches))
```
  
The custom function is now available for use in the workbook:
```excel
=INCHES_TO_MM(inches)
```

Let's use another example to explain the process in more detail.  Suppose you have the following Python function:

```python
def hello(first, last):
    """ Returns a greeting. """
    greeting = f"Hello {first, last}!"
    return greeting
```

When you save this code, the Python function name `hello` and arguments `first, last` are parsed to create a LAMBDA function `=LAMBDA(first, last, BOARDFLARE.EXEC("workbook-settings:hello", first, last))` which is saved to the name manager with the name `HELLO`.  The Python code is saved to the [workbook settings](https://learn.microsoft.com/en-us/office/dev/add-ins/excel/excel-add-ins-workbooks#access-document-settings) so it is embedded in the workbook.  The first line of the Python function docstring is also added as a comment to the name manager to provide a description users can see when they use the function.

![Hello Function](/images/hello-function.png)

Each time the function is invoked, `BOARDFLARE.EXEC` loads the code from the workbook settings and runs it with the arguments.  Since the code and LAMBDA are both stored in the workbook, anyone who uses the workbook can use the function.  If they don't have the add-in installed, Excel will automatically prompt them to do so.

`BOARDFLARE.EXEC` is currently intended for internal use only.  If you wish to use a lower-level API, you can use the `BOARDFLARE.RUNPY` function directly, which is similar.  See the [BOARDFLARE.RUNPY](#boardflarerunpy) section for more details.

## Features

Some key features of the add-in are as follows:

✅ Use Python in formulas and LAMBDA functions.<br/>
🆓 Free add-in, no Office 365 license required.<br/>
🌐 Works in Excel for web as well as desktop.<br/>
☁️ Runtime has network access for API calls (needs CORS).<br/>
📦 Import custom packages (pure Python only).<br/>
🔒 Code is stored in your workbook and runs locally.<br/>
🚀 No user sign-in is required to run functions.<br/>

### Editor Tab

See the [slideshow](https://boardflare.sharepoint.com/:p:/g/EQnCIws7lt1Glc8EqDnJZfYBPSdE-UfHtOntEzpuO4O80A?e=WAmO7L) for a quick overview and read the new documentation below.

The add-in `Editor` tab contains a code editor ([Monaco](https://github.com/microsoft/monaco-editor), same as VS Code) that allows you to write Python code with syntax highlighting.  When you save your code a LAMBDA function is created from your Python code.  You can also run [test cases](#test-cases) to verify your function.  If you drag the task pane open for more room, you will have the following view:

![Code Editor](/images/code-editor.png)

The bottom bar of the editor tab contains the following controls:

- `Select a function...`:  Enables you to load a different function in the workbook into the editor.  Make sure you save any changes before switching functions.
- `Reset`:  Returns the editor to its initial default function.
- `Test`:  Runs the [test cases](#test-cases) defined in the Python code.  You will be taken to the `Output` tab to view the results.
- `Save`:  Saves the code in the editor to workbook settings and create a LAMBDA function.  If an existing function of the same name exists, it will be updated.  There is **NO AUTO-SAVE**.

![Code Editor Controls](/images/code-editor-controls.png)

### Functions Tab

The `Functions` tab displays a list of all the Python functions saved in the workbook.  Clicking edit 🖊️ on a function returns you to the editor tab with that function loaded, the same as if you loaded it from the functions dropdown in the code editor.  You can run tests on a function by clicking the ▶️ icon.  You can also delete functions from the workbook by clicking ❌.

![Functions Tab](/images/functions-tab.png)

You can load a Jupyter notebook of example functions into your workbook by selecting the notebook with the functions you want to import, then clicking `Import Noteboook Functions`.  You can then edit these functions as you wish. Just make sure to remember to rename them so they are saved as a new function.  Otherwise they will be overwritten if you import the notebook again because they have the same name.  If there is a specific type of example function you would like to see, please [let us know](/company/support).

You may also import functions from a notebook that is stored in a GitHub Gist such as [this example](https://gist.github.com/bolleman/c2d1e1bf47680f8e5d699a2ae1be8c82).  Paste the URL of the Gist, e.g. `https://gist.github.com/bolleman/c2d1e1bf47680f8e5d699a2ae1be8c82` into the `Enter GitHub Gist URL` form and click the `Add` button.  The notebook will now be available in the `Select a notebook...` dropdown to import into the workbook.  The link to the notebook is stored in your browser storage, so it is available to import into any workbook.  If you update the code in the Gist, you can select the notebook and click the `Import Notebook Functions` button again to update the functions in the workbook, which will overwrite any changes you made in the editor.  This is the workflow we use when building functions using VS Code.

## Writing Code

Some things to be aware of when writing your Python code are outlined in the following sections.

### Importing Packages

[Pyodide](https://pyodide.org/en/stable/index.html) is the Python runtime used by the add-in, and includes a number of [built-in packages](https://pyodide.org/en/stable/usage/packages-in-pyodide.html). You can import any of these packages as well as those from the Python standard library. Any imports for external Python packages will be loaded from [PyPI](https://pypi.org/), but only if they are pure Python, and depend on any packages that are either built into pyodide or also pure Python.  Packages tagged as [OS-independent](https://pypi.org/search/?q=&o=&c=Operating+System+%3A%3A+OS+Independent) on PyPI should work.  If you try to import an external package (not part of the Python standard library or one of the built-in packages) for which there is not a pure Python wheel available on PyPI, an error will be thrown

Your code will be scanned for imports and any packages needed will be installed for you using `micropip`.  However, specific imports (e.g., `from azure.core.credentials import AzureKeyCredential`) will not be handled automatically, so you need to install these manually using `await micropip.install(['package1', 'package2'])`. `micropip` has already been imported for you, and since the Python code is executed async, you can use a top-level await as follows:

```python
await micropip.install(['azure-ai-textanalytics'])
from azure.core.credentials import AzureKeyCredential
# Continue with your code...
```

### Type Conversion

The following type conversions will take place on the arguments passed to your function from Excel:

| Excel Type | Excel Example                  | Python Type | Python Example          |
|------------|--------------------------------|-------------|-------------------------|
| Number     | 42                             | int         | 42                      |
| Number     | 3.14                           | float       | 3.14                    |
| String     | "hello"                        | str         | "hello"                 |
| Boolean    | TRUE                           | bool        | True                    |
| Array      | `{1, 2, 3}`                    | 2D List     | [[1, 2, 3]]             |
| Array      | A1:B2                          | 2D List     | [[1, 2], [3, 4]]        |
| Null       | Reference to an empty cell     | None        | None                    |
| Null       | Unset optional LAMBDA argument | None        | None                    |
| Null       | Arg skipped with `,`           | None        | None                    |
| Date       | 45678 (serial format)          | int         | 45678 - not converted*  |

*Excel stores dates as numbers in serial format, and since we have no way to distinguish these from non-date numbers, they are not converted to datetime objects, and simply become a Python int.  If you want to convert an Excel serial to a Python `datetime`, you can use the following code:

```python
from datetime import datetime, timedelta

def excel_date_to_datetime(serial):
    return datetime(1899, 12, 30) + timedelta(days=serial)
```

The value returned by your Python function will similarly be converted to the corresponding Excel type as follows:

| Python Type             | Python Example              | Excel Type | Excel Example                |
|-------------------------|-----------------------------|------------|------------------------------|
| int                     | 42                          | Number     | 42                           |
| float                   | 3.14                        | Number     | 3.14                         |
| str                     | "hello"                     | String     | "hello"                      |
| bool                    | True                        | Boolean    | TRUE                         |
| 2D list (Matrix)        | [[1, 2], [3, 4]]            | Array      | A1:B2*                       |
| 2D list (Column Vector) | [[1], [2], [3]]             | Array      | A1:A3*                       |
| 2D list (Row Vector)    | [[1, 2, 3]]                 | Array      | A1:C1*                       |
| None                    | None                        | Null       | Empty cell                   |
| datetime                | datetime(2022, 1, 1)        | Date       | 44519                        |
| tuple                   | (1, 2, 3)                   | Array      | A1:A3                        |

*Assumes formula is in cell A1.

If your function returns another Python type such as a list, set, or other non-scalar types, an error will be thrown.  We have support for converting numpy and pandas types to help reduce errors, but recommend you not rely on these.

### Test Cases

If you define a `test_cases` variable in your code with a list of arguments, these will be used to test your function when you click `Test` in the editor.  You will be taken to the `Output` tab where you view the output from executing the function with the arguments provided in the `test_cases`.  Note that the arguments need to be in the same order as the function arguments and are the Python type expected by the function.  These `test_cases` run entirely in the Python environment so the Excel-to-Python type conversions noted above do not apply.

If you include a comment line in your code with an example invocation of your function in Excel, e.g. `# Excel usage: =HELLO("Nancy", "Morgan")`, a demo sheet will be created when you test your function which includes this invocation.  This demo sheet will be overwritten each time you run your function and currently only one comment line is supported.

For examnple:

```python
def hello(first, last):
    """ Returns a greeting. """
    greeting = f"Hello {first, last}!"
    return greeting
    
# Test cases for the function.
test_cases = [["Nancy", "Morgan"], ["Ming", "Lee"]]

# Excel usage: =HELLO("Nancy", "Morgan")
```

If your function only has one argument, you must still wrap it in a list as follows:

```python
def square(x):
    """ Returns the square of a number. """
    return x ** 2

# Test cases for the function.
test_cases = [[2], [3], [4]]

# Excel usage: =SQUARE(2)
```
If you have a function that takes an array as an argument, you can define the test cases as follows:

```python
def sum_array(arr):
    """
    Returns the sum of the first sub-array in a 2D list of integers.
    
    Parameters:
    arr (list of list of int): A 2D list of integers.
    
    Returns:
    list of list of int: A 2D list containing the sum of the first sub-array.
    """
    return sum(arr[0])

# Test cases for the function.
test_cases = [[[1, 2, 3]], [[4, 5, 6]]]

# Excel usage: =SUM_ARRAY({1, 2, 3})
```
As mentioned above in the [Type Conversion](#type-conversion) section, Excel arrays will always be converted to 2D lists, so construct your function and test_cases accordingly.

### Limitations

- Optional arguments are not supported, e.g., `def add(a, b=2):` or `ADD(a,[b])` in Excel.  This will be fixed soon.
- `*args` and `**kwargs` are not supported because LAMBDA functions do not support repeating arguments.

## BOARDFLARE.RUNPY

`BOARDFLARE.RUNPY` is a legacy function that can still be used, but for most scenarios the code editor and automatically generated LAMBDA functions are the preferred way to work with Python code in Excel.

`RUNPY` takes a Python code string and a repeating positional argument `arg1, arg2, ...` (similar to Python *args) and returns the result.  The syntax is as follows:

```excel
=BOARDFLARE.RUNPY(code, [arg1],[arg2],...)
```

```excel
=BOARDFLARE.RUNPY("2 + arg1", 3) = 5
```

The value of the last expression is returned.  For example:

```python
import numpy as np

def add(a, b):
    return np.add(a, b).item()  # Call item() to convert numpy scalar to Python scalar.

add(arg1, arg2)  # This value of this expression will be returned.
```
The arguments and return values undergo the [type conversion](#type-conversion) noted earlier, with a key difference that array arguments are converted to pandas DataFrames first.

See this [brief video](https://youtu.be/ngxM7VRkkgk) and [example workbook](https://boardflare.sharepoint.com/:x:/g/ESGeGi-O5EpGumN9Acdc1NUBDDTq1o0BOchwxW9m3kh_1w?e=czam03) for more examples.

## FAQ

<details>
  <summary>Why am I getting Excel errors like `#VALUE!`, `#NAME?`, `#BUSY!`?</summary>
  - `#VALUE!`:  An argument to a function is missing or it is the wrong type (e.g. incorrect range reference).
  - `#NAME?`:  The function name is spelled incorrectly, e.g. `BOARDFLARE.RUNPYY`.
  - `#BUSY!`:  This is normal for 5-10 seconds if you are importing libraries for the first time and have a slow internet connection. 

  To the left of the bottom of the task pane, you may also see additional errors such as the following:

  - `Error loading add-ins`
  - `We're starting the add-ins runtime, just a moment...`

  Sometimes Excel will throw various errors when the custom function is not properly initialized, in which case you can try restarting Excel, or reloading the browser window.
</details>

<details>
  <summary>Can Python code access the network?</summary>
  You should be able to access any public API that supports [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).
</details>

<details>
  <summary>Can I build a LAMBDA function using the native Excel PY?</summary>
  No, that is the original reason we built this add-in.  At this time the Excel PY function does not allow you to call it from a formula.
</details>

<details>
  <summary>Can I access local files on my machine?</summary>
  No. The Pyodide runtime runs in a [Web Worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) in the browser which does not have access to your local machine.  This is a browser security feature.
</details>

<details>
  <summary>Where is `stdout` or `stderr` is displayed?</summary>
  Any output to `stdout` or `stderr` is displayed in the `Output` tab of the add-in task pane, but it is only returned at the completion of the execution of your code.  
</details>

## Changelog

<details>
  <summary>1.2.2 - 2025-03-02</summary>
- Support for default arguments in Python functions with optional parameters in Excel.
- Use a shared folder in SharePoint or OneDrive to share functions with your team.
- Ability to configure Microsoft permissions so your functions can use Graph APIs.
- Example functions can be added to sheet separately.
- Notice for Excel for web users that it does not support function autocomplete.
- Implemented cors proxy to resolve issues with some APIs.
</details>

<details>
  <summary>1.2.1 - 2025-02-23</summary>
- AI prompts that are not suitable for a function display an error message instead of garbage code.
- Added tooltip to login to let users know purpose of login is for OneDrive access.
- Improved logging to better isolate name manager errors some users are experiencing.
- Clicking AI button in Editor now displays prompt used to create function, if any, instead of confirmation dialog.
- Prompts now saved to settings.
</details>

<details>
  <summary>1.2.0 - 2025-02-16</summary>
  - Entra ID authentication, makes graphToken available to functions.
  - OneDrive storage of functions for easy use in other workbooks.
  - Tuple result conversion to list.
  - Set filename parameter for error messages, fixed line numbers to align with code.
  - Add examples worksheet for better first-run experience.
  - Add confirmation dialog to AI function creation.
  - Auto-save functions generated by AI to workbook only.
  - Vastly improved logging system with more efficient batching.
  - Removed feedback form as wasn't being used productively.
  - Removed reset button from Editor as can get same using default selector option.
  - Encapsulate Notebooks UI in its own component, hide by default.
</details>

<details>
  <summary>1.1.0 - 2025-01-18</summary>
  - Added `Code Editor` to create LAMBDA functions automatically from Python code.
  - Ability to import multiple functions from a Jupyter notebook.
  - DataFrame type conversion only occurs if code contains a pandas import.
</details>

