---
title: Python for Sheets
---

# Python for Sheets

## Overview

Provides and easy way to run Python in the sidebar of Google Sheets.  The Python code is executed locally and can access a range of data you provide. This is an initial minimalist release, and more features will be added in the future.

## Features

Some key features of the add-on are as follows:

🆓 Free, no license required.<br/>
☁️ Runtime has network access for API calls (needs CORS).<br/>
📦 Import custom packages (pure Python only).<br/>
🔒 Code is stored in your workbook and runs locally.<br/>

## Usage

Write or paste your Python code in the editor and click the `Run` button.  The code will be executed
locally and the output will be displayed in the output area.

If you want to use data from the sheet, select the range you wish to use in the sheet and click the the Get data button.  The data will be loaded to the `data` variable as a 2D list, even if only one cell is selected.

The value of the last expression in the code will be displayed in the output area.

## Privacy

See our [privacy policy](https://www.boardflare.com/company/privacy).

## Changelog

<details>
  <summary>1.0.0 - 2025-02-27</summary>
  - Initial release.
</details>

