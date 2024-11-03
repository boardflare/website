---
title: Fuzzy Matching
---

# Fuzzy Matching

Fuzzy matching, or [approximate string matching](https://en.wikipedia.org/wiki/Approximate_string_matching), refers to process of finding strings that are similar but may contain typos, misspellings, or other small differences. Fuzzy matching algorithms are designed to handle these variations and find the best matches for a given search string in a dataset of strings along with their edit distance or similarity.

## Excel Add-ins

There are two options to perform fuzzy matching in Excel:

- [Fuzzy Match for Excel](/apps/excel/fuzzy-match) add-in currently provides Bitap implementation of Levenshtein.
- [Python for Excel](/apps/excel/python) provides access to the fuzzy matching Python functions below.

## Python Functions

| Name | Description | Boardflare RUNPY() | Excel PY() | Source Code | Demo Workbook |
|:----:|:------------|:-------:|:----------:|:-------:|:-------:|
| [text_distance](/functions/text/fuzzy-match/text_distance) | Uses [`textdistance`](https://github.com/life4/textdistance) library. Supports the widest range of algorithms. | ✅ | - | [Download](https://functions.boardflare.com/notebooks/text/fuzzy-match/text_distance.ipynb) | [Open](https://whistlernetworks.sharepoint.com/:x:/s/Boardflare/Eb_nCI4mR6tImGx_S1hPVs8B4UYmrJRrkk0_Grai6A4adg?e=xfUuNQ) |
| [nltk_distance](/functions/text/fuzzy-match/nltk_distance) | Uses [`nltk`](https://github.com/nltk/nltk) library. Supports `jaccard`, `jaro`, and `levenshtein`. | ✅ | ✅ | [Download](https://functions.boardflare.com/notebooks/text/fuzzy-match/nltk_distance.ipynb) | [Open](https://whistlernetworks.sharepoint.com/:x:/s/Boardflare/Eb_nCI4mR6tImGx_S1hPVs8B4UYmrJRrkk0_Grai6A4adg?e=xfUuNQ) |
| [thefuzz_distance](/functions/text/fuzzy-match/thefuzz_distance) | Uses [`thefuzz`](https://github.com/seatgeek/thefuzz) library. Only supports `levenshtein`, but uses algorithm which is 10x faster than others. | - | ✅ | [Download](https://functions.boardflare.com/notebooks/text/fuzzy-match/thefuzz_distance.ipynb) | [Open](https://whistlernetworks.sharepoint.com/:x:/s/Boardflare/Eb_nCI4mR6tImGx_S1hPVs8B4UYmrJRrkk0_Grai6A4adg?e=xfUuNQ) |

## Similarity Algorithms

Below are some of the common similarity algorithms used in fuzzy matching tasks.  This [article](https://medium.com/@m.nath/fuzzy-matching-algorithms-81914b1bc498) provides an overview of the different types of similarity algorithms and how they can be used to compare strings and identify similar patterns.

### Levenshtein

The Levenshtein distance is a string metric for measuring the difference between two sequences. It calculates the minimum number of single-character edits (insertions, deletions or substitutions) required to change one word into the other.

For example, the Levenshtein distance between "Microsoft" and "Microsoft, Inc" is 5, since the following five edits change one into the other, and there is no way to do it with fewer than five edits:

1. Microsoft -> Microsoft, (insert "," after "t")
2. Microsoft, -> Microsoft,  (insert " " after ",")
3. Microsoft,  -> Microsoft, I (insert "I" after " ")
4. Microsoft, I -> Microsoft, In (insert "n" after "I")
5. Microsoft, In -> Microsoft, Inc (insert "c" after "n")

The Levenshtein distance can be used to calculate the similarity between two strings by normalizing the distance based on the number of changes and the length of the longest string. A lower distance indicates a higher similarity between the strings. In the example above, the similarity would be 1 - (5 / 14) = 0.64.

The [Bitap algorithm](https://en.wikipedia.org/wiki/Bitap_algorithm), also known as the shift-or, shift-and, or Baeza-Yates-Gonnet algorithm, is a string-searching algorithm that uses Levenstein distance and can be significantly faster. It is used in the [Fuse.js](https://fusejs.io/) library for fuzzy matching.

### Damerau-Levenshtein

The [Damerau-Levenshtein distance](https://en.wikipedia.org/wiki/Damerau%E2%80%93Levenshtein_distance) is similar to Levenshtein but considers transpositions as a single edit. It calculates the minimum number of operations (insertions, deletions, substitutions, or transpositions) required to change one word into the other.

For example, the Damerau-Levenshtein distance between "ca" and "abc" is 2, since the following two edits change one into the other:

1. ca -> ac (transpose 'c' and 'a')
2. ac -> abc (insert 'b' after 'a')

### Hamming

The [Hamming distance](https://en.wikipedia.org/wiki/Hamming_distance) measures the number of positions at which the corresponding symbols are different. It is only applicable to strings of the same length.

For example, the Hamming distance between "karolin" and "kathrin" is 3, since the following three positions are different:

1. k**a**rolin -> k**a**thrin (no change)
2. ka**r**olin -> ka**t**hrin (change 'r' to 't')
3. kar**o**lin -> kat**h**rin (change 'o' to 'h')
4. karo**l**in -> kath**r**in (no change)
5. karol**i**n -> kathr**i**n (no change)
6. karoli**n** -> kathri**n** (no change)

### Jaro-Winkler

The [Jaro-Winkler similarity](https://en.wikipedia.org/wiki/Jaro%E2%80%93Winkler_distance) measure is a type of edit distance that rewards strings that have the same prefix. It is a variant of the Jaro distance metric and mainly used in the area of record linkage (duplicate detection). The higher the Jaro-Winkler similarity score, the more similar the strings are.

The formula for Jaro-Winkler similarity is:

$$ JW(A, B) = J(A, B) + (l \cdot p \cdot (1 - J(A, B))) $$

Where:
- $J(A, B)$ is the Jaro similarity between strings $A$ and $B$.
- $l$ is the length of the common prefix at the start of the string up to a maximum of 4 characters.
- $p$ is a constant scaling factor for how much the score is adjusted upwards for having common prefixes (usually 0.1).

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

### Cosine Similarity

The [Cosine similarity](https://en.wikipedia.org/wiki/Cosine_similarity) measures the cosine of the angle between two non-zero vectors. It is useful for comparing the similarity of two vectors.

The formula for Cosine similarity is:

$$ \cos(\theta) = \frac{A \cdot B}{\|A\| \|B\|} $$

Where:
- $A$ and $B$ are the two vectors.
- $A \cdot B$ is the dot product of the vectors.
- $\|A\|$ and $\|B\|$ are the magnitudes of the vectors.

For example, the Cosine similarity between the vectors [1, 0, -1] and [0, 1, 1] is:

$$ \cos(\theta) = \frac{(1 \cdot 0) + (0 \cdot 1) + (-1 \cdot 1)}{\sqrt{1^2 + 0^2 + (-1)^2} \sqrt{0^2 + 1^2 + 1^2}} = \frac{0 + 0 - 1}{\sqrt{2} \sqrt{2}} = -0.5 $$

### Overlap Coefficient

The [Overlap coefficient](https://en.wikipedia.org/wiki/Overlap_coefficient) measures the overlap between two sets. It is useful for comparing the similarity of two sets.

The formula for the Overlap coefficient is:

$$ O(A, B) = \frac{|A \cap B|}{\min(|A|, |B|)} $$

Where:
- $A$ and $B$ are the two sets.
- $|A \cap B|$ is the size of the intersection of the sets.
- $\min(|A|, |B|)$ is the size of the smaller set.

For example, the Overlap coefficient between the sets {1, 2, 3} and {2, 3, 4} is:

$$ O(A, B) = \frac{2}{3} \approx 0.67 $$

### Sorensen-Dice Coefficient

The [Sorensen-Dice coefficient](https://en.wikipedia.org/wiki/S%C3%B8rensen%E2%80%93Dice_coefficient) measures the similarity between two sets. It is useful for comparing the similarity of two sets.

The formula for the Sorensen-Dice coefficient is:

$$ S(A, B) = \frac{2 |A \cap B|}{|A| + |B|} $$

Where:
- $A$ and $B$ are the two sets.
- $|A \cap B|$ is the size of the intersection of the sets.
- $|A| and $|B|$ are the sizes of the sets.

For example, the Sorensen-Dice coefficient between the sets {1, 2, 3} and {2, 3, 4} is:

$$ S(A, B) = \frac{2 \cdot 2}{3 + 3} = \frac{4}{6} \approx 0.67 $$

### Tversky Index

The [Tversky index](https://en.wikipedia.org/wiki/Tversky_index) is a generalization of the Jaccard index. It is useful for comparing the similarity of two sets with different weights.

The formula for the Tversky index is:

$$ T(A, B) = \frac{|A \cap B|}{|A \cap B| + \alpha |A - B| + \beta |B - A|} $$

Where:
- $A$ and $B$ are the two sets.
- $|A \cap B|$ is the size of the intersection of the sets.
- $|A - B|$ is the size of the difference between set $A$ and set $B$.
- $|B - A|$ is the size of the difference between set $B$ and set $A$.
- $\alpha$ and $\beta$ are the weights.

For example, the Tversky index between the sets {1, 2, 3} and {2, 3, 4} with $\alpha = 0.5$ and $\beta = 0.5$ is:

$$ T(A, B) = \frac{2}{2 + 0.5 \cdot 1 + 0.5 \cdot 1} = \frac{2}{3} \approx 0.67 $$

### Bag Similarity

The [Bag similarity](https://github.com/Yomguithereal/talisman/blob/master/src/metrics/bag.js) measures the similarity between two sequences by comparing the bags of their elements. It is useful for comparing sequences where the order of elements does not matter.

For example, the Bag similarity between the sequences "abc" and "bca" is 1, since they contain the same elements.

### Soundex

[Soundex](https://en.wikipedia.org/wiki/Soundex) is a phonetic algorithm for indexing names by sound, as pronounced in English. The goal is for homophones to be encoded to the same representation so that they can be matched despite minor differences in spelling. This algorithm is useful in situations where two strings might sound the same, but are spelled differently.

The Soundex algorithm works as follows:
1. Retain the first letter of the string.
2. Replace all occurrences of the following letters with their respective numeric values:
    - B, F, P, V = 1
    - C, G, J, K, Q, S, X, Z = 2
    - D, T = 3
    - L = 4
    - M, N = 5
    - R = 6
3. Remove all occurrences of 'a', 'e', 'i', 'o', 'u', 'h', 'w', 'y'.
4. If two or more letters with the same number are adjacent in the original name (before step 1), only retain the first letter; also, two letters with the same number separated by 'h' or 'w' are coded as a single number.
5. Return the first four characters, right-padded with zeros if there are fewer than four.

### Editex

The Editex algorithm is a phonetic matching algorithm designed to measure the similarity between names. It is particularly useful for comparing names that may have different spellings but sound similar. The algorithm is an extension of the edit distance algorithm, incorporating phonetic information to improve accuracy.

**Steps of the Editex Algorithm:**
1. **Phonetic Grouping**:
   - Letters are grouped into categories based on their phonetic similarity. For example:
     - B, F, P, V
     - C, G, J, K, Q, S, X, Z
     - D, T
     - L
     - M, N
     - R
   - Vowels and certain other characters (e.g., 'H', 'W', 'Y') are treated separately.

2. **Transcription**:
   - Each character in the input strings is replaced by its corresponding phonetic group identifier.

3. **Edit Distance Calculation**:
   - The algorithm calculates the edit distance between the two transcribed strings. The edit distance is the minimum number of operations (insertions, deletions, substitutions) required to transform one string into the other.
   - The cost of substitutions depends on whether the characters belong to the same phonetic group or different groups. Substituting characters within the same phonetic group incurs a lower cost compared to characters from different groups.

**Example:**
To compare the names "John" and "Jon":
1. Phonetic Grouping:
   - "John" -> 'J' (Group 2), 'o' (Vowel), 'h' (Ignored), 'n' (Group 5)
   - "Jon" -> 'J' (Group 2), 'o' (Vowel), 'n' (Group 5)

2. **Transcription**:
   - "John" -> "J o n"
   - "Jon" -> "J o n"

3. **Edit Distance Calculation**:
   - The transcribed strings are identical, so the Editex similarity is high.

**Applications:**
- The Editex algorithm is commonly used in applications like:
  - Name matching in databases
  - Record linkage and deduplication
  - Search engines to improve search queries with misspellings

For more detailed information, you can refer to the [Editex documentation](https://anhaidgroup.github.io/py_stringmatching/v0.3.x/Editex.html).

### Match Rating Approach (MRA)

The Match Rating Approach (MRA) is a phonetic algorithm designed to measure the similarity between names. It is particularly useful for comparing names that may have different spellings but sound similar. The algorithm simplifies the comparison process by focusing on the phonetic characteristics of the names.

**Steps of the Match Rating Approach Algorithm:**
1. **Remove Vowels**:
   - Remove all vowels (A, E, I, O, U) from the name unless the vowel is the first letter.

2. **Remove Duplicate Consonants**:
   - Remove duplicate consonants that appear consecutively. For example, "tt" in "Matt" would be reduced to "t".

3. **Keep the First and Last 3 Letters**:
   - If the resulting string has more than 6 characters, keep only the first 3 and the last 3 characters.

4. **Compute the Length Difference**:
   - Calculate the difference in length between the two processed names. If the difference is greater than 3, the names are considered not similar.

5. **Compare the Names**:
   - Compare the processed names character by character. The number of matching characters determines the similarity score.

6. **Match Rating**:
   - The final similarity score is determined based on the number of matching characters and the length difference. A higher score indicates higher similarity.

**Example:**
To compare the names "John" and "Jon":
1. **Remove Vowels**:
   - "John" -> "Jhn"
   - "Jon" -> "Jn"

2. **Remove Duplicate Consonants**:
   - No duplicate consonants to remove in this case.

3. **Keep the First and Last 3 Letters**:
   - Both names are already less than 6 characters, so no change.

4. **Compute the Length Difference**:
   - Length of "Jhn" is 3.
   - Length of "Jn" is 2.
   - Difference is 1, which is less than 3, so proceed.

5. **Compare the Names**:
   - Compare "Jhn" and "Jn" character by character.
   - "J" matches "J", "h" does not match "n", "n" matches "n".

6. **Match Rating**:
   - The names have 2 matching characters out of 3, indicating a high similarity.

**Applications:**
- The Match Rating Approach algorithm is commonly used in applications like:
  - Name matching in databases
  - Record linkage and deduplication
  - Search engines to improve search queries with misspellings

For more detailed information, you can refer to the [Match Rating Approach documentation](https://en.wikipedia.org/wiki/Match_rating_approach).


### Mongue-Elkan Method

The [Mongue-Elkan](https://www.gelbukh.com/CV/Publications/2009/Generalized%20Mongue-Elkan%20Method%20for%20Approximate%20Text%20String.pdf) method is a hybrid algorithm combining multiple similarity measures. It is useful for comparing sequences with different lengths.

**Steps of the Mongue-Elkan Method:**

1. **Tokenization**:
   - Split the input sequences into tokens (e.g., words or characters).

2. **Pairwise Similarity Calculation**:
   - For each token in the first sequence, calculate the similarity with each token in the second sequence using a chosen similarity measure (e.g., Jaccard similarity, cosine similarity, Levenshtein distance).

3. **Best Match Selection**:
   - For each token in the first sequence, select the highest similarity score from the comparisons with tokens in the second sequence.

4. **Average Similarity Calculation**:
   - Compute the average of the highest similarity scores obtained in the previous step.

**Example:**
To compare the company names "Tech Solutions Inc" and "Tech Solution Incorporated":

1. **Tokenization**:
   - Sequence 1: ["Tech", "Solutions", "Inc"]
   - Sequence 2: ["Tech", "Solution", "Incorporated"]

2. **Pairwise Similarity Calculation**:
   - Compare each token in Sequence 1 with each token in Sequence 2 using a similarity measure (e.g., Levenshtein distance):
     - "Tech" with "Tech", "Solution", "Incorporated"
     - "Solutions" with "Tech", "Solution", "Incorporated"
     - "Inc" with "Tech", "Solution", "Incorporated"

3. **Best Match Selection**:
   - For "Tech" in Sequence 1, the highest similarity score is with "Tech" in Sequence 2.
   - For "Solutions" in Sequence 1, the highest similarity score is with "Solution" in Sequence 2.
   - For "Inc" in Sequence 1, the highest similarity score is with "Incorporated" in Sequence 2.

4. **Average Similarity Calculation**:
   - Average the highest similarity scores:
     - If using a binary similarity measure (1 for match, 0 for no match), the scores might be [1, 0.9, 0.7] (assuming partial matches are scored accordingly).
     - The average similarity score is (1 + 0.9 + 0.7) / 3 ≈ 0.87.

**Applications:**
- The Mongue-Elkan method is commonly used in:
  - Record linkage and deduplication
  - Natural language processing tasks
  - Information retrieval systems

The Mongue-Elkan method is effective in scenarios where sequences have different lengths and where it is important to find the best possible alignment between tokens from the two sequences.

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

## Applications

### Entity Resolution

[Entity resolution](https://paperswithcode.com/task/entity-resolution) is also known as entity matching, entity deduplication, [record linkage](https://en.wikipedia.org/wiki/Record_linkage), entity disambiguation, duplicate detection, record matching, etc. In entity resolution, the goal is to identify and merge records that refer to the same real-world entity but may have different representations or identifiers and there is no unique key to match them. This is problem appears in data integration, data cleaning, data quality management, master data management, and other data-related tasks.  Some common entity types that are matched include: names of people, companies, products, and locations.

Company Entity Matching is a specific type of entity resolution task that focuses on matching records that refer to the same company or organization. This task is challenging due to variations in company names, abbreviations, misspellings, and other inconsistencies in the data.

For example, you may encounter variations such as "Microsoft Corporation", "Microsoft Corp", "Microsoft Inc", "Microsoft", etc. A fuzzy matching algorithm can help identify that these records refer to the same entity and merge them into a single record.

An overview of the state of the art in company entity matching is provided in this paper:  [CompanyName2Vec: Company Entity Matching Based on Job Ads](https://arxiv.org/pdf/2201.04687)

Vertical-specific entities are specific to a particular domain or industry. For example, in  healthcare, you may need to match procedures. In e-commerce, you may need to match product listings from different online retailers.  In hospitality, you may need to [match hotel listings from different booking platforms](https://towardsdatascience.com/natural-language-processing-for-fuzzy-string-matching-with-python-6632b7824c49).

- [Papers with code: Entity resolution](https://paperswithcode.com/task/entity-resolution) has links to datasets for entity resolution tasks.

- [MatchBench](https://huggingface.co/matchbench) is a collection of datasets for entity matching and deduplication tasks. It includes datasets for company matching, product matching, and person matching, among others.

- [Rotom](https://github.com/megagonlabs/rotom) is a technique for expanding entity matching datasets by generating synthetic data. It can be used to create larger datasets for training and evaluating entity matching models.

## Cloud Services

- [Senzing](https://senzing.com/) is an AI-based software that provides real-time entity resolution with fuzzy matching capabilities. It can be used to discover if different records refer to the same entity in a dataset.

- [Data Ladder](https://www.dataladder.com/) is a data quality management tool that includes advanced data matching, profiling, deduplication, and enrichment capabilities. It can be used to ensure data accuracy and consistency across various data sources.