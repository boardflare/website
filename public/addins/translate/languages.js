const opusLanguages = {
    "Afrikaans": "af",
    "Arabic": "ar",
    "Czech": "cs",
    "Danish": "da",
    "Dutch": "nl",
    "Finnish": "fi",
    "French": "fr",
    "German": "de",
    "Hindi": "hi",
    "Hungarian": "hu",
    "Indonesian": "id",
    "Italian": "it",
    "Japanese": "jap",
    "Russian": "ru",
    "Spanish": "es",
    "Swedish": "sv",
    "Ukrainian": "uk",
    "Vietnamese": "vi",
    "Xhosa": "xh",
    "Chinese": "zh"
}

const m2mLanguages = {
    "Afrikaans": "af",
    "Amharic": "am",
    "Arabic": "ar",
    "Asturian": "ast",
    "Azerbaijani": "az",
    "Bashkir": "ba",
    "Belarusian": "be",
    "Bulgarian": "bg",
    "Bengali": "bn",
    "Breton": "br",
    "Bosnian": "bs",
    "Catalan; Valencian": "ca",
    "Cebuano": "ceb",
    "Czech": "cs",
    "Welsh": "cy",
    "Danish": "da",
    "German": "de",
    "Greeek": "el",
    "English": "en",
    "Spanish": "es",
    "Estonian": "et",
    "Persian": "fa",
    "Fulah": "ff",
    "Finnish": "fi",
    "French": "fr",
    "Western Frisian": "fy",
    "Irish": "ga",
    "Gaelic; Scottish Gaelic": "gd",
    "Galician": "gl",
    "Gujarati": "gu",
    "Hausa": "ha",
    "Hebrew": "he",
    "Hindi": "hi",
    "Croatian": "hr",
    "Haitian; Haitian Creole": "ht",
    "Hungarian": "hu",
    "Armenian": "hy",
    "Indonesian": "id",
    "Igbo": "ig",
    "Iloko": "ilo",
    "Icelandic": "is",
    "Italian": "it",
    "Japanese": "ja",
    "Javanese": "jv",
    "Georgian": "ka",
    "Kazakh": "kk",
    "Central Khmer": "km",
    "Kannada": "kn",
    "Korean": "ko",
    "Luxembourgish; Letzeburgesch": "lb",
    "Ganda": "lg",
    "Lingala": "ln",
    "Lao": "lo",
    "Lithuanian": "lt",
    "Latvian": "lv",
    "Malagasy": "mg",
    "Macedonian": "mk",
    "Malayalam": "ml",
    "Mongolian": "mn",
    "Marathi": "mr",
    "Malay": "ms",
    "Burmese": "my",
    "Nepali": "ne",
    "Dutch; Flemish": "nl",
    "Norwegian": "no",
    "Northern Sotho": "ns",
    "Occitan (post 1500)": "oc",
    "Oriya": "or",
    "Panjabi; Punjabi": "pa",
    "Polish": "pl",
    "Pushto; Pashto": "ps",
    "Portuguese": "pt",
    "Romanian; Moldavian; Moldovan": "ro",
    "Russian": "ru",
    "Sindhi": "sd",
    "Sinhala; Sinhalese": "si",
    "Slovak": "sk",
    "Slovenian": "sl",
    "Somali": "so",
    "Albanian": "sq",
    "Serbian": "sr",
    "Swati": "ss",
    "Sundanese": "su",
    "Swedish": "sv",
    "Swahili": "sw",
    "Tamil": "ta",
    "Thai": "th",
    "Tagalog": "tl",
    "Tswana": "tn",
    "Turkish": "tr",
    "Ukrainian": "uk",
    "Urdu": "ur",
    "Uzbek": "uz",
    "Vietnamese": "vi",
    "Wolof": "wo",
    "Xhosa": "xh",
    "Yiddish": "yi",
    "Yoruba": "yo",
    "Chinese": "zh",
    "Zulu": "zu"
};

// Create separate language lists for opusLanguages and m2mLanguages
let opusLanguageList = '';
let m2mLanguageList = '';

for (let language in opusLanguages) {
    opusLanguageList += `${language} "<code>${opusLanguages[language]}</code>", `;
}

for (let language in m2mLanguages) {
    m2mLanguageList += `${language} "<code>${m2mLanguages[language]}</code>", `;
}

// Remove the trailing comma and space from both lists
opusLanguageList = opusLanguageList.slice(0, -2);
m2mLanguageList = m2mLanguageList.slice(0, -2);

// Find the divs and add the language lists to them
const opusLanguagesDiv = document.getElementById('opusLanguages');
const m2mLanguagesDiv = document.getElementById('m2mLanguages');

opusLanguagesDiv.innerHTML = opusLanguageList;
m2mLanguagesDiv.innerHTML = m2mLanguageList;