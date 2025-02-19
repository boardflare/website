---
title: azure_sentiment
---

# `azure_sentiment`

## Overview
Uses the [Azure AI Language](https://learn.microsoft.com/en-us/azure/ai-services/language-service/sentiment-opinion-mining/overview?tabs=prebuilt) service to analyze sentiment and opinions in the provided documents. It returns an array containing the sentiment analysis results with sentiment polarity at the document, sentence, and aspect levels. It also provides the opinions used at the aspect level.

- General information on [Sentiment Analysis](https://www.boardflare.com/tasks/nlp/sentiment).
- Function [Source Code](https://functions.boardflare.com/notebooks/text/sentiment-analysis/azure_sentiment.ipynb) in Jupyter Notebook format.
- Excel [Demo Workbook](https://boardflare.sharepoint.com/:x:/g/EWrpNlA7uP1Ip1Kb1D4RW5IBQT3x1IXBjBiy4eFymsOaXw?e=SynNrC) with examples.

## Usage

```excel
=BOARDFLARE.RUNPY("text/sentiment-analysis/azure_sentiment.ipynb", documents, azureai_key, azureai_url)
```

Arguments:

| Argument      | Positional | Type           | Description                                                                 |
|---------------|------------|----------------|-----------------------------------------------------------------------------|
| `documents`   | arg1       | string or list | The text documents to analyze. Can be a single string or a pandas DataFrame.|
| `azureai_key` | arg2       | string         | The Azure AI API key. e.g. 7920c673894d49d292de11a80d16572                  |
| `azureai_url` | arg3       | string         | The Azure AI API endpoint (e.g. https://boardflare-free.cognitiveservices.azure.com/)       |

Returns a list of lists containing the sentiment analysis results. Each inner list contains:

| Return Value     | Type  | Description                                                                                  |
|------------------|-------|----------------------------------------------------------------------------------------------|
| DocIndex         | int   | Document index (1-based).                                                                    |
| DSent            | string| Document sentiment.                                                                          |
| DPos             | float | Document confidence score (positive).                                                        |
| DNeu             | float | Document confidence score (neutral).                                                         |
| DNeg             | float | Document confidence score (negative).                                                        |
| Sentence         | string| Sentence text.                                                                               |
| SSent            | string| Sentence sentiment.                                                                          |
| SPos             | float | Sentence confidence score (positive).                                                        |
| SNeu             | float | Sentence confidence score (neutral).                                                         |
| SNeg             | float | Sentence confidence score (negative).                                                       |
| Aspect           | string| Target text.                                                                                 |
| ASent            | string| Target sentiment.                                                                            |
| APos             | float | Target confidence score (positive).                                                          |
| ANeg             | float | Target confidence score (negative).                                                          |
| Opinion          | string| Assessment text.                                                                             |
| OSent            | string| Assessment sentiment.                                                                        |
| OPos             | float | Assessment confidence score (positive).                                                      |
| ONeg             | float | Assessment confidence score (negative).                                                      |

## Lambda

You could wrap this in a user-friendly Excel named LAMBDA as follows:

```excel
=LAMBDA(documents,
    BOARDFLARE.RUNPY("text/sentiment-analysis/azure_sentiment.ipynb", documents, "your_azureai_key", "your_azureai_url")
)
```
Then call it as a named function:

```excel
=AZURE.SENTIMENT(A1:A10)
```

## Analysis Results

Sentiment labels (e.g. positive) are returned at the document, sentence, and aspect level, with a confidence score for each.  The labels are positive, negative, and neutral. At the document level, the mixed sentiment label also can be returned. The sentiment of the document is determined below:

| Sentence sentiment | Returned document label |
|--------------------|-------------------------|
| At least one `positive` sentence is in the document. The rest of the sentences are `neutral`. | `positive` |
| At least one `negative` sentence is in the document. The rest of the sentences are `neutral`. | `negative` |
| At least one `negative` sentence and at least one `positive` sentence are in the document. | `mixed` |
| All sentences in the document are `neutral`. | `neutral` |

Confidence scores range from 1 to 0. Scores closer to 1 indicate a higher confidence in the label's classification, while lower scores indicate lower confidence. For each document or each sentence, the predicted scores associated with the labels (positive, negative, and neutral) add up to 1. For more information, see the Responsible AI transparency note.

Each aspect and the corresponding opinion are extracted, also known as Aspect-based Sentiment Analysis, which provides more granular information about the opinions related to attributes of products or services in text. The API surfaces opinions as a target (noun or verb) and an assessment (adjective).

For example, if a customer leaves feedback about a hotel such as "The room was great, but the staff was unfriendly.", the following results will be returned as outlined in the table below:

| DocIndex | DSent   | DPos | DNeu | DNeg | Sentence                                      | SSent    | SPos | SNeu | SNeg | Aspect | ASent    | APos | ANeg | Opinion    | OSent    | OPos | ONeg |
|----------|---------|------|------|------|-----------------------------------------------|----------|------|------|------|--------|----------|------|------|------------|----------|------|------|
| 1        | negative| 0    | 0    | 1    | The room was great, but the staff was unfriendly. | negative | 0    | 0    | 1    | room   | positive | 1    | 0    | great      | positive | 1    | 0    |
| 1        | negative| 0    | 0    | 1    | The room was great, but the staff was unfriendly. | negative | 0    | 0    | 1    | staff  | negative | 0    | 1    | unfriendly | negative | 0    | 1    |

Notes:
- Document has "negative" sentiment
- First sentence about the room is positive with high confidence
- Second sentence about staff is negative with high confidence
- Aspect-level analysis correctly identifies "room" and "staff" as targets
- Associated opinions "great" and "unfriendly" are correctly matched to their aspects

![](https://learn.microsoft.com/en-us/azure/ai-services/language-service/sentiment-opinion-mining/media/opinion-mining.png)



```python
%pip install micropip
import micropip
import pandas as pd
import json
```


```python
# Documents to analyze (column array)
arg1 = pd.DataFrame([
    "The food and service were unacceptable. The concierge was nice, however.",
    "The rooms were clean and well maintained.",
    "The location is perfect but the staff was rude.",
])
# API key
arg2 = 'EheclBIlALVTiuDbYlS6zWzh7qi29VAezaQqZCtwa5vJYsL15IbiJQQJ99AKACYeBjFXJ3w3AAAaACOGZ9Zm'
# Endpoint
arg3 = 'https://boardflare-free.cognitiveservices.azure.com/'

# Serialize the arguments for loading into the demo workbook
args = {
    "arg1": arg1.values.tolist(),
    "arg2": arg2,
    "arg3": arg3,
}
json.dumps(args)
```




    '{"arg1": [["The food and service were unacceptable. The concierge was nice, however."], ["The rooms were clean and well maintained."], ["The location is perfect but the staff was rude."]], "arg2": "EheclBIlALVTiuDbYlS6zWzh7qi29VAezaQqZCtwa5vJYsL15IbiJQQJ99AKACYeBjFXJ3w3AAAaACOGZ9Zm", "arg3": "https://boardflare-free.cognitiveservices.azure.com/"}'




```python
await micropip.install(["azure-ai-textanalytics"])
from azure.ai.textanalytics import TextAnalyticsClient
from azure.core.credentials import AzureKeyCredential

# Example method for detecting sentiment and opinions in text 
def azure_sentiment(documents, language_key, language_endpoint):
    """
    Analyzes sentiment and opinions in the provided documents using Azure Text Analytics.

    Parameters:
    documents (str or DataFrame): The text documents to analyze. Can be a single string or a pandas DataFrame.
    language_key (str): The Azure Text Analytics API key.
    language_endpoint (str): The Azure Text Analytics API endpoint.

    Returns:
    list: A list of lists containing the sentiment analysis results. Each inner list contains:
        - Document index (1-based)
        - Document sentiment
        - Document confidence scores (positive, neutral, negative)
        - Sentence text
        - Sentence sentiment
        - Sentence confidence scores (positive, neutral, negative)
        - Target text
        - Target sentiment
        - Target confidence scores (positive, negative)
        - Assessment text
        - Assessment sentiment
        - Assessment confidence scores (positive, negative)
    """
    # Check if documents is a string, list, or DataFrame
    if isinstance(documents, str):
        documents = [documents]
    elif isinstance(documents, pd.DataFrame):
        documents = documents.values.flatten().tolist()  # Convert df to list

    # Authenticate the client using your key and endpoint 
    ta_credential = AzureKeyCredential(language_key)
    client = TextAnalyticsClient(
            endpoint=language_endpoint, 
            credential=ta_credential)

    result = client.analyze_sentiment(documents, show_opinion_mining=True)
    doc_result = [doc for doc in result if not doc.is_error]

    data = []

    for idx, document in enumerate(doc_result):
        for sentence in document.sentences:
            for mined_opinion in sentence.mined_opinions:
                target = mined_opinion.target
                for assessment in mined_opinion.assessments:
                    data.append([
                        idx + 1,  # 1-based index
                        document.sentiment,
                        document.confidence_scores.positive,
                        document.confidence_scores.neutral,
                        document.confidence_scores.negative,
                        sentence.text,
                        sentence.sentiment,
                        sentence.confidence_scores.positive,
                        sentence.confidence_scores.neutral,
                        sentence.confidence_scores.negative,
                        target.text,
                        target.sentiment,
                        target.confidence_scores.positive,
                        target.confidence_scores.negative,
                        assessment.text,
                        assessment.sentiment,
                        assessment.confidence_scores.positive,
                        assessment.confidence_scores.negative
                    ])
    return data

azure_sentiment(arg1, arg2, arg3)
```


```python
# Column headers to use in demo workbook.
headers = ["documents", "azureai_key", "azureai_url", "DocIndex", "DSent", "DPos", "DNeu", "DNeg", "Sentence", "SSent", "SPos", "SNeu", "SNeg", "Aspect", "ASent", "APos", "ANeg", "Opinion", "OSent", "OPos", "ONeg"]
json.dumps(headers)
```




    '["documents", "azureai_key", "azureai_url", "DocIndex", "DSent", "DPos", "DNeu", "DNeg", "Sentence", "SSent", "SPos", "SNeu", "SNeg", "Aspect", "ASent", "APos", "ANeg", "Opinion", "OSent", "OPos", "ONeg"]'


