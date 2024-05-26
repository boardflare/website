---
title: Fuzzy Match for Excel
---

# Fuzzy Match for Excel

Fuzzy matching versions of XMATCH and XLOOKUP, with unlimited free use.

## Overview

Provides functions FUZZY.LOOKUP and FUZZY.MATCH which are similar to the native Excel functions XLOOKUP and XMATCH, but are able to perform approximate text matching (aka fuzzy matching) of the lookup_value to the lookup_array or range.  Algorithms run in Excel so your data never leaves your spreadsheet, and you have unlimited free use.

<h3>FEATURES</h3>

<ul>
    <li>🎯Similar to XLOOKUP and XMATCH, easy to use.</li>
    <li>🆓Unlimited free use, no need for a subscription.</li>
    <li>🔒No data is shared outside your spreadsheet.</li>
    <li>🚀Fast algorithm handles large datasets.</li>
    <li>✅Outputs lookup and match for quick comparison.</li>
</ul>

<h3>FUNCTIONS</h3>

<b>FUZZY.MATCH</b> (like XMATCH, with fuzzy matching)
<ul>
    <li>➡️Inputs: lookup_value, lookup_array, [threshold]</li>
    <li>⬅️Outputs: Lookup, Match, Similarity, and Row as custom data type</li>
    <li>🔍Searches for the lookup_value in the lookup_array using fuzzy text matching.</li>
    <li>🎚️Threshold input lets you adjust how close the match must be.</li>
    <li>📅Output is match row in lookup_array, use with INDEX(), etc.</li>
</ul>

<b>FUZZY.LOOKUP</b> (like XLOOKUP, with fuzzy matching)
<ul>
    <li>➡️Inputs: lookup_value, lookup_array, return_array, [threshold]</li>
    <li>⬅️Outputs: Lookup, Match, Similarity, and values from matching row in return_array</li>
    <li>🔍Searches for the lookup_value in the lookup_array using fuzzy text matching.</li>
    <li>🎚️Threshold input lets you adjust how close the match must be.</li>
    <li>📅Output return_array retrieves selected columns from the matching row.</li>
</ul>

<h3>APPLICATIONS</h3>

<ul>
    <li><b>Find and remove duplicates</b>: Using FUZZY.MATCH with the same column as input for both the lookup_value and lookup_array, the output will be the fuzzy duplicates, and the rest of the rows will be blank. You can then easily delete the duplicate row(s) from your table.</li>
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

## Algorithm

The tool is currently using the [Bitap algorithm](https://en.wikipedia.org/wiki/Bitap_algorithm), which uses Levenshtein distance.  See [Fuzzy Matching](/tasks/nlp/fuzzy-match) for more details on other algorithms we are considering.

## FAQ

<details>
    <summary>How is the similarity calculated?</summary>
    Similarity is calculated based on the number of changes needed to get the two strings to match when being compared.
</details>

## Changelog

1.0.0 - 2024-05-15 (published to AppSource)
- Initial version with task pane only.