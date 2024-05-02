---
title: Sentiment Analysis
---

# Sentiment Analysis

## Get started
[Sentiment analysis](https://paperswithcode.com/task/sentiment-analysis) classifies text as having positive or negative overall sentiment, and is commonly used in customer support, market research, finance, etc.  Click on a button below to get started with the Excel or Sheets extension.

<div style="display: flex; justify-content: space-between;">
    <a href="https://appsource.microsoft.com/en-us/product/office/WA200006918?tab=Overview">
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

### Basic Usage
- Once installed, open the spreadsheet extension sidebar. In Excel, this will be an icon in the ribbon. In Google Sheets, this will be under the Extensions menu.
- Select the range of cells containing the text you want to analyze. These must be in a single column.  There is no limit to the number of cells you can select.
- Click "Analyze", and a new sheet is added to your workbook to hold the results.
analysis will run in your spreadsheet.

![Excel Select Text](/images/excel-sentiment-select.png)

- On first use, it will take some additional time for the model to download from [Hugging Face](https://huggingface.co/).  Subsequent uses will be faster, as the model will be cached in your browser storage, including for Excel desktop.
- As analysis progresses, the results will appear in the new sheet.
- You can click cancel at any time to stop the analysis and start over.

![Excel Results](/images/excel-sentiment-results.png)

A close-up hypothetical example of the output is as follows:

| Text - Model: Movie Reviews | Label | Score |
| :----- | :----: | ----: |
| I really enjoyed it. | POSITIVE | 0.99 |
| This is the worst movie I've ever seen. | NEGATIVE | 0.99 |
| I liked Karim, but story was awful. |  POSITIVE |  0.70 |

The first column is a copy of the text you selected, with a header identifying the model used. The default model will be Movie Reviews, see [advanced](#advanced) below on how to select other models.  The second column is the sentiment label (e.g. POSITIVE).  The third column is the confidence score (0 to 1) of the sentiment prediction.  The higher the score, the more confident the model is in the prediction.  Note in the example above, the model is less confident that the last row of text is positive, because it actually contains two different sentiments.

### Advanced Usage

Toggling the Advanced options button will reveal the following additional options:

- Model selection:  Select the [sentiment model](#models) you wish to use.  The default is Movie Reviews, as it is a popular general-purpose sentiment model. Product Reviews would also be a good general-purpose option, with the benefit of supporting more languages. The other models are more specialized, e.g. Finance News is trained on financial phrases, Twitter Messages is trained on tweets, etc.
- Split into sentences:  This will use [sentence boundary detection](https://en.wikipedia.org/wiki/Sentence_boundary_disambiguation) to split the text into sentences.  This is useful for breaking up paragraphs which may contain different sentiments, e.g. a support ticket which contains a complaint and a compliment.  We are exploring [Aspect-based Sentiment Analysis](https://paperswithcode.com/task/aspect-based-sentiment-analysis) as more powerful solution to this.

### Demo

[Youtube Demo Video](http://www.youtube.com/watch?v=Qek18IJXClM)

## Models

Sentiment analysis is performed using transformer machine learning models which have been trained on datasets (e.g. movie reviews, tweets, etc.) where the sentiment has been labeled by human annotators.  The accuracy of the model depends on how similar your text is to the data the model was trained on.

The sentiment analysis models currently available are shown in the table below:

| Name | Model | Training Data | Output Labels | Language |
| :--- | :---- | :---------- | :---------- | :---------- |
| Movie Reviews | [distilbert-base-uncased-finetuned-sst-2-english](https://huggingface.co/distilbert/distilbert-base-uncased-finetuned-sst-2-english) | Movie review phrases from the [Stanford Sentiment Treebank](https://paperswithcode.com/dataset/sst) dataset. | Positive, Negative | English |
| Finance News| [finbert](https://huggingface.co/ProsusAI/finbert) | Financial phrases from the [financial phrasebank dataset](https://huggingface.co/datasets/financial_phrasebank). | Positive, Negative, Neutral | English |
| Twitter Messages | [twitter-roberta-base-sentiment-latest](https://huggingface.co/cardiffnlp/twitter-roberta-base-sentiment-latest) | ~124M tweets from the [TweetEval](https://github.com/cardiffnlp/tweeteval) dataset. | Positive, Negative, Neutral | English |
| Product Reviews | [bert-base-multilingual-uncased-sentiment](https://huggingface.co/nlptown/bert-base-multilingual-uncased-sentiment) | Trained on multilingual product reviews. | 1 - 5 stars | English, Dutch, German, French, Spanish, and Italian |

## Limitations

- Accuracy: Sentiment analysis is far from an exact science.  The presence of sarcasm, irony, negation, and emojis often confuses sentiment analysis models and leads to errors. YMMV.
- Custom Models: Using a custom model on [Hugging Face](https://huggingface.co/) is not supported at this time, but if this is something you need, please [let us know](/company/support).
- Text length: The models have a maximum input length of about 500 tokens, so any additional text may be truncated.  Sentence splitting may be a workaround for this limitation.
- Language: The models are mostly trained on English text, so the accuracy of the sentiment analysis will be lower for other languages.  We are exploring models for other languages.
- Performance: The extensions currently use a single CPU thread.  If you have a very large dataset, for now you can just let it run in the background for as long as needed (e.g. several hours).  Since it is only using a single CPU thread, it won't slow down whatever else you are doing, lol.  In the future we will offer other options for accelerated processing (e.g. multi-threaded CPU, WebGPU, etc.).  

## Changelog

1.2 - 2024-04-29
- Added Excel extension.
- Added Product Reviews multi-lingual sentiment model.
- Ability to split sentences using [WinkNLP](https://winkjs.org/wink-nlp/).

1.1 - 2024-04-11
- Ability to select different sentiment models.
- Added Twitter Messages and Finance News sentiment models to existing Movie Reviews model.

1.0 - 2024-03-29
- First version published to Google Workspace Marketplace.
- Single sentiment model (Reviews) with default settings.