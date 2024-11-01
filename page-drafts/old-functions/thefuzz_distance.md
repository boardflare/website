# thefuzz_distance

Uses the Python [thefuzz](https://github.com/seatgeek/thefuzz) library which implements a high-performance levenshtein algorithm, 10-20x faster than other libraries.  This is ideal if you are dealing with very large datasets.

See this [workbook](https://whistlernetworks.sharepoint.com/:x:/s/Boardflare/Eb_nCI4mR6tImGx_S1hPVs8B4UYmrJRrkk0_Grai6A4adg?e=xfUuNQ) for demos of all fuzzy matching functions.

## BOARDFLARE.RUNPY

Not available, as `thefuzz` is not a pure python package and is not part of the Pyodide Python runtime.

## Excel PY

Define the function in a cell at the beginning of your workbook. You can then use the function in your workbook as many times as you need to with another `PY` cell that passes the arguments to the function:

```python
thefuzz_distance(xl("A1"), xl("B1:B20"), "ratio")
```

## Similarity Algorithms

The `thefuzz` utilizes the `rapidfuzz` library which implements a high-performance version of the levenshtein algorithm, and returns this as a percentage similarity score, also known as a distance ratio, which ranges from 0 to 100.  We have divided this by 100 to get a similarity score between 0 and 1 in line with other algorithms.

| Algorithm            | Description                                                                 |
|----------------------|-----------------------------------------------------------------------------|
| `ratio`              | Calculates the ratio between two strings.              |
| `partial_ratio`      | Calculates the partial ratio between two strings.                           |
| `token_sort_ratio`   | Calculates the ratio after sorting the tokens in the strings.               |
| `token_set_ratio`    | Calculates the ratio after sorting and deduplicating the tokens in the strings. |