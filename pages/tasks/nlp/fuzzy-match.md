# Fuzzy Match

## Overview

Fuzzy matching searches for text in the Search range (aka the "needles") in the Reference range (aka the "haystack"). It returns the closest matching text from the Reference range along with a similarity score. This is useful for finding similar text in a large dataset, such as finding potential duplicates in a CRM or customer list.

This is intended for finding similar words or short sequences of words (e.g. names of people, companies, products) within a given text, not for assessing the semantic similarity of an entire sentence or paragraph.  For example, searching for the word "Microsoft" in a list of companies, and finding "Microsoft Corporation" or "Microsoft Inc.".

## Fuzzy Match for Excel

Link below is a placeholder, the extension is not yet available in the Microsoft AppSource store.

<a href="https://appsource.microsoft.com/en-us/product/office/WA200006918?tab=Overview">
    <img 
        src="/images/MS_AppSource.png" 
        alt="AppSource"
        style="padding-top: 10px; width: 200px;"
    />
</a>

This app is free for unlimited use.

### Basic Usage
- Once installed, open sidebar by clicking on Fuzzy Match icon 🧮 in the Excel ribbon.
- The tool compares two ranges of cells, but think of it like searching for each cell in the **Search** range (the "needles") in every cell in **Reference** range (the "haystack").  
- The **Search** range should be the smaller of the two ranges, as the algorithm is more efficient working this way.
- For example, if you are trying to see if a list of new customer leads are already in your CRM, the **Search** range would be the new leads (e.g. 25 cells), and the **Reference** range would be all the companies in your CRM (e.g. 5000 cells).
- In the workbook, select a range of cells to use for the **Search** range, and click **Get Range** to load the values.  Note that once the data is loaded, it won't be refreshed until you click **Get Range** again.  So if you change the data in the cells, you will need to click **Get Range** again.

![Excel Select Search Range](/images/excel-fuzzy-select-search.png)

- Repeat the same process for the Reference range, which is the one that will be used to create potential Reference for the Search range.

![Excel Select Reference Range](/images/excel-fuzzy-select-reference.png)

- Only text cells in either range will be processed, others will be ignored.
- Click **Analyze** to start the analysis.  A progress bar will be displayed in the sidebar to show the progress.  Only one analysis can be run at a time, the Analyze button will be disabled until the first analysis is complete.
- The output will be generated in a new sheet.  The first column will be a copy of the Search range, with the header "Search values". The second column will contain Reference from the other range, with the header "Matches from Reference".  The third column is a similarity score.

![Excel Results](/images/excel-fuzzy-output.png)

- Click **Cancel** at any time to stop the processing.

### Joining with XLOOKUP

