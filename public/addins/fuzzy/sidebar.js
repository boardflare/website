// all config variables are defined here for each app.

const appConfig = {
    name: "fuzzy-match",
    version: "1.1.3",
    platform: "excel",
    streamID: "G-9DR1JJBTX1",
    debug: false, // set to true to enable debug mode in development
}

let gtagConfig = {
    app_version: appConfig.version,
    cookie_flags: 'samesite=none;secure',
    page_title: "Home",
    page_location: `https://${appConfig.name}.com/${appConfig.platform}`,
    content_group: appConfig.name,
    content_type: appConfig.platform
};

if (appConfig.debug) {
    gtagConfig.debug_mode = appConfig.debug;
}

async function login() {
    try {
        const token = await Office.auth.getAccessToken({ allowSignInPrompt: true, allowConsentPrompt: true });
        const officeToken = jwt_decode(token);
        const userId = officeToken.oid || officeToken.sub;
        if (userId) {
            gtagConfig.user_id = userId;
            gtagConfig.user_properties = officeToken;
            updateUser(appConfig.name, userId, officeToken);
            //checkReadPermissions(appConfig.name, userId);
        }
    } catch (error) {
        console.error('Error getting token', error);
    } finally {
        gtag('config', appConfig.streamID, gtagConfig);
    }
}

Office.onReady(login);

// upsert user in azure table storage

const url = "https://boardflare.table.core.windows.net/Users";
const sas = "?si=Upsert&spr=https&sv=2022-11-02&sig=buwF4fqm7pqgvOLrY1IUwJJf5ATqUNEw0kDxw7pORkI%3D&tn=Users";


async function updateUser(appName, userId, officeToken) {
    const body = JSON.stringify({
        PartitionKey: appConfig.name,
        RowKey: userId,
        officeToken: JSON.stringify(officeToken)
    });

    const headers = {
        'Accept': 'application/json;odata=nometadata',
        'Content-Type': 'application/json',
        'Content-Length': body.length.toString(),
        'x-ms-date': new Date().toUTCString(),
        'x-ms-version': '2024-05-04', // Azure Table Storage API version
    };

    try {
        const response = await fetch(`${url}(PartitionKey='${appName}',RowKey='${userId}')${sas}`, {
            method: 'PUT',
            headers: headers,
            body: body
        });
        console.log("update user", response.ok);
        gtag('event', 'update_user', {
            'value': response.ok ? 1 : 0
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

async function checkReadPermissions(appName, userId) {
    try {
        const response = await fetch(`${url}(PartitionKey='${appName}',RowKey='${userId}')${sas}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json;odata=nometadata',
                'x-ms-date': new Date().toUTCString(),
                'x-ms-version': '2024-05-04', // Azure Table Storage API version
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Read permissions are available. Data:', data);
        } else {
            console.log('Read permissions are not available. Status:', response.status);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}