---
title: simple
---

```python
import re

# Validate Email Address
def validate_email(email):
    pattern = r'^[\w\.-]+@[\w\.-]+\.\w{2,4}$'
    return re.match(pattern, email) is not None

validate_email('example@example.com')
```




    True




```python
import re

# Extract First Phone Number
def extract_first_phone_number(text):
    pattern = r'\b\d{3}[-.]?\d{3}[-.]?\d{4}\b'
    match = re.search(pattern, text)
    return match.group(0) if match else None

extract_first_phone_number('Call me at 123-456-7890 or 987.654.3210')
```




    '123-456-7890'




```python
import re

# Validate Date (MM/DD/YYYY)
def validate_date(date):
    pattern = r'^(0[1-9]|1[0-2])/(0[1-9]|[12][0-9]|3[01])/\d{4}$'
    return re.match(pattern, date) is not None

validate_date('12/31/2023')
```




    True




```python
import re

# Extract First URL
def extract_first_url(text):
    pattern = r'https?://(?:[-\w.]|(?:%[\da-fA-F]{2}))+'
    match = re.search(pattern, text)
    return match.group(0) if match else None

extract_first_url('Visit https://example.com for more info')
```




    'https://example.com'




```python
import re

# Validate IP Address
def validate_ip(ip):
    pattern = r'^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$'
    return re.match(pattern, ip) is not None

validate_ip('192.168.1.1')
```




    True




```python
import re

# Extract First Hashtag
def extract_first_hashtag(text):
    pattern = r'#(\w+)'
    match = re.search(pattern, text)
    return match.group(1) if match else None

extract_first_hashtag('Loving the #weather and #sunshine today!')
```




    'weather'




```python
import re

# Validate Credit Card Number
def validate_credit_card(number):
    pattern = r'^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})$'
    return re.match(pattern, number) is not None

validate_credit_card('4111111111111111')
```




    True




```python
import re

# Extract Dates (MM/DD/YYYY)
def extract_dates(text):
    pattern = r'\b(0[1-9]|1[0-2])/(0[1-9]|[12][0-9]|3[01])/\d{4}\b'
    return re.findall(pattern, text)

extract_dates('Important dates: 01/01/2023, 12/31/2023')
```




    [('01', '01'), ('12', '31')]




```python
import re

# Validate Time (HH:MM)
def validate_time(time):
    pattern = r'^([01]?[0-9]|2[0-3]):[0-5][0-9]$'
    return re.match(pattern, time) is not None

validate_time('23:59')
```




    True




```python
import re

# Extract Words Starting with Capital Letter
def extract_capital_words(text):
    pattern = r'\b[A-Z][a-z]*\b'
    return re.findall(pattern, text)

extract_capital_words('Alice and Bob are going to the Market.')
```




    ['Alice', 'Bob', 'Market']




```python
import re

# Extract Words Starting with Capital Letter and return in lowercase as CSV
def extract_capital_words(text):
    pattern = r'\b[A-Z][a-z]*\b'
    capital_words = re.findall(pattern, text)
    lowercase_words = []
    for word in capital_words:
        lowercase_words.append(word.lower())
    return ','.join(lowercase_words)

extract_capital_words('Alice and Bob are friends of Sally.')
```




    'alice,bob,sally'




```python
# Function to add two numbers with one default argument
def add_numbers(*args):
    if len(args) < 2:
        raise ValueError("At least two arguments are required")
    a = args[0]
    b = args[1]
    return a + b

# Call the function directly with positional arguments
print(add_numbers(5, 2))
```

    7
    
