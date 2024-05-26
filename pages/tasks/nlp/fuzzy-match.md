# Fuzzy Matching

## Overview

Fuzzy matching searches for text in the Search range (aka the "needles") in the Reference range (aka the "haystack"). It returns the closest matching text from the Reference range along with a similarity score. This is useful for finding similar text in a large dataset, such as finding potential duplicates in a CRM or customer list.

This is intended for finding similar words or short sequences of words (e.g. names of people, companies, products) within a given text, not for assessing the semantic similarity of an entire sentence or paragraph.  For example, searching for the word "Microsoft" in a list of companies, and finding "Microsoft Corporation" or "Microsoft Inc.".

## Algorithms

Fuzzy matching algorithms are designed to find approximate matches for a given search term or pattern. They are used when the matches do not have to be exact. There are several algorithms used in fuzzy matching, and here are a few commonly used ones:

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

These algorithms can be used individually or in combination, depending on the specific requirements of the fuzzy matching task.

## Datasets
coming soon

## Applications
coming soon