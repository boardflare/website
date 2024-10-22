## Jupyterlite

[Jupyterlite](https://jupyterlite.readthedocs.io/en/stable/_static/lab/index.html) runs in the browser using the same Pyodide Python kernal that this add-in is using, so any code that runs in Jupyterlite should run in Python for Excel.https://localhost:4000/jupyterlite/lab/index.html?path=intro.ipynb


You may notice some of our examples load code using a path such as `text/fuzzy_distance.ipynb` which is a Jupyter notebook file.  The code is extracted from the code cell in the notebook with a `function` tag.  This is experimental and currently only works when using Jupyterlite via Excel for Windows.