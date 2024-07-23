window.bearerToken = null;
window.credits = null;

async function userAccount() {
    try {
        const response = await fetch(`${apiBaseUrl}/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${window.bearerToken}`,
            },
            body: JSON.stringify({ app: window.appConfig.content_group }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

function decodeJwt(token) {
    const parts = token.split('.');
    if (parts.length !== 3) {
        throw new Error('The token is invalid');
    }
    return JSON.parse(atob(parts[1]));
};

function fallbackLogin() {
    const dialogUrl = `${window.location.origin}/auth/login.html`;
    Office.context.ui.displayDialogAsync(dialogUrl, { height: 60, width: 30 }, function (result) {
        dialog = result.value;
        dialog.addEventHandler(Office.EventType.DialogMessageReceived, receiveMessage);
    });
}

async function receiveMessage(arg) {
    const messageFromDialog = JSON.parse(arg.message);
    const idToken = messageFromDialog.msalResponse.idToken;
    if (idToken) {
        window.bearerToken = idToken;
        dialog.close();
        const tokenClaims = decodeJwt(window.bearerToken);
        await handlePostSignIn(tokenClaims);
    }
}

async function ssoLogin() {
    try {
        window.bearerToken = await Office.auth.getAccessToken();
        if (!window.bearerToken) {
            document.getElementById('credits').innerHTML = '<button onclick="fallbackLogin()">Sign In</button>';
            return;
        }
        const tokenClaims = decodeJwt(window.bearerToken);
        await handlePostSignIn(tokenClaims);
    } catch (error) {
        document.getElementById('credits').innerHTML = '<button onclick="fallbackLogin()">Sign In</button>';
    }
}

async function handlePostSignIn(tokenClaims) {
    window.gtag('config', "G-P6GVMW0P9R", {
        user_id: tokenClaims.oid.slice(-12),
    });
    window.gtag('event', 'login');
    // account is not personal
    if (tokenClaims.tid !== '9188040d-6c67-4c5b-b112-36a304b66dad') {
        const user = await userAccount();
        window.credits = user.credits;
    } else {
        window.credits = 0;
    }
    // set credits display
    document.getElementById('credits').innerText = `Credits: ${window.credits.toFixed(0)}`;
}

Office.onReady(ssoLogin);
