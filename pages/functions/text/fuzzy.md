# Fuzzy Matching

[Fuzzy matching](/tasks/nlp/fuzzy-match) compares a string to a list of strings and returning the closest match.

## Python Functions

### fuzzy

Uses the Python [textdistance](https://github.com/life4/textdistance) package which implements edit, token, sequence, and phonetic algorithms. 

`fuzzy` is similar to the spreadsheet `XMATCH` function, comparing a `lookup_value` with a `lookup_array` and returning the index of the closest match from the `lookup_array` together with a normalized similarity score between 0 and 1 (higher is more similar).

```excel
=BOARDFLARE.PY("text/fuzzy.ipynb", lookup_value, lookup_array, algorithm)
```

| Argument       | Positional | Type   | Description                                                   |
|----------------|------------|--------|---------------------------------------------------------------|
| `lookup_value` | data1      | string | A single string to compare against the list of strings.       |
| `lookup_array` | data2      | list   | A list of strings to compare with the `lookup_value`.         |
| `algorithm`    | data3      | string | Specifies the algorithm to use for similarity calculation.  See the available algorithms [below](#algorithms).   |

Returns a list with two elements:

| Return Value      | Type   | Description                                                                 |
|-------------------|--------|-----------------------------------------------------------------------------|
| Index             | int    | Index of the closest matching string in the `lookup_array` to the `lookup_value`. |
| Similarity        | float  | The similarity score between 0 and 1, where a higher score indicates more similarity. The similarity score is only a relative measure within a single algorithm. E.g. a similarity of 0.7 with Jaccard could be more similar than 0.8 with Levenshtein|

For example, to calculate the similarity between the string `"example"` and a list of strings `"samples", "exemplar", "sample", "examples"` using the Jaccard algorithm, you would use the following formula, which returns `1, 0.875`, which is `exemplar`.  Note that `examples` also has the same score, but `exemplar` is the first match in the list.

```excel
=BOARDFLARE.PY("text/fuzzy/textdistance.ipynb", "example", {"samples", "exemplar", "sample", "examples"}, "jaccard")
```

## LAMBDA Functions

### FUZZYMATCH

Similar to `XMATCH`, extends `fuzzy` Python function to provide the ability to set a similarity threshold. The default algorithm is `levenshtein` and similarity_threshold is `0.7`.

```excel
=LAMBDA(lookup_value, lookup_array, [similarity_threshold], [algorithm],
    LET(
        threshold, IF(ISOMITTED(similarity_threshold), 0.7, similarity_threshold),
        algo, IF(ISOMITTED(algorithm), "levenshtein", algorithm),
        result, BOARDLARE.PY("text/fuzzy.ipynb", lookup_value, lookup_array, algo),
        index, INDEX(result, 1),
        score, INDEX(result, 2),
        IF(score >= threshold, index, "No match")
    )
)

```excel
=FUZZYMATCH("example", {"samples", "exemplar", "sample", "examples"})
```

### FUZZYLOOKUP

Similar to `XLOOKUP`, extends `fuzzy` Python function to provide the ability to return a row from `return_array`. The default algorithm is `levenshtein` and similarity_threshold is `0.7`.

```excel
=LAMBDA(lookup_value, lookup_array, return_array, [similarity_threshold], [algorithm],
    LET(
        threshold, IF(ISOMITTED(similarity_threshold), 0.7, similarity_threshold),
        algo, IF(ISOMITTED(algorithm), "levenshtein", algorithm),
        result, BOARDLARE.PY("text/fuzzy.ipynb", lookup_value, lookup_array, algo),
        index, INDEX(result, 1),
        score, INDEX(result, 2),
        IF(score >= threshold, INDEX(return_array, index), "No match")
    )
)
```

```excel
=FUZZYLOOKUP("example", {"samples", "exemplar", "sample", "examples"}, {"A", "B", "C", "D"})
```

## Similarity Algorithms

Descriptions of the available algorithms are given in the tables below.

### Edit

| Algorithm            | Description                                                                 |
|----------------------|-----------------------------------------------------------------------------|
| [`damerau_levenshtein`](https://en.wikipedia.org/wiki/Damerau%E2%80%93Levenshtein_distance) | Similar to Levenshtein but considers transpositions as a single edit. $d_{DL}(a,b)$ |
| [`hamming`](https://en.wikipedia.org/wiki/Hamming_distance)            | Measures the number of positions at which the corresponding symbols are different. $d_{H}(a,b)$ |
| [`levenshtein`](https://en.wikipedia.org/wiki/Levenshtein_distance)        | Calculates the minimum number of single-character edits required to change one word into the other. $d_{L}(a,b)$ |
| [`jaro`](https://en.wikipedia.org/wiki/Jaro%E2%80%93Winkler_distance)               | Measures similarity between two strings, giving more weight to common prefixes. $J(a,b)$ |
| [`jaro_winkler`](https://en.wikipedia.org/wiki/Jaro%E2%80%93Winkler_distance)       | An extension of Jaro, giving more weight to strings that match from the beginning. $JW(a,b)$ |
| [`lcsseq`](https://en.wikipedia.org/wiki/Longest_common_subsequence_problem)             | Measures the longest common subsequence. $LCS(a,b)$ |
| [`lcsstr`](https://docs.python.org/2/library/difflib.html#difflib.SequenceMatcher)             | Measures the longest common substring. $LCS(a,b)$ |
| [`ratcliff_obershelp`](https://en.wikipedia.org/wiki/Gestalt_Pattern_Matching) | Measures similarity based on the longest common subsequence. $RO(A, B)$ |
| [`strcmp95`](http://cpansearch.perl.org/src/SCW/Text-JaroWinkler-0.1/strcmp95.c)           | A string comparison algorithm developed by the U.S. Census Bureau. $strcmp95(a,b)$ |
| [`needleman_wunsch`](https://en.wikipedia.org/wiki/Needleman%E2%80%93Wunsch_algorithm)   | A dynamic programming algorithm for sequence alignment. $NW(a,b)$ |
| [`smith_waterman`](https://en.wikipedia.org/wiki/Smith%E2%80%93Waterman_algorithm)     | A dynamic programming algorithm for local sequence alignment. $SW(a,b)$ |
| [`gotoh`](http://bioinfo.ict.ac.cn/~dbu/AlgorithmCourses/Lectures/LOA/Lec6-Sequence-Alignment-Affine-Gaps-Gotoh1982.pdf)              | An extension of Needleman-Wunsch with affine gap penalties. $G(a,b)$ |

### Token

| Algorithm            | Description                                                                 |
|----------------------|-----------------------------------------------------------------------------|
| [`cosine`](https://en.wikipedia.org/wiki/Cosine_similarity)             | Measures the cosine of the angle between two non-zero vectors. $\cos(\theta) = \frac{A \cdot B}{\|A\| \|B\|}$ |
| [`jaccard`](https://en.wikipedia.org/wiki/Jaccard_index)            | Measures similarity between finite sample sets. $J(A, B) = \frac{\left\lvert A \cap B \right\lvert}{\left\lvert A \cup B \right\lvert}$ |
| [`overlap`](https://en.wikipedia.org/wiki/Overlap_coefficient)            | Measures the overlap coefficient between two sets. $O(A, B) = \frac{\left\lvert A \cap B \right\lvert}{\min(\left\lvert A \right\lvert, \left\lvert B \right\lvert)}$ |
| [`sorensen`](https://en.wikipedia.org/wiki/S%C3%B8rensen%E2%80%93Dice_coefficient)           | Measures similarity between two sets, based on the size of the intersection divided by the size of the union. $S(A, B) = \frac{2 \left\lvert A \cap B \right\lvert}{\left\lvert A \right\lvert + \left\lvert B \right\lvert}$ |
| [`sorensen_dice`](https://en.wikipedia.org/wiki/S%C3%B8rensen%E2%80%93Dice_coefficient)      | Similar to Sorensen, but uses Dice's coefficient. $SD(A, B) = \frac{2 \left\lvert A \cap B \right\lvert}{\left\lvert A \right\lvert + \left\lvert B \right\lvert}$ |
| [`dice`](https://en.wikipedia.org/wiki/S%C3%B8rensen%E2%80%93Dice_coefficient)               | Another name for Sorensen-Dice coefficient. $D(A, B) = \frac{2 \left\lvert A \cap B \right\lvert}{\left\lvert A \right\lvert + \left\lvert B \right\lvert}$ |
| [`tversky`](https://en.wikipedia.org/wiki/Tversky_index)            | A generalization of the Jaccard index. $T(A, B) = \frac{\left\lvert A \cap B \right\lvert}{\left\lvert A \cap B \right\lvert + \alpha \left\lvert A - B \right\lvert + \beta \left\lvert B - A \right\lvert}$ |

### Sequence

| Algorithm            | Description                                                                 |
|----------------------|-----------------------------------------------------------------------------|
| [`bag`](https://github.com/Yomguithereal/talisman/blob/master/src/metrics/bag.js)                | Measures bag similarity between two sequences                               |
| [`editex`](https://anhaidgroup.github.io/py_stringmatching/v0.3.x/Editex.html)             | Measures phonetic similarity between two sequences                          |
| [`mlipns`](http://www.sial.iias.spb.su/files/386-386-1-PB.pdf)             | Measures similarity using the MLIPNS algorithm                              |
| [`monge_elkan`](https://www.academia.edu/200314/Generalized_Monge-Elkan_Method_for_Approximate_Text_String_Comparison)        | A hybrid algorithm combining multiple similarity measures. $ME(a,b)$ |

### Phonetic

| Algorithm                                                                    | Description                                                                 |
|------------------------------------------------------------------------------|-----------------------------------------------------------------------------|
| [`mra`](https://en.wikipedia.org/wiki/Match_rating_approach)                 | Measures similarity using the MRA algorithm                                 |
| [`editex`](https://anhaidgroup.github.io/py_stringmatching/v0.3.x/Editex.html) | Measures similarity using the Editex algorithm                              |

### Simple

| Algorithm            | Description                                                                 |
|----------------------|-----------------------------------------------------------------------------|
| `identity`           | Measures if two strings are identical                                       |
| `length`             | Measures the length difference between two strings                          |
| `matrix`             | Measures similarity using a matrix                                          |
| `prefix`             | Measures similarity based on common prefix                                  |
| `postfix`            | Measures similarity based on common postfix                                 |