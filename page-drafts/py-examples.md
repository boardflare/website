
| Code                                                                                  | var1       | pyout                     | Excel Output                      |
|---------------------------------------------------------------------------------------|------------|---------------------------|-----------------------------------|
| `total = sum(var1[0]); pyout = [[total], [total]]`                                   | `{1,2}`    | `[[3], [3]]`              | `3` in two consecutive cells in a column |
| `import numpy as np; total = np.sum(var1[0]).item(); pyout = [['Sales', total], ['Total', total]]` | `{1,2}`    | `[['Sales', 3], ['Total', 3]]` | `Sales` and `3` in one row, `Total` and `3` in the next row |
| `max_val = max(var1[0]); pyout = [[max_val], [max_val]]`                             | `{3,5,1}`  | `[[5], [5]]`              | `5` in two consecutive cells in a column |
| `import numpy as np; mean_val = np.mean(var1[0]).item(); pyout = [['Mean', mean_val], ['Average', mean_val]]` | `{4,6,8}`  | `[['Mean', 6.0], ['Average', 6.0]]` | `Mean` and `6.0` in one row, `Average` and `6.0` in the next row |
| `min_val = min(var1[0]); pyout = [['Min', min_val], ['Minimum', min_val]]`           | `{7,2,9}`  | `[['Min', 2], ['Minimum', 2]]` | `Min` and `2` in one row, `Minimum` and `2` in the next row |

