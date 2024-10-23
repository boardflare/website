# nltk_distance

Uses the Python [nltk](https://www.nltk.org/) library which implements various distance algorithms to calculate the similarity between two strings.

## Usage

### Demo Workbook

See this [workbook](https://whistlernetworks.sharepoint.com/:x:/s/Boardflare/Eb_nCI4mR6tImGx_S1hPVs8B4UYmrJRrkk0_Grai6A4adg?e=xfUuNQ) for demos of all fuzzy matching functions.

### BOARDFLARE.RUNPY

`nltk_distance` compares `lookup_value(s)` with a `lookup_array` and returns the index of the closest match and a normalized similarity score (within a given algorithm) between 0 and 1 (higher is more similar). It is basically a fuzzy matching version of Excel's `XMATCH` function.

```excel
=BOARDFLARE.RUNPY("text/fuzzy/nltk_distance.ipynb", lookup_value(s), lookup_array, algorithm)
```

| Argument         | Positional | Type            | Description                                                                 |
|------------------|------------|-----------------|-----------------------------------------------------------------------------|
| `lookup_value(s)`| arg1       | string or list  | String(s) to compare with the strings in the `lookup_array`.                |
| `lookup_array`   | arg2       | list            | A list of strings to compare with the `lookup_value`.                       |
| `algorithm`      | arg3       | string          | Specifies the [algorithm](#algorithms) to use for similarity calculation.   |

Returns an array with two columns:

| Return Value | Type  | Description                                                                                  |
|--------------|-------|----------------------------------------------------------------------------------------------|
| Index        | int   | Index of the closest matching string in the `lookup_array` to each `lookup_value`.           |
| Similarity   | float | The similarity score between 0 and 1, where a higher score indicates more similarity.        |

For example, to calculate the similarity between the string `"example"` and an array constant `{"samples", "exemplar", "sample", "examples"}` using the Jaccard algorithm, you would use the following formula, which returns `1, 0.83`, which is `sample`.

```excel
=BOARDFLARE.RUNPY("text/fuzzy/nltk_distance.ipynb", "example", {"samples", "exemplar", "sample", "examples"}, "jaccard")
```

### Excel PY

Define the function in a cell at the beginning of your workbook by pasting the following code into a `PY` cell:

```python
import pandas as pd
import nltk
from nltk.metrics.distance import edit_distance, jaccard_distance, jaro_similarity
from nltk.util import ngrams

def nltk_distance(needle, haystack_df, algorithm='jaccard'):
    """
    Calculate the similarity between a needle and a haystack using various distance algorithms.

    Parameters:
    needle (str or pd.DataFrame): The string or DataFrame to search for.
    haystack_df (pd.DataFrame): The DataFrame to search within.
    algorithm (str): The algorithm to use for calculating similarity. Options are 'levenshtein', 'jaccard', and 'jaro'. Default is 'jaccard'.

    Returns:
    list: A list of lists where each sublist contains the index (1-based) and the similarity score of the most similar item in the haystack.
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
    haystack = haystack_df.values.flatten().tolist()
    
    # Check if needle is a DataFrame
    if isinstance(needle, pd.DataFrame):
        needle_list = needle.values.flatten().tolist()
    else:
        needle_list = [needle]
    
    results = [] 
    for needle_item in needle_list:
        # Calculate similarity scores and round to 2 decimal places
        scores = [(index + 1, round(algo_func(needle_item, item), 2)) for index, item in enumerate(haystack)]
        
        # Sort based on scores in descending order
        scores.sort(key=lambda x: x[1], reverse=True)
        # Append the top index and score to results as a list
        results.append(list(scores[0]))

    # results is 2D list, e.g. [[1, 0.75], [2, 0.85]]
    return results
```
You can then use the function in your workbook as many times as you need to with another `PY` cell that passes the arguments to the function:

```python
nltk_distance(xl("A1"), xl("B1:B20"), "jaro")
```

## LAMBDAs

These functions are similar to the `XMATCH` and `XLOOKUP` functions in Excel, but with the added ability to set a similarity threshold.

### FUZZYMATCH.NLTK

Provides features similar to `XMATCH`, but with the ability to set a similarity threshold and algorithm. The default algorithm is `jaccard` and similarity_threshold is `0.7`.

```excel
=LAMBDA(lookup_value, lookup_array, [similarity_threshold], [algorithm],
    LET(
        threshold, IF(ISOMITTED(similarity_threshold), 0.7, similarity_threshold),
        algo, IF(ISOMITTED(algorithm), "jaccard", algorithm),
        result, BOARDFLARE.RUNPY("text/fuzzy/nltk_distance.ipynb", lookup_value, lookup_array, algo),
        index, INDEX(result, 1),
        score, INDEX(result, 2),
        IF(score >= threshold, index, "No match")
    )
)

```excel
=FUZZYMATCH.NLTK(A1, B1:B10, 0.8)
```

### FUZZYLOOKUP.NLTK

Provides features similar to `XLOOKUP`, with the ability to return a row from a `return_array`. Otherwise the same as `FUZZYMATCH.NLTK`.

```excel
=LAMBDA(lookup_value, lookup_array, return_array, [similarity_threshold], [algorithm],
    LET(
        threshold, IF(ISOMITTED(similarity_threshold), 0.7, similarity_threshold),
        algo, IF(ISOMITTED(algorithm), "jaccard", algorithm),
        result, BOARDFLARE.RUNPY("text/fuzzy/nltk_distance.ipynb", lookup_value, lookup_array, algo),
        index, INDEX(result, 1),
        score, INDEX(result, 2),
        IF(score >= threshold, INDEX(return_array, index), "No match")
    )
)
```

```excel
=FUZZYLOOKUP.NLTK(A1, B1:B10, C1:E10, 0.8, "jaccard")
```

## Similarity Algorithms

The similarity algorithms available in `nltk` are given in the tables below.

### Edit Distance

| Algorithm            | Description                                                                 |
|----------------------|-----------------------------------------------------------------------------|
| `levenshtein`        | Calculates the minimum number of single-character edits required to change one word into the other. |
| `jaro`               | Measures similarity between two strings, giving more weight to common prefixes. |

### Token

| Algorithm            | Description                                                                 |
|----------------------|-----------------------------------------------------------------------------|
| `jaccard`            | Measures similarity between finite sample sets. |