# Functions

Functions allow more complex tasks to be broken down into smaller, more manageable pieces that are easier for both humans and AI to understand.  This makes your spreadsheet more observable by others, and enables AI to be readily applied to maintaining these functions.

Our collection of functions for Excel are organized by task categories in the left navigation.  Within each task, there are foundation Python functions, and Excel LAMBDA functions based on these, as explaind below. 

## Function Types

### Python
These functions are written in Python and are run using the [Python for Excel](/apps/excel/python) add-in. e.g. `BOARDFLARE.PY("text/fuzzy.ipynb", lookup_value, lookup_array, algorithm)` calls the [Fuzzy](/functions/text/fuzzy) function.  The Python source code can be modified or you can customize it using a LAMBDA function as described below.

### Excel LAMBDA
These are written in Excel and wrap Python functions to provide additional convenience features, address specialized use-cases, or just simplify use for end-users.  For example, the Python `Fuzzy` function can be wrapped to create a LAMBDA function which uses the `jaccard` algorithm and only returns a match over a similarity of `0.9` as follows:

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

If this LAMBDA is named `FUZZYMATCH`, it could be used as follows:

```excel
=FUZZYMATCH("example", {"samples", "exemplar", "sample", "examples"})
```

To help avoid confusion, Python functions are written in pascal case, e.g. `FuzzyMatch`, whereas Excel named LAMBDA functions are always capitalized, e.g. `FUZZYMATCH`.


