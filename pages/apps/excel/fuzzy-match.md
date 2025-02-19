---
title: Fuzzy Match for Excel
---

# Fuzzy Match for Excel

Fuzzy matching versions of XMATCH and XLOOKUP, with unlimited free use.

## Overview

Provides functions FUZZY.LOOKUP and FUZZY.MATCH which are similar to the native Excel functions XLOOKUP and XMATCH, but are able to perform approximate text matching (aka fuzzy matching) of the lookup_value to the lookup_array or range.  Algorithms run in Excel so your data never leaves your spreadsheet, and you have unlimited free use.

<h3>FEATURES</h3>

🎯 Similar to XLOOKUP and XMATCH.<br>
🆓 Unlimited free use.<br>
🔒 No data is shared outside your spreadsheet.<br>
🚀 Fast algorithm handles large datasets.<br>
✅ Outputs lookup and match for quick comparison.<br>
<h3>FUNCTIONS</h3>

**FUZZY.MATCH** (like XMATCH, with fuzzy matching)<br>
➡️ Inputs: lookup_value, lookup_array, [threshold]<br>
⬅️ Outputs: Lookup, Match, Similarity, and Row as custom data type<br>
🔍 Searches for the lookup_value in the lookup_array using fuzzy text matching.<br>
🎚️ Threshold input lets you adjust how close the match must be.<br>
📅 Output is match row in lookup_array, use with INDEX(), etc.<br>

**FUZZY.LOOKUP** (like XLOOKUP, with fuzzy matching)<br>
➡️ Inputs: lookup_value, lookup_array, return_array, [threshold]<br>
⬅️ Outputs: Lookup, Match, Similarity, and values from matching row in return_array<br>
🔍 Searches for the lookup_value in the lookup_array using fuzzy text matching.<br>
🎚️ Threshold input lets you adjust how close the match must be.<br>
📅 Output return_array retrieves selected columns from the matching row.<br>

<h3>APPLICATIONS</h3>

<ul>
    <li><b>Find and remove duplicates</b>: Assuming you have a table with a column Name, using a formula like =BOARDFLARE.FUZZY.MATCH([@Name],FILTER([Name],ROW([Name]) <> ROW()),0.7) will enable you to see the most similar match in Name, other than @Name, which obviously matches perfectly.  This is done using FILTER([Name],ROW([Name]) <> ROW()) to create an array of all the rows except the current row.</li>
    <li><b>Match leads with your CRM</b>: If you have marketing leads and want to match them with companies already in your CRM, you can use FUZZY.LOOKUP where the lookup_value is the name of the company from the lead, and the lookup_array is the column of all of the companies in your CRM.  Setting the return_array to the CustomerID column in the CRM table will return the CustomerID for the matches to enable easy import to your CRM.  You can use a similar process to match the names of the leads with contacts in the CRM, since people don't use their business email address when filling out lead forms as that would just make the matching too easy.😉</li>
    <li><b>Find applicants in HR system</b>: Let's say you have a list of job applicants and you want to see which ones are already in your HR system.  Using FUZZY.LOOKUP, the lookup_value is the name of the applicant, and the lookup_array is all of the previous applicants from the HR system.  The return_array is the additional columns from the HR system you want retuned with a match (e.g. date of last application, last position applied for, etc.).</li>
    <li><b>Master Data Management (MDM)</b>: Fuzzy matching can be a powerful tool in MDM to identify and link related records across different systems or datasets. This can help in deduplicating, entity resolution, linking, cleansing, and standardizing data, thereby improving the overall quality of your master data.</li>
</ul>

<h3>LIMITATIONS</h3>

The main limitation of the current version is that the algorithm works better looking for substrings in lookup_array that match the lookup_value, than the reverse. For example, a lookup_value of "Microsoft" matches a lookup_array element of "Microsoft Corporation" with an almost perfect match similarity of 0.99, because "Microsoft" is a substring of "Microsoft Corporation".  However, when done in reverse, a lookup_value of "Microsoft Corporation" will only match a lookup_array element of "Microsoft" with 0.43 similarity. So where possible, try to use the shorter string as the lookup_value.  One way to achieve this is use Excel functions to remove words that are not needed for the matching (e.g. Corporation, Inc., etc.) from the lookup_value.

