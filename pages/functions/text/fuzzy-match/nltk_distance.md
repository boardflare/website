---
title: nltk_distance
---

# `nltk_distance`

## Overview
The `nltk_distance` Python function uses the [NLTK library](https://www.nltk.org/) to calculate similarity scores between strings, returns an array containing the match index and similarity score.

| Task | Description | Boardflare RUNPY() | Excel PY() | Source Code | Demo Workbook |
|:----:|:------------|:-------:|:----------:|:-------:|:-------:|
| [Fuzzy Matching](https://www.boardflare.com/tasks/nlp/fuzzy-match) | Uses [`nltk`](https://github.com/nltk/nltk) library for similarity scoring with `jaccard`, `jaro`, and `levenshtein`. | âœ… | âœ… | [Download](https://functions.boardflare.com/notebooks/text/fuzzy-match/nltk_distance.ipynb) | [Open](https://boardflare.sharepoint.com/:x:/g/Eex47-3aoRlAjA23TOjQl0gB7RebmHahHklUzp6monsC7Q?e=x7EutP) |

## Usage

Compares `lookup_value` with each value in the `lookup_array` and returns the index of the closest match and a normalized similarity score (within a given algorithm) between 0 and 1 (higher is more similar)

```python
nltk_distance(lookup_value, lookup_array, algorithm)
```

Arguments:

| Argument        | Positional | Type           | Description                                                    |
|-----------------|------------|----------------|----------------------------------------------------------------|
| `lookup_value`  | arg1       | string or list | The string(s) to look up matches for                           |
| `lookup_array`  | arg2       | list           | Array of strings to search through for matches                 |
| `algorithm`     | arg3       | string         | The similarity algorithm to use (e.g. "jaccard", "levenshtein") |

Returns a list of lists containing the match results. Each inner list contains:

| Return Value | Type  | Description                                                         |
|--------------|-------|---------------------------------------------------------------------|
| Index        | int   | Index of the closest matching string (1-based)                      |
| Similarity   | float | Similarity score between 0-1 (higher = more similar)                |

### BOARDFLARE.RUNPY

```excel
=BOARDFLARE.RUNPY("text/fuzzy-match/nltk_distance.ipynb", lookup_value, lookup_array, algorithm)
```

Example usage to find closest match for a string:

```excel
=BOARDFLARE.RUNPY("text/fuzzy-match/nltk_distance.ipynb", "example", {"sample","test","example"}, "jaccard")
```


```python
%pip install nltk
```

    Requirement already satisfied: nltk in c:\users\brent\code\functions\venv\lib\site-packages (3.9.1)
    Requirement already satisfied: click in c:\users\brent\code\functions\venv\lib\site-packages (from nltk) (8.1.7)
    Requirement already satisfied: joblib in c:\users\brent\code\functions\venv\lib\site-packages (from nltk) (1.4.2)
    Requirement already satisfied: regex>=2021.8.3 in c:\users\brent\code\functions\venv\lib\site-packages (from nltk) (2024.9.11)
    Requirement already satisfied: tqdm in c:\users\brent\code\functions\venv\lib\site-packages (from nltk) (4.66.6)
    Requirement already satisfied: colorama in c:\users\brent\code\functions\venv\lib\site-packages (from click->nltk) (0.4.6)
    Note: you may need to restart the kernel to use updated packages.
    


```python
import pandas as pd
import json

# Setup globals similar to RUNPY function.
# Arrays must be in pandas DataFrame.
arg1 = pd.DataFrame(["sample", "exemplary", "sampler", "example"], columns=['needles'])
arg2 = pd.DataFrame(["samples", "exemplar", "sample", "examples"], columns=['haystack'])
arg3 = 'jaccard'

# Serialize the arguments for loading into the demo workbook
args = {
    "arg1": arg1.values.tolist(),
    "arg2": arg2.values.tolist(),
    "arg3": arg3,
}
json.dumps(args)
```




    '{"arg1": [["sample"], ["exemplary"], ["sampler"], ["example"]], "arg2": [["samples"], ["exemplar"], ["sample"], ["examples"]], "arg3": "jaccard"}'




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




    [[3, 1.0], [2, 0.88], [3, 0.83], [4, 0.86]]




```python
# List of algorithms to test
algorithms = ['jaccard', 'levenshtein', 'jaro']

# Example needle and haystack DataFrame
needle = "sampler"
haystack_df = pd.DataFrame(["sample", "example", "sampling", "test"])

# Calculate results for each algorithm
results = [['Algorithm', 'Closest Match', 'Score']]
for algo in algorithms:
    match, score = nltk_distance(needle, haystack_df, algo)[0]
    results.append([algo, match, float(score)])

# Return results as a nested list with headers
results
```




    [['Algorithm', 'Closest Match', 'Score'],
     ['jaccard', 1, 0.83],
     ['levenshtein', 1, 0.86],
     ['jaro', 1, 0.95]]


