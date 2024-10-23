# thefuzz_distance

Uses the Python [thefuzz](https://github.com/seatgeek/thefuzz) library which implements a high-performance levenshtein algorithm, 10-20x faster than other libraries.  This is ideal if you are dealing with very large datasets.

## Usage

### Demo Workbook

See this [workbook](https://whistlernetworks.sharepoint.com/:x:/s/Boardflare/Eb_nCI4mR6tImGx_S1hPVs8B4UYmrJRrkk0_Grai6A4adg?e=xfUuNQ) for demos of all fuzzy matching functions.

### BOARDFLARE.RUNPY

Not available, as `thefuzz` is not a pure python package and is not part of the Pyodide Python runtime.

### Excel PY

Define the function in a cell at the beginning of your workbook by pasting the following code into a `PY` cell:

```python
import pandas as pd
from thefuzz import fuzz

def thefuzz_distance(needle, haystack_df, algorithm='ratio'):
    """
    Calculate the similarity between a needle and a haystack using various distance algorithms.

    Parameters:
    needle (str or pd.DataFrame): The string or DataFrame to search for.
    haystack_df (pd.DataFrame): The DataFrame to search within.
    algorithm (str): The algorithm to use for calculating similarity. Options are 'ratio', 'partial_ratio', 'token_sort_ratio', and 'token_set_ratio'. Default is 'ratio'.

    Returns:
    list: A list of lists where each sublist contains the index (1-based) and the similarity score of the most similar item in the haystack.
    """
    # Flatten the DataFrame to a list
    haystack = haystack_df.values.flatten().tolist()

    # Check if needle is a DataFrame
    if isinstance(needle, pd.DataFrame):
        needle_list = needle.values.flatten().tolist()
    else:
        needle_list = [needle]

    results = []
    for needle_item in needle_list:
        # Calculate similarity scores
        if algorithm == 'ratio':
            scores = [(index + 1, fuzz.ratio(needle_item, item) / 100) for index, item in enumerate(haystack)]
        elif algorithm == 'partial_ratio':
            scores = [(index + 1, fuzz.partial_ratio(needle_item, item) / 100) for index, item in enumerate(haystack)]
        elif algorithm == 'token_sort_ratio':
            scores = [(index + 1, fuzz.token_sort_ratio(needle_item, item) / 100) for index, item in enumerate(haystack)]
        elif algorithm == 'token_set_ratio':
            scores = [(index + 1, fuzz.token_set_ratio(needle_item, item) / 100) for index, item in enumerate(haystack)]
        else:
            raise ValueError(f"Unknown algorithm: {algorithm}")

        # Sort based on scores in descending order
        scores.sort(key=lambda x: x[1], reverse=True)
        # Append the top index and score to results as a list
        results.append(list(scores[0]))

    # results is 2D list, e.g. [[1, 0.75], [2, 0.85]]
    return results
```

You can then use the function in your workbook as many times as you need to with another `PY` cell that passes the arguments to the function:

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