// Main handler for the Excel custom function TRANSLATE
import { opusTranslate } from "./opus-translate.js";
import { apiTranslate } from "./api-translate.js";

async function translate(text, source_lang, target_lang, model) {
    if (text.length > 1000) {
        return `Text is ${text.length} characters, it must be less than 1000.`;
    }
    window.gtag('event', 'function_call', {
        'text_length': text.length,
        'source_lang': source_lang,
        'target_lang': target_lang,
        'model': model,
    });
    if (model !== "free" && credits > 0 && window.bearerToken) {
        return apiTranslate(text, source_lang, target_lang);
    } else {
        return opusTranslate(text, source_lang, target_lang);
    }
}

CustomFunctions.associate("TRANSLATE", translate);