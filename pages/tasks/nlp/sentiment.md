---
title: Sentiment Analysis
---

# Sentiment Analysis

## Get started
[Sentiment analysis](https://paperswithcode.com/task/sentiment-analysis) classifies text as having positive or negative overall sentiment, and is commonly used in customer support, market research, finance, etc.  Click on the buttons below to get started with the Excel or Sheets extension.

<div style="display: flex; justify-content: space-between;">
    <a href="https://appsource.microsoft.com/en-us/home">
        <img 
            src="/images/MS_AppSource.png" 
            alt="AppSource"
            style="padding-top: 10px; width: 200px;"
        />
    </a>
    <a href="https://workspace.google.com/marketplace/app/sentiment_analysis_for_google_sheets/320314197906">
        <img 
            alt="Google Workspace Marketplace badge" 
            src="https://workspace.google.com/static/img/marketplace/en/gwmBadge.svg"  
            style="padding-top: 20px; width: 400px;"
        />
    </a>
</div>

## How it works

### Basic
- Once installed, open the spreadsheet extension sidebar. In Excel, this will be an icon in the ribbon. In Google Sheets, this will be under the Extensions menu.
- Select the range of cells containing the text you want to analyze. These must be in a single column.  There is no limit to the number of cells you can select.
- Click "Analyze", and a new sheet is added to your workbook to hold the results.
analysis will run in your spreadsheet.
- If this is the first use, it will take some additional time for the model to download from [Hugging Face](https://huggingface.co/).  Subsequent uses will be faster, as the model will be cached in your browser storage, including for Excel desktop (which uses a browser engine for the addin).
- As analysis progresses, the results will stream into the new sheet as they are processed.
- You can click cancel at any time to stop the analysis and start over.

A hypothetical example of the results output is as follows:

| Text - Model: Movie Reviews | Label | Score |
| :----- | :----: | ----: |
| I really enjoyed it. | POSITIVE | 0.99 |
| This is the worst movie I've ever seen. | NEGATIVE | 0.99 |
| I liked Karim, but story was awful. |  POSITIVE |  0.70 |

The first column is a copy of the text you selected, with a header identifying the model used. The default model will be Movie Reviews, unless you select a different model, see [advanced](#advanced) below.  The second column is the sentiment label (e.g. POSITIVE).  The third column is the confidence score (0 to 1) of the sentiment prediction.  The higher the score, the more confident the model is in the prediction.  Note in the example above, the model is less confident that the last row of text is positive, because it actually contains two different sentiments.

### Advanced

Toggling the Advanced options button will reveal the following additional options:

- Model selection:  Select the [sentiment model](#models) you wish to use.  The default is Movie Reviews.
- Split into sentences:  This will use [sentence boundary detection](https://en.wikipedia.org/wiki/Sentence_boundary_disambiguation) to split the text into sentences.  This is useful for breaking up paragraphs which may contain different sentiments, e.g. a support ticket which contains a complaint and a compliment.

## Models

Sentiment analysis is performed using transformer models which have been trained on datasets (e.g. movie reviews, tweets, etc.) where the sentiment has been labeled by human annotators.  The accuracy of the model depends on how well the training data matches the text you are analyzing.

The sentiment analysis models currently available are shown in the table below:

| Name | Model | Training Data | Output Labels | Language |
| :--- | :---- | :---------- | :---------- | :---------- |
| Movie Reviews | [distilbert-base-uncased-finetuned-sst-2-english](https://huggingface.co/distilbert/distilbert-base-uncased-finetuned-sst-2-english) | Movie review phrases from the [Stanford Sentiment Treebank](https://paperswithcode.com/dataset/sst) dataset. | Positive, Negative | English |
| Finance News| [finbert](https://huggingface.co/ProsusAI/finbert) | Financial phrases from the [financial phrasebank dataset](https://huggingface.co/datasets/financial_phrasebank). | Positive, Negative, Neutral | English |
| Twitter Messages | [twitter-roberta-base-sentiment-latest](https://huggingface.co/cardiffnlp/twitter-roberta-base-sentiment-latest) | ~124M tweets from the [TweetEval](https://github.com/cardiffnlp/tweeteval) dataset. | Positive, Negative, Neutral | English |
| Product Reviews | [bert-base-multilingual-uncased-sentiment](https://huggingface.co/nlptown/bert-base-multilingual-uncased-sentiment) | Trained on multilingual product reviews. | 1 - 5 stars | English, Dutch, German, French, Spanish, and Italian |

## Limitations

- Accuracy: These models handle the presence of sarcasm, irony, negation, and emojis to varying degrees, but this is often a source of error for sentiment analysis models.
- Custom Models: Using a custom model on [Hugging Face](https://huggingface.co/) is not supported at this time.
- [Aspect-based Sentiment Analysis](https://paperswithcode.com/task/aspect-based-sentiment-analysis): Not supported, but we are exploring it.  In the example above "I liked Karim, but story was awful.", this would be yield something like "Karim, positive", "store, negative".
- Text length: The models have a maximum input length of about 500 tokens, so any additional text may be truncated.  Sentence splitting may be a workaround for this limitation.
- Language: The models are mostly trained on English text, so the accuracy of the sentiment analysis will be lower for other languages.  We are exploring models for other languages.
- Performance: The extensions currently use a single CPU thread.  If you have a very large dataset, for now you can just let it run in the background for as long as needed (e.g. several hours).  Since it is only using a single CPU thread, it won't slow down whatever else you are doing, lol.  In the future we will offer other options for accelerated processing (e.g. multi-threaded CPU, WebGPU, etc.).  

## Changelog

1.2 - 2024-04-27 (planned)
- Added Excel extension.
- Added Reviews (1-5 starts) multi-lingual sentiment model.
- Added ability to split sentences using [WinkNLP](https://winkjs.org/wink-nlp/).
- Improved progress monitoring using web worker.

1.1 - 2024-04-11
- Ability to select sentiment model.
- Added Tweets and Finance News sentiment models to existing Reviews model.
- Updated UI.

1.0 - 2024-03-29
- First version published to Google Workspace Marketplace.
- Single sentiment model (Reviews) with default settings.