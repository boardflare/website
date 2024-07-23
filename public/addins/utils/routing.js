// Routing for API calls
export function configureApiBaseUrl() {
    let apiBaseUrl;
    if (window.location.hostname === 'www.boardflare.com') {
        apiBaseUrl = 'https://boardflare-add-ins.azurewebsites.net/api';
    } else {
        apiBaseUrl = 'https://boardflare-add-ins-preview.azurewebsites.net/api';
    }
    window.apiBaseUrl = apiBaseUrl;
}