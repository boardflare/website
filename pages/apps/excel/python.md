---
title: Python for Excel
icon: python.png
---

# Python for Excel

Run Python code locally in Excel for free.

## Overview

Provides the ability to run Python code locally within Excel, enabling more powerful formulas and access to a vast array of open-source packages.

## Features

Key differences compared to the native Python in Excel:

🆓 Free with no Office 365 license required.<br>
🌐 Works in Excel for web as well as desktop.<br>
☁️ Runtime has network access for API calls, etc.<br>
📦 Import custom packages, within limits (coming soon).<br>
🔒 Runs locally, so no data is shared outside Excel.<br>
🚀 Performance is only limited by your CPU.<br>

## Functions

These are the initial functions provided. The `PY` function allows you to execute Python code with optional input data.  See our [example workbook](https://whistlernetworks.sharepoint.com/:x:/s/Boardflare/EejrDLsCMzBFoY2r-QWdu5MB_6spaJau_Lbu4zWcHg_-HQ?e=9E70aL) for usage.

### PY

=<code>BOARDFLARE.PY(code, [inputs])</code><br>
<code>code:</code> Python code to execute.<br>
<code>inputs:</code> Optional range of global variables the code will have access to.<br>
E.g., to execute Python code in cell A1 with inputs from cells B1 to B5:<br>
<code>=BOARDFLARE.PY(A1, B1:B5)</code><br>

## Applications

Use for advanced data analysis, custom calculations, and leveraging Python libraries directly within Excel.

## Attribution

This add-in would not be possible without [Pyodide](https://github.com/pyodide/pyodide).

## Installation

Install from the Microsoft AppSource store at the link below, or directly from Excel.

<a href="https://appsource.microsoft.com/en-us/product/office/WA200007427?tab=Overview">
    <img 
        src="/images/MS_AppSource.png" 
        alt="AppSource"
        style="padding-top: 10px; width: 200px;"
    />
</a>