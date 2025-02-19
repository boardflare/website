---
title: Fuzzy Matching with Python in Excel
---

# Fuzzy Matching with Python in Excel
November 4, 2024.

## Overview

[Fuzzy matching](/tasks/text/fuzzy-match) is a technique used to find strings that are approximately equal, e.g. "Microsoft" and "Microsoft Inc". This is particularly useful in scenarios where exact matches are not possible due to typographical errors, variations in spelling, or other inconsistencies. In this post, we will explore how to perform fuzzy matching with [Python in Excel](https://techcommunity.microsoft.com/t5/excel-blog/python-in-excel-available-now/ba-p/4240212) using the [NLTK](https://github.com/nltk/nltk) library.

## NLTK Library

The [Natural Language Toolkit (NLTK)](https://www.nltk.org/) is a powerful library for natural language processing. It provides various tools and algorithms for text processing, including tokenization, stemming, lemmatization, and distance metrics. We will focus on using NLTK to calculate similarity scores between strings for fuzzy matching.

An example of calculating the similarity of two strings using `edit_distance` is shown below:

```python
from nltk.metrics.distance import edit_distance

string1 = "apple"
string2 = "apples"
distance = edit_distance(string1, string2)
print(distance)
```

In this example, the `edit_distance` function calculates the minimum number of single-character edits required to change one string into the other. The output will be `1`, indicating that the strings 'apple' and 'apples' have an edit distance of 1.

NLTK supports various distance metrics for calculating similarity between strings, including:

- **Jaccard Distance**: Measures the similarity between two sets by comparing the intersection and union of the sets.
- **Levenshtein Distance**: Calculates the minimum number of single-character edits required to change one word into the other.
- **Jaro Similarity**: Measures the similarity between two strings by considering the number of matching characters and transpositions.

## Python Function

We've created the [nltk_distance](/functions/text/fuzzy-match/nltk_distance) function to handle the typical use-case in Excel of finding a match for a `lookup_value` in a `lookup_array`, similar to how the `XMATCH` function works. It normalizes the edit_distance results to a similarity score of 0-1 for easier comparison.  The function is as follows:

```python
import nltk
import pandas as pd
from nltk.metrics.distance import edit_distance, jaccard_distance, jaro_similarity
from nltk.util import ngrams

def nltk_distance(lookup_value, lookup_array_df, algorithm):
    """
    Calculate the similarity between a lookup_value and a lookup_array using various distance algorithms.

    Parameters:
    lookup_value (str or pd.DataFrame): The string or DataFrame to search for.
    lookup_array_df (pd.DataFrame): The DataFrame to search within.
    algorithm (str): The algorithm to use for calculating similarity. Options are 'levenshtein', 'jaccard', and 'jaro'. Default is 'jaccard'.

    Returns:
    list: A list of lists where each sublist contains the index (1-based) and the similarity score of the most similar item in the lookup_array.
    """
    # Define a dictionary to map algorithm names to functions
    algo_funcs = {
        'levenshtein': lambda x, y: 1 - edit_distance(x, y) / max(len(x), len(y)),
        'jaccard': lambda x, y: 1 - jaccard_distance(set(ngrams(x, 2)), set(ngrams(y, 2))),
        'jaro': jaro_similarity
    }
    
    # Get the algorithm function from the dictionary
    algo_func = algo_funcs.get(algorithm)
    if algo_func is None:
        raise ValueError(f"Unsupported algorithm: {algorithm}")
    
    # Flatten the DataFrame to a list
    lookup_array = lookup_array_df.values.flatten().tolist()
    
    # Check if lookup_value is a DataFrame
    if isinstance(lookup_value, pd.DataFrame):
        lookup_value_list = lookup_value.values.flatten().tolist()
    else:
        lookup_value_list = [lookup_value]
    
    results = [] 
    for lookup_value_item in lookup_value_list:
        # Calculate similarity scores and round to 2 decimal places
        scores = [(index + 1, round(algo_func(lookup_value_item, item), 2)) for index, item in enumerate(lookup_array)]
        
        # Sort based on scores in descending order
        scores.sort(key=lambda x: x[1], reverse=True)
        # Append the top index and score to results as a list
        results.append(list(scores[0]))

    # results is 2D list, e.g. [[1, 0.75], [2, 0.85]]
    return results

nltk_distance(arg1, arg2, arg3)
```

The `nltk_distance` function takes three arguments:

- `lookup_value`: The string or DataFrame to search for, e.g. "apple" or `pd.DataFrame(["apple", "banana"])`.
- `lookup_array_df`: The DataFrame to search within, e.g. `pd.DataFrame(["apples", "bananas", "cherries"])`.
- `algorithm`: The algorithm to use for calculating similarity. Options are `'levenshtein'`, `'jaccard'`, and `'jaro'`. 

The function returns a list of lists, where each sublist contains the index (1-based), similar to `XMATCH`, and the similarity score of the most similar item in the `lookup_array`. For example, `[[1, 0.75], [2, 0.85]]` indicates that the most similar item to the first `lookup_value` has an index of 1 and a similarity score of 0.75, and the most similar item to the second `lookup_value` has an index of 2 and a similarity score of 0.85.  This matches the array output expected by Excel.

## Use in Excel

### EXCEL PY()

In an Excel PY() cell, start by assigning the values of the function arguments `arg1, arg2, arg3` to the appropriate data in the workbook, then paste the function code below it. For example, if the range `A6:A10` contains the lookup values, the range `B6:B27` contains the lookup array, and the cell `C6` contains the algorithm name, we get the following in the Excel PY() cell:

```python
=PY(
arg1 = xl("A6:A10") # lookup_value
arg2 = xl("B6:B27") # lookup_array_df
arg3 = xl("C6") # algorithm

def nltk_distance(lookup_value, lookup_array_df, algorithm):
# ... function code omitted for brevity ...
    return results

nltk_distance(arg1, arg2, arg3)
)
```

### BOARDFLARE.RUNPY()

Assuming the code is contained in cell A1, we can get the same result using the `BOARDFLARE.RUNPY` function as follows:

```excel
=BOARDFLARE.RUNPY(A1, A6:A10, B6:B27, C6)
```

Since `nltk_distance` is in our functions library, you can call it using the path `text/fuzzy-match/nltk_distance.ipynb`, and the latest code will be downloaded and executed. For example:

```excel
=BOARDFLARE.RUNPY("text/fuzzy-match/nltk_distance.ipynb", A6:A10, B6:B27, C6)
```

One of the benefits of using the `BOARDFLARE.RUNPY` function is that we can further customize it in Excel using a LAMBDA function.  For example, if we want to set a similarity threshold, as follows:

```excel
=LAMBDA(lookup_value, lookup_array, [similarity_threshold], [algorithm],
    LET(
        threshold, IF(ISOMITTED(similarity_threshold), 0.7, similarity_threshold),
        algo, IF(ISOMITTED(algorithm), "jaccard", algorithm),
        result, BOARDFLARE.RUNPY("text/fuzzy-match/nltk_distance.ipynb", lookup_value, lookup_array, algo),
        index, INDEX(result, 1),
        score, INDEX(result, 2),
        IF(score >= threshold, index, "No match")
    )
)
```

## Conclusion

Fuzzy matching is a powerful tool for handling approximate string matching in various applications. The `nltk_distance` Python function provides a flexible and easy-to-use interface for performing fuzzy matching using different algorithms. It can be run efficiently in Excel using either the `Excel PY()` or `BOARDFLARE.RUNPY` functions, enabling users to leverage the power of Python within their Excel workbooks.