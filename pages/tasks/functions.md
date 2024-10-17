# Functions

Our functions for Excel are grouped by task categories (e.g. Text Analysis > Fuzzy Matching).  They are further organized by Python function (e.g. `fuzzy_distance`), and one or more Excel LAMBDA functions based on this function (e.g. `FUZZY.DIST.MATCH`), as explained further below.  This gives you the best of both worlds: the power of Python, and the ease of customization and simplicity of Excel LAMBDAs.

## Python

Python functions provide access to the vast array of Python libraries and can be run in Excel using either of the following tools:

- [Boardflare's Python for Excel](/apps/excel/python) add-in.  The `BOARDFLARE.PY` function takes the Python code and data as separate arguments and then returns a result. For example, `BOARDFLARE.PY("text/fuzzy_distance.ipynb", data1, data2)` calls the [fuzzy_distance](/tasks/nlp/fuzzy-match/fuzzy_distance) function.

- [Microsoft's Python in Excel](https://support.microsoft.com/en-us/office/introduction-to-python-in-excel-55643c2e-ff56-4168-b1ce-9428c8308545) feature runs Python code in a special `PY` cell.  The cells containing your data are directly referenced in your Python code, e.g. `data1 = xl("F4")`

Each tool for running Python in Excel has its own advantages and disadvantages, but one key difference is that `BOARDFLARE.PY` is a function which can be used in Excel formulas, such as a LAMBDA function, whereas Microsoft's `PY` is a feature of the cell itself and cannot.  We leverage this capability to create Excel LAMBDA functions which customize the Python functions for specific use-cases as discussed below.

## Excel LAMBDA

For each of our Python functions, we typically provide several [Excel LAMBDA](https://support.microsoft.com/en-us/office/lambda-function-bd212d27-1cd1-4321-a34a-ccbf254b8b67) functions which extend the Python function to provide additional convenience features,  address specialized use-cases, or just simplify use for end-users.

For example, the Python `fuzzy_distance` function can be extended to create a `FUZZY.DIST.MATCH` LAMBDA function which uses the `jaccard` algorithm and only returns a match over a similarity of `0.9` as follows:

```excel
=LAMBDA(lookup_value, lookup_array, 
    LET(
        result, BOARDLARE.PY("text/fuzzy.ipynb", lookup_value, lookup_array, "jaccard"),
        index, INDEX(result, 1),
        score, INDEX(result, 2),
        IF(score >= 0.9, index, "No match")
    )
)
```

This function can then be used as follows:

```excel
=FUZZY.DIST.MATCH(A1, B1:B10)
```

To help reduce confusion, and in keeping with Python and Excel naming conventions, our Python function names are always lower case, e.g. `fuzzy_distance`, whereas Excel LAMBDA function names are always capitalized, e.g. `FUZZY.DIST.MATCH`.
