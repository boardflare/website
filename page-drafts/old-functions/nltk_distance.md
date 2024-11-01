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