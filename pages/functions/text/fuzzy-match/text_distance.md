---
title: text_distance
---

# `text_distance`

## Overview

| Task | Description | Boardflare RUNPY() | Excel PY() | Source Code | Demo Workbook |
|:----:|:------------|:-------:|:----------:|:-------:|:-------:|
| [Fuzzy Matching](https://www.boardflare.com/tasks/nlp/fuzzy-match) | Uses Python [textdistance](https://github.com/life4/textdistance) library which implements edit distance, token, sequence, and phonetic algorithms to calculate the similarity between strings. | âœ… | - | [Download](https://functions.boardflare.com/notebooks/text/fuzzy-match/nltk_distance.ipynb) | [Open](https://boardflare.sharepoint.com/:x:/g/EQ0Hv5J08J9LkKQeMD-_BG8BF6iZgIYCWrqnNOuE3d_m6g?e=5fDSf4) |

## Usage

Compares a `lookup_value` with each item in a `lookup_array` and returns the index of the closest match and a normalized similarity score between 0 and 1 (higher is more similar).

```excel
=BOARDFLARE.RUNPY("text/fuzzy-match/text_distance.ipynb", lookup_value, lookup_array, algorithm)
```

Arguments:

| Argument       | Positional | Type           | Description                                                                 |
|----------------|------------|----------------|-----------------------------------------------------------------------------|
| `lookup_value` | arg1       | string or list | String(s) to compare with the strings in the `lookup_array`.                |
| `lookup_array` | arg2       | list           | A list of strings to compare with the `lookup_value`.                       |
| `algorithm`    | arg3       | string         | Specifies the [similarity algorithm](#similarity-algorithms) to use.   |

Returns an array with two columns:

| Return Value | Type  | Description                                                                                  |
|--------------|-------|----------------------------------------------------------------------------------------------|
| Index        | int   | Index of the closest matching string in the `lookup_array` to each `lookup_value`.           |
| Similarity   | float | The similarity score between 0 and 1, where a higher score indicates more similarity.        |

## Lambda

These example Excel LAMBDA functions illustrate further customization and are similar to the `XMATCH` and `XLOOKUP` functions in Excel, but with the added ability to set a similarity threshold and return "No match" if the similarity score is below the threshold.

```excel
=LAMBDA(lookup_value, lookup_array, [similarity_threshold], [algorithm],
    LET(
        threshold, IF(ISOMITTED(similarity_threshold), 0.7, similarity_threshold),
        algo, IF(ISOMITTED(algorithm), "jaccard", algorithm),
        result, BOARDFLARE.RUNPY("text/fuzzy-match/text_distance.ipynb", lookup_value, lookup_array, algo),
        index, INDEX(result, 1),
        score, INDEX(result, 2),
        IF(score >= threshold, index, "No match")
    )
)
```

```excel
=LAMBDA(lookup_value, lookup_array, return_array, [similarity_threshold], [algorithm],
    LET(
        threshold, IF(ISOMITTED(similarity_threshold), 0.7, similarity_threshold),
        algo, IF(ISOMITTED(algorithm), "jaccard", algorithm),
        result, BOARDFLARE.RUNPY("text/fuzzy-match/text_distance.ipynb", lookup_value, lookup_array, algo),
        index, INDEX(result, 1),
        score, INDEX(result, 2),
        IF(score >= threshold, INDEX(return_array, index), "No match")
    )
)
```

## Similarity Algorithms

The similarity algorithms available in `textdistance` are given in the tables below.

### Edit Distance

| Algorithm            | Description                                                                 |
|----------------------|-----------------------------------------------------------------------------|
| [`damerau_levenshtein`](https://en.wikipedia.org/wiki/Damerau%E2%80%93Levenshtein_distance) | Similar to Levenshtein but considers transpositions as a single edit. |
| [`hamming`](https://en.wikipedia.org/wiki/Hamming_distance)            | Measures the number of positions at which the corresponding symbols are different. |
| [`levenshtein`](https://en.wikipedia.org/wiki/Levenshtein_distance)        | Calculates the minimum number of single-character edits required to change one word into the other. |
| [`jaro`](https://en.wikipedia.org/wiki/Jaro%E2%80%93Winkler_distance)               | Measures similarity between two strings, giving more weight to common prefixes. |
| [`jaro_winkler`](https://en.wikipedia.org/wiki/Jaro%E2%80%93Winkler_distance)       | An extension of Jaro, giving more weight to strings that match from the beginning. |
| [`lcsseq`](https://en.wikipedia.org/wiki/Longest_common_subsequence_problem)             | Measures the longest common subsequence. |
| [`lcsstr`](https://docs.python.org/2/library/difflib.html#difflib.SequenceMatcher)             | Measures the longest common substring. |
| [`ratcliff_obershelp`](https://en.wikipedia.org/wiki/Gestalt_Pattern_Matching) | Measures similarity based on the longest common subsequence. |
| [`strcmp95`](http://cpansearch.perl.org/src/SCW/Text-JaroWinkler-0.1/strcmp95.c)           | A string comparison algorithm developed by the U.S. Census Bureau. |
| [`needleman_wunsch`](https://en.wikipedia.org/wiki/Needleman%E2%80%93Wunsch_algorithm)   | A dynamic programming algorithm for sequence alignment. |
| [`smith_waterman`](https://en.wikipedia.org/wiki/Smith%E2%80%93Waterman_algorithm)     | A dynamic programming algorithm for local sequence alignment. |
| [`gotoh`](http://bioinfo.ict.ac.cn/~dbu/AlgorithmCourses/Lectures/LOA/Lec6-Sequence-Alignment-Affine-Gaps-Gotoh1982.pdf)              | An extension of Needleman-Wunsch with affine gap penalties. |

### Token

| Algorithm            | Description                                                                 |
|----------------------|-----------------------------------------------------------------------------|
| [`cosine`](https://en.wikipedia.org/wiki/Cosine_similarity)             | Measures the cosine of the angle between two non-zero vectors. |
| [`jaccard`](https://en.wikipedia.org/wiki/Jaccard_index)            | Measures similarity between finite sample sets. |
| [`overlap`](https://en.wikipedia.org/wiki/Overlap_coefficient)            | Measures the overlap coefficient between two sets. |
| [`sorensen`](https://en.wikipedia.org/wiki/S%C3%B8rensen%E2%80%93Dice_coefficient)           | Measures similarity between two sets, based on the size of the intersection divided by the size of the union. |
| [`sorensen_dice`](https://en.wikipedia.org/wiki/S%C3%B8rensen%E2%80%93Dice_coefficient)      | Similar to Sorensen, but uses Dice's coefficient. |
| [`dice`](https://en.wikipedia.org/wiki/S%C3%B8rensen%E2%80%93Dice_coefficient)               | Another name for Sorensen-Dice coefficient. |
| [`tversky`](https://en.wikipedia.org/wiki/Tversky_index)            | A generalization of the Jaccard index. |

### Sequence

| Algorithm            | Description                                                                 |
|----------------------|-----------------------------------------------------------------------------|
| [`bag`](https://github.com/Yomguithereal/talisman/blob/master/src/metrics/bag.js)                | Measures bag similarity between two sequences                               |
| [`mlipns`](http://www.sial.iias.spb.su/files/386-386-1-PB.pdf)             | Measures similarity using the MLIPNS algorithm                              |
| [`monge_elkan`](https://www.academia.edu/200314/Generalized_Monge-Elkan_Method_for_Approximate_Text_String_Comparison)        | A hybrid algorithm combining multiple similarity measures. $ME(a,b)$ |

### Phonetic

| Algorithm                                                                    | Description                                                                 |
|------------------------------------------------------------------------------|-----------------------------------------------------------------------------|
| [`mra`](https://en.wikipedia.org/wiki/Match_rating_approach)                 | Measures similarity using the MRA algorithm                                 |
| [`editex`](https://anhaidgroup.github.io/py_stringmatching/v0.3.x/Editex.html) | Measures similarity using the Editex algorithm                              |                              |


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
import textdistance
import pandas as pd

def text_distance(needle, haystack_df, algorithm='jaccard'):
    # Get the algorithm function from textdistance
    algo_func = getattr(textdistance, algorithm)
    # Flatten the DataFrame to a list
    haystack = haystack_df.values.flatten().tolist()
    
    # Check if needle is a DataFrame
    if isinstance(needle, pd.DataFrame):
        needle_list = needle.values.flatten().tolist()
    else:
        needle_list = [needle]
    
    results = [] 
    for needle_item in needle_list:
        # Calculate similarity scores with normalization and round to 2 decimal places
        # Adjust index to be 1-based
        scores = [(index + 1, round(algo_func.normalized_similarity(needle_item, item), 2)) for index, item in enumerate(haystack)]
        # Sort based on scores in descending order
        scores.sort(key=lambda x: x[1], reverse=True)
        # Append the top index and score to results as a list
        results.append(list(scores[0]))

    # results is 2D list, e.g. [[1, 0.75], [2, 0.85]]
    return results

text_distance(arg1, arg2, arg3)
```




    [[3, 1.0], [2, 0.89], [3, 0.86], [2, 0.88]]




```python
# List of algorithms to test
algorithms = [
    'jaccard', 'levenshtein', 'hamming', 'cosine', 'jaro', 'jaro_winkler', 
    'sorensen', 'ratcliff_obershelp', 'damerau_levenshtein', 'strcmp95', 
    'needleman_wunsch', 'smith_waterman', 'tversky', 'overlap', 'monge_elkan',
    'lcsseq', 'lcsstr', 'gotoh', 'sorensen_dice', 'dice', 'bag', 'editex', 
    'mlipns', 'mra'
]

# Example needle and haystack DataFrame
needle = "sampling"
haystack_df = pd.DataFrame(["sample", "example", "sampling", "test"])

# Calculate results for each algorithm
results = [['Algorithm', 'Closest Match', 'Score']]
for algo in algorithms:
    match, score = text_distance(needle, haystack_df, algo)[0]
    results.append([algo, match, float(score)])

# Return results as a nested list with headers
results
```




    [['Algorithm', 'Closest Match', 'Score'],
     ['jaccard', 3, 1.0],
     ['levenshtein', 3, 1.0],
     ['hamming', 3, 1.0],
     ['cosine', 3, 1.0],
     ['jaro', 3, 1.0],
     ['jaro_winkler', 3, 1.0],
     ['sorensen', 3, 1.0],
     ['ratcliff_obershelp', 3, 1.0],
     ['damerau_levenshtein', 3, 1.0],
     ['strcmp95', 3, 1.0],
     ['needleman_wunsch', 3, 1.0],
     ['smith_waterman', 3, 1.0],
     ['tversky', 3, 1.0],
     ['overlap', 3, 1.0],
     ['monge_elkan', 3, 1.0],
     ['lcsseq', 3, 1.0],
     ['lcsstr', 3, 1.0],
     ['gotoh', 3, 1.0],
     ['sorensen_dice', 3, 1.0],
     ['dice', 3, 1.0],
     ['bag', 3, 1.0],
     ['editex', 3, 1.0],
     ['mlipns', 1, 1.0],
     ['mra', 3, 1.0]]


