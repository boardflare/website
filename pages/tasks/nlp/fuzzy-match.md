# Fuzzy Match

Fuzzy matching searches for text in the Search range (aka the "needles") in the Reference range (aka the "haystack"). It returns the closest matching text from the Reference range along with a similarity score. 

## Get Started

### Excel

Link below is a placeholder, the extension is not yet available in the Microsoft AppSource store.

<a href="https://appsource.microsoft.com/en-us/product/office/WA200006918?tab=Overview">
    <img 
        src="/images/MS_AppSource.png" 
        alt="AppSource"
        style="padding-top: 10px; width: 200px;"
    />
</a>

## Pricing
Free for unlimited use.

## Instructions

### Basic Usage
- Once installed, open sidebar by clicking on Fuzzy Match button in Excel ribbon.
- The tool compares two ranges of cells, but think of it like searching for each cell in the **Search** range (the "needles") in every cell in **Reference** range (the "haystack").  
- The **Search** range should be the smaller of the two ranges, as the algorithm is more efficient working this way.
- For example, if you are trying to see if a list of new customer leads are already in your CRM, the **Search** range would be the new leads (e.g. 25 cells), and the **Reference** range would be all the companies in your CRM (e.g. 5000 cells).
- In the workbook, select a range of cells to use for each range, and click **Get Range** to load the values.  Note that once the data is loaded, it won't be refreshed until you click **Get Range** again.  So if you change the data in the cells, you will need to click **Get Range** again.
- Repeat the same process for the Reference range, which is the one that will be used to create potential Reference for the Search range.
- Only text cells in either range will be processed, others will be ignored.
- click **Analyze** to start the analysis.  A progress bar will be displayed in the sidebar to show the progress.  Only one analysis can be run at a time, the Analyze button will be disabled until the first analysis is complete.
- The output will be generated in a new sheet.  The first column will be a copy of the Search range, with the header "Search values". The second column will contain Reference from the other range, with the header "Matches from Reference".  The third column is a similarity score.
- click **Cancel** at any time to stop the processing.

### Joining Data

Once you have the output sheet with matches, you can use XLOOKUP to join the data back to the original Search range.