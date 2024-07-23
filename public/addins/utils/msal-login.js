import { PublicClientApplication, InteractionRequiredAuthError } from "https://cdn.jsdelivr.net/npm/@azure/msal-browser@3.17.0/+esm";

// Function to initialize and perform the authentication
export async function msal(email) {

    const pca = new PublicClientApplication({
        auth: {
            clientId: '7bced3a3-ad1b-48cb-b7fe-fb9e94c7ed54',
            authority: "https://login.microsoftonline.com/common",
            redirectUri: '/addins/auth/blank.html',
        },
        cache: {
            cacheLocation: 'localStorage' // Needed to avoid a "login required" error.
        }
    });

    await pca.initialize();

    const options = {
        loginHint: email,
    };

    let loginResponse = null;

    try {
        loginResponse = await pca.ssoSilent(options);
    } catch (err) {
        console.log("SSO error: ", err);
        if (err instanceof InteractionRequiredAuthError) {
            loginResponse = await pca
                .loginPopup(options)
                .catch((error) => {
                    console.log("loginPopup error: ", error);
                });
        } else {
            console.log("ssoSilent error: ", err);
        }
    }

    if (loginResponse) {
        return loginResponse;
    } else {
        console.log("No login response");
    }
}