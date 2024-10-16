---
title: Translation
---

# Fuzzy Matching

## Overview

Fuzzy matching, or [approximate string matching](https://en.wikipedia.org/wiki/Approximate_string_matching), refers to process of finding strings that are similar but may contain typos, misspellings, or other small differences. Fuzzy matching algorithms are designed to handle these variations and find the best matches for a given search string in a dataset of strings along with their edit distance or similarity.  One of the most common applications of fuzzy matching is entity resolution, and that is the focus of this task. 

## Apps

- [Fuzzy Match for Excel](/apps/excel/fuzzy-match) is our Excel add-in that provides a fuzzy matching version of XLOOKUP and XMATCH functions that runs entirely in Excel with no data being sent to the cloud.
- [Python for Excel](/apps/excel/python) provides access to the Python functions listed below, along with the ability to customize the functions to your specific needs.

## Functions

- [FUZZY](/functions/text/fuzzy) - Calculates the normalized similarity of strings using various algorithms.                           |

## Entity Resolution

[Entity resolution](https://paperswithcode.com/task/entity-resolution) is also known as entity matching, entity deduplication, [record linkage](https://en.wikipedia.org/wiki/Record_linkage), entity disambiguation, duplicate detection, record matching, etc. In entity resolution, the goal is to identify and merge records that refer to the same real-world entity but may have different representations or identifiers and there is no unique key to match them. This is problem appears in data integration, data cleaning, data quality management, master data management, and other data-related tasks.  Some common entity types that are matched include: names of people, companies, products, and locations.

Company Entity Matching is a specific type of entity resolution task that focuses on matching records that refer to the same company or organization. This task is challenging due to variations in company names, abbreviations, misspellings, and other inconsistencies in the data.

For example, you may encounter variations such as "Microsoft Corporation", "Microsoft Corp", "Microsoft Inc", "Microsoft", etc. A fuzzy matching algorithm can help identify that these records refer to the same entity and merge them into a single record.

An overview of the state of the art in company entity matching is provided in this paper:  [CompanyName2Vec: Company Entity Matching Based on Job Ads](https://arxiv.org/pdf/2201.04687)

Vertical-specific entities are specific to a particular domain or industry. For example, in  healthcare, you may need to match procedures. In e-commerce, you may need to match product listings from different online retailers.  In hospitality, you may need to [match hotel listings from different booking platforms](https://towardsdatascience.com/natural-language-processing-for-fuzzy-string-matching-with-python-6632b7824c49).


## Datasets

- [Papers with code: Entity resolution](https://paperswithcode.com/task/entity-resolution) has links to datasets for entity resolution tasks.

- [MatchBench](https://huggingface.co/matchbench) is a collection of datasets for entity matching and deduplication tasks. It includes datasets for company matching, product matching, and person matching, among others.

- [Rotom](https://github.com/megagonlabs/rotom) is a technique for expanding entity matching datasets by generating synthetic data. It can be used to create larger datasets for training and evaluating entity matching models.

## Transformer Models

Transformer-based models have shown significant improvements in various natural language processing tasks, including entity matching. These models leverage large pre-trained language models like BERT, RoBERTa, and others to learn contextual representations of text and perform fuzzy matching tasks. They can be fine-tuned on specific datasets to improve their performance on entity matching tasks.

- [MatchGPT](https://github.com/wbsg-uni-mannheim/MatchGPT)

- [Jellyfish](https://huggingface.co/NECOUDBFM/Jellyfish-13B) is a transformer-based model developed by NECO UDBFM. There is a 7B and 13B size model.  Paper: [Jellyfish-13B: A Large-Scale Pretrained Model for Fuzzy Matching](https://arxiv.org/pdf/2312.01678)

    The model is designed to perform several tasks:

    - Error Detection (ED): Given a record (i.e., a tuple in a relational table) and an attribute, the task is to detect whether there is an error in the cell value of this attribute.
    
    - Data Imputation (DI): Given a record and an attribute such that cell value for this attribute is missing, the task is to infer its correct value.
    
    - Schema Matching (SM): Given a pair of attributes represented in the form of (name, description), the task is to find whether they refer to the same attribute.
    
    - Entity Matching (EM): Given a pair of records, the task is to infer whether they refer to the same entity.
    
    These four tasks collectively form the most critical part of Data Preprocessing (DP) and are used for instruction-tuning. Besides, the model also considers two unseen tasks which belong to the intersection of DP and other topics:
    
    - Column Type Annotation (CTA): Given a table with no header, the task is to infer the type of each column from a set of predefined semantic types (e.g., name, time, location).
    
    - Attribute Value Extraction (AVE): Given a text description of an entity and a set of predefined attributes, the task is to extract attribute values from the text description.

- [Megagon deep entity matching models](https://megagon.ai/deep-entity-matching-with-pre-trained-language-models/), utilize pre-trained language models for the task of entity matching. These models leverage the power of large-scale pre-trained models like BERT, RoBERTa, and DistilBERT, and fine-tune them for specific tasks such as entity matching, deduplication, and record linkage. The article provides a comprehensive overview of the methodology, benefits, and challenges of using deep learning for entity matching tasks.

- [Magellan](https://pages.cs.wisc.edu/~anhai/papers/magellan-tr.pdf) is a python based system for entity matching that uses machine learning to automatically generate matching rules. It is designed to handle large datasets and can be used for tasks such as deduplication, record linkage, and data integration. The main project website with links to datasets is available [here](https://sites.google.com/site/anhaidgroup/useful-stuff/the-magellan-data-repository).

- [AutoML-EM](https://www.cs.sfu.ca/~jnwang/papers/icde2021-automl-er.pdf) is a system for entity matching from a [team at SFU](https://www.cs.sfu.ca/~jnwang/). 

## Similarity Algorithms

The problem of approximate string matching can be defined as given a search string $P = p_1p_2...p_m$ and a text string $T = t_1t_2…t_n$, the objective is to identify a substring $T_{j',j} = t_{j'}…t_j$ in $T$ that has the least edit distance to the search string $P$ among all substrings of $T$.  A straightforward method would be to calculate the edit distance to $P$ for all substrings of $T$, and then choose the substring with the smallest distance. However, this method would have a time complexity of $O(n^3 m)$. 

To improve efficiency, several approximate string matching algorithms have been developed, such as the Bitap algorithm, the Levenshtein distance, the Jaccard index, the Jaro-Winkler similarity, and Soundex.

JavaScript libraries that implement these edit distance algorithms are as follows:

- [Fuse.js](https://fusejs.io/) implements Bitap.

- [Talisman](https://www.npmjs.com/package/talisman) implements various string similarity algorithms, including Levenshtein distance, Jaccard index, Jaro-Winkler similarity, and Soundex.

### Bitap

The [Bitap algorithm](https://en.wikipedia.org/wiki/Bitap_algorithm), also known as the shift-or, shift-and, or Baeza-Yates-Gonnet algorithm, is a string-searching algorithm that allows for approximate matching of a pattern in a text. It is based on bitwise operations and dynamic programming, and it can be used to find the best approximate match for a given pattern in a text.

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

## Cloud Services

- [Senzing](https://senzing.com/) is an AI-based software that provides real-time entity resolution with fuzzy matching capabilities. It can be used to discover if different records refer to the same entity in a dataset.

- [Data Ladder](https://www.dataladder.com/) is a data quality management tool that includes advanced data matching, profiling, deduplication, and enrichment capabilities. It can be used to ensure data accuracy and consistency across various data sources.