import { PublicClientApplication } from "@azure/msal-browser";

const configuration = {
    auth: {
        clientId: 'ea53f42f-cfd7-426a-947f-73a2ccb753f8',
        authority: 'https://login.microsoftonline.com/common'
    }
};

export const pca = new PublicClientApplication(configuration);