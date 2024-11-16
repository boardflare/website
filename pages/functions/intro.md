---
title: intro
---

This is a [Jupyter](https://jupyterlab.readthedocs.io/en/latest/user/notebook.html) notebook which enables you to edit and run Python code in your web browser using the same [Pyodide](https://pyodide.org/en/stable/) Python runtime as the `BOARDFLARE.RUNPY` function in Excel, so any code that works here should work thereðŸ¤ž.

Below are some simple examples to get you started.


```python
# Set global variables as RUNPY does when passed scalar values.
arg1 = 2
arg2 = 3
```


```python
# Adds two numbers.
def add_numbers(a, b):
    return a + b

add_numbers(arg1, arg2)
```




    5




```python
# Set global variables as RUNPY does when passed array values.
import pandas as pd
arg1 = pd.DataFrame([[1, 2, 3]])
arg2 = 3
```


```python
# Converts arg1 to 2D list and add arg2 to each element
def add_to_each_element(arg1, arg2):
    return [[element + arg2 for element in row] for row in arg1.values.tolist()]

add_to_each_element(arg1, arg2)
```




    [[4, 5, 6]]