Also, remember that the accuracy of fuzzy matching, like most things in machine learning, might be awesome in one situation and useless in another.🙂

See <a href="https://www.boardflare.com/apps/excel/fuzzy-match">Fuzzy Match for Excel</a> on our website for more information.

## Installation

The Fuzzy Match tool is available for Excel on Windows, Mac, and the web.  It is available on the Microsoft AppSource store at the link below, or can be installed directly from Excel.

<a href="https://appsource.microsoft.com/en-us/product/office/WA200006970?tab=Overview">
    <img 
        src="/images/MS_AppSource.png" 
        alt="AppSource"
        style="padding-top: 10px; width: 200px;"
    />
</a>

## Functions

<div class="block">
    <details>
        <summary><b>=BOARDFLARE.FUZZY.MATCH</b></summary>
        <table>
            <tr>
                <th>Inputs</th>
                <th>Description</th>
            </tr>
            <tr>
                <td><b>lookup_value</b></td>
                <td>text to search for in the lookup_array</td>
            </tr>
            <tr>
                <td><b>lookup_array</b></td>
                <td>range of text cells containing possible matches</td>
            </tr>
            <tr>
                <td><b>threshold</b></td>
                <td>minimum similarity: 0 (anything) - 1 (exact match), default is 0.4</td>
            </tr>
        </table>
        <table>
            <tr>
                <th>Outputs</th>
                <th>Description</th>
            </tr>
            <tr>
                <td><b>Lookup</b></td>
                <td>original lookup_value</td>
            </tr>
            <tr>
                <td><b>Match</b></td>
                <td>best match found in the lookup_array</td>
            </tr>
            <tr>
                <td><b>Similarity</b></td>
                <td>similarity between the Lookup and the Match</td>
            </tr>
            <tr>
                <td><b>Row</b></td>
                <td>Row number of the match in lookup_array</td>
            </tr>
        </table>
    </details>
</div>

<div class="block">
    <details>
        <summary><b>=BOARDFLARE.FUZZY.LOOKUP</b></summary>
        <table>
            <tr>
                <th>Inputs</th>
                <th>Description</th>
            </tr>
            <tr>
                <td><b>lookup_value</b></td>
                <td>text to search for in the lookup_array</td>
            </tr>
            <tr>
                <td><b>lookup_array</b></td>
                <td>range of text cells containing possible matches</td>
            </tr>
            <tr>
                <td><b>return_array</b></td>
                <td>additional columns to return with match</td>
            </tr>
            <tr>
                <td><b>threshold</b></td>
                <td>minimum similarity: 0 (anything) - 1 (exact match), default is 0.4</td>
            </tr>
        </table>
        <table>
            <tr>
                <th>Outputs</th>
                <th>Description</th>
            </tr>
            <tr>
                <td><b>Lookup</b></td>
                <td>original lookup_value</td>
            </tr>
            <tr>
                <td><b>Match</b></td>
                <td>best match found in the lookup_array</td>
            </tr>
            <tr>
                <td><b>Similarity</b></td>
                <td>similarity between the Lookup and the Match</td>
            </tr>
            <tr>
                <td><b>Return Row</b></td>
                <td>matching row in return_array</td>
            </tr>
        </table>
    </details>
</div>

## Algorithm

The tool is currently using the [Bitap algorithm](https://en.wikipedia.org/wiki/Bitap_algorithm), which uses Levenshtein distance.  See [Fuzzy Matching](/tasks/nlp/fuzzy-match) for more details on other algorithms we are considering.

## FAQ

<details>
    <summary>How is the similarity calculated?</summary>
    Similarity is calculated based on the number of changes needed to get the two strings to match when being compared.
</details>

## Changelog

Here are the release notes.

1.1 - 2024-05-27 (current)
- Switched to using custom functions, FUZZY.MATCH and FUZZY.LOOKUP.

1.0 - 2024-05-15
- Initial version with task pane only.