Once you have the output sheet with matches, you can use the [XLOOKUP function](https://support.microsoft.com/en-us/office/xlookup-function-b7fd680e-6d10-43e6-84f9-88eae8bf5929) to join your data.  For example, if you have a list of new leads and you want to see if they are already in your CRM, you can use XLOOKUP to find the company name in the CRM and return the company ID.  

Here's a step-by-step example with formulas:

1. **New Leads** sheet:  This is the sheet with the new leads you want to check against your CRM.  Let's say the new lead company name is in column A, column B should be the matching name from the CRM, and column C should contain the company ID from your CRM.

2. **CRM** sheet: This is the sheet with all the companies in your CRM.  Let's say the company name is in column A, and the company ID is in column B.

3. **Fuzzy Match Output** sheet: This is the sheet with the output from the Fuzzy Match tool.  The fuzzy match was done using column A of the New Leads sheet as the search range, and column A of the CRM sheet as the Reference range.  The output sheet has the Search values in column A (which came from column A in the New Leads sheet), the Matches from Reference are in column B, and the match similarity score is in column C.

4. In the **New Leads** sheet, in column B, first find the matching company name from the Fuzzy Match Output sheet using the following formula

```excel
=XLOOKUP(A2, 'Fuzzy Match Output'!A:A, 'Fuzzy Match Output'!B:B)
```

This formula will find the matching company name from the CRM in the Fuzzy Match Output sheet.

5. In column C, find the company ID from the CRM using the following formula

```excel
=XLOOKUP(B2, CRM!A:A, CRM!B:B)
```

This formula will find the company ID from the CRM sheet based on the matching company name found in step 4.

6. Copy these formulas down for all the rows in the New Leads sheet.

7. Now you have a list of new leads with the matching company ID from your CRM.

## Algorithms

Fuzzy matching algorithms are designed to find approximate matches for a given search term or pattern. They are used when the matches do not have to be exact. There are several algorithms used in fuzzy matching, and here are a few commonly used ones:

### Levenshtein Distance

The Levenshtein distance is a string metric for measuring the difference between two sequences. It calculates the minimum number of single-character edits (insertions, deletions or substitutions) required to change one word into the other. 

For example, the Levenshtein distance between "Microsoft" and "Microsoft, Inc" is 5, since the following five edits change one into the other, and there is no way to do it with fewer than five edits:

1. Microsoft -> Microsoft, (insert "," after "t")
2. Microsoft, -> Microsoft,  (insert " " after ",")
3. Microsoft,  -> Microsoft, I (insert "I" after " ")
4. Microsoft, I -> Microsoft, In (insert "n" after "I")
5. Microsoft, In -> Microsoft, Inc (insert "c" after "n")

The Levenshtein distance can be used to calculate the similarity between two strings by normalizing the distance based on the number of changes and the length of the longest string. A lower distance indicates a higher similarity between the strings.  In the example above, the similarity would be 1 - (5 / 14) = 0.64.

### Jaccard Index

The Jaccard index, also known as the Jaccard similarity coefficient, is a measure of similarity between two sets. It is defined as the size of the intersection divided by the size of the union of the two sets. In the context of fuzzy matching, it can be used to compare the similarity between two strings by treating them as sets of characters.

The formula for the Jaccard Index is:

$$ J(A, B) = \frac{|A \cap B|}{|A \cup B|} $$

Where:
- $A$ and $B$ are the two sets.
- $|A \cap B|$ is the size of the intersection of the sets.
- $|A \cup B|$ is the size of the union of the sets.

For example, let's calculate the Jaccard index between "Microsoft" and "Microsoft, Inc.":

1. Define the sets:
    - Set $A$ is {"M", "i", "c", "r", "o", "s", "o", "f", "t"} (the characters in "Microsoft").
    - Set $B$ is {"M", "i", "c", "r", "o", "s", "o", "f", "t", ",", " ", "I", "n", "c"} (the characters in "Microsoft, Inc").

2. The intersection of the two sets is the characters overlapping, or {"M", "i", "c", "r", "o", "s", "o", "f", "t"}, so $|A \cap B| = 9$.
3. The union of the two sets is the combined characters {"M", "i", "c", "r", "o", "s", "o", "f", "t", ",", " ", "I", "n", "c"}, so $|A \cup B| = 14$.

Substituting these values into the formula gives:

$$ J(A, B) = \frac{9}{14} \approx 0.64 $$

So, the Jaccard index between "Microsoft" and "Microsoft, Inc." is approximately 0.64.

### Jaro-Winkler Similarity

The Jaro-Winkler similarity measure is a type of edit distance that rewards strings that have the same prefix. It is a variant of the Jaro distance metric and mainly used in the area of record linkage (duplicate detection). The higher the Jaro-Winkler similarity score, the more similar the strings are.

### Soundex

Soundex is a phonetic algorithm for indexing names by sound, as pronounced in English. The goal is for homophones to be encoded to the same representation so that they can be matched despite minor differences in spelling. This algorithm is useful in situations where two strings might sound the same, but are spelled differently.

These algorithms can be used individually or in combination, depending on the specific requirements of the fuzzy matching task.

## Changelog

1.0.0 - 2024-05-17
- Initial version for Excel.