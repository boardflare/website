# Functions

Our functions for Excel are grouped by task categories (e.g. Text Analysis > Fuzzy Matching).  Each Python function (e.g. `text_distance`) has one or more example Excel LAMBDA functions based on this function (e.g. `FUZZYMATCH.TD`), as explained further below.  This gives you the best of both worlds: the power of Python, and the ease of customization and simplicity of Excel LAMBDAs.

## Python

Python functions can be run in Excel using either [Boardflare's Python for Excel](/apps/excel/python) add-in or [Microsoft's Python in Excel](https://support.microsoft.com/en-us/office/introduction-to-python-in-excel-55643c2e-ff56-4168-b1ce-9428c8308545).  The main differences between the two are outlined in the table below:

| Feature            | `BOARDFLARE.RUNPY`                                      | Excel `PY`                                                                |
|--------------------|---------------------------------------------------------|---------------------------------------------------------------------------|
| Integration        | Excel function                                          | Special cell feature                                                      |
| Usage              | Can be used in Excel formulas, such as LAMBDA functions | Interactive use, similar to Jupyter notebook.                             |
| Data Reference     | Data passed as arguments to function                    | Cells are directly referenced in the Python code                          |
| Example Use        | `=BOARDFLARE.RUNPY("arg1 + 2", A4)`                     | `=PY(arg1 = xl("A4"); arg1 + 2)`                                          |
| Python Packages    | [Pyodide built-in packages](https://pyodide.org/en/stable/usage/packages-in-pyodide.html) and external pure-python | [Anaconda distribution packages](https://support.microsoft.com/en-us/office/open-source-libraries-and-python-in-excel-c817c897-41db-40a1-b9f3-d5ffe6d1bf3e) only. |
| Processing         | Local in Excel add-in browser runtime                   | Microsoft cloud                                                           |
| Network Access     | Network access for API calls, web scraping              | No network access allowed                                                 |
| Platforms          | Excel for web and desktop (Windows/Mac)                 | Excel desktop only                                                        |
| Pricing            | Free for base features                                  | Requires Microsoft 365 subscription                                       |

Each tool has its own advantages and disadvantages depending on your use-case.  We have aligned the syntax of `BOARDFLARE.RUNPY` with the Excel `PY` cell feature to make it as easy as possible to re-use the same Python function code in either tool so you can choose the best tool for your needs.  For example, we also convert input arrays to pandas DataFrames by default, and return the last expression in the Python code as the result, just like the `PY` cell feature.

Due to differences in packages supported in each Python enviroment, not all functions can be used in both, but wherever possible we have tried to implement functions that can be used in both environments.

One of the key features of `BOARDFLARE.RUNPY` is its ability to be used in Excel formulas, such as a LAMBDA function, as discussed below.

## LAMBDA

For each Python functions that can be used in `BOARDFLARE.RUNPY`, we typically provide several [Excel LAMBDA](https://support.microsoft.com/en-us/office/lambda-function-bd212d27-1cd1-4321-a34a-ccbf254b8b67) functions which extend the Python function to provide additional convenience features,  address specialized use-cases, or just simplify use for end-users.

For example, the Python `fuzzy_distance` function can be extended to create a `FUZZYMATCH.TD` LAMBDA function as follows:

```excel
=LAMBDA(lookup_value, lookup_array, [similarity_threshold], [algorithm],
    LET(
        threshold, IF(ISOMITTED(similarity_threshold), 0.7, similarity_threshold),
        algo, IF(ISOMITTED(algorithm), "jaccard", algorithm),
        result, BOARDFLARE.RUNPY("text/fuzzy/text_distance.ipynb", lookup_value, lookup_array, algo),
        index, INDEX(result, 1),
        score, INDEX(result, 2),
        IF(score >= threshold, index, "No match")
    )
)
```

This function can then be used as follows (e.g. assuming it is named `FUZZYMATCH.TD`):

```excel
=FUZZYMATCH.TD(A1, B1:B10)
```

To help reduce confusion, and in keeping with Python and Excel naming conventions, our Python function names are always lower case, e.g. `text_distance`, whereas Excel LAMBDA function names are always capitalized, e.g. `FUZZYMATCH.TD`.
