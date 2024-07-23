// Import the necessary utility for MSAL login
import { msal } from '../utils/msal-login.js';
import { configureApiBaseUrl } from "../utils/routing.js";

// Set apiBaseUrl on the window object
configureApiBaseUrl();

function displayMessage(message) {
    const messageDiv = document.getElementById('message');
    messageDiv.innerText = message;
}

document.addEventListener('DOMContentLoaded', main);

async function main() {
    // Hide activateButton by default
    const activateButton = document.getElementById('activateButton');
    activateButton.style.display = 'none';

    try {
        // Get the token from the URL
        const token = new URLSearchParams(window.location.search).get('token');
        if (!token) throw Error('Token is missing from link. Please go back to your AppSource subscription purchase confirmation page or email and click the link again.');

        // Resolve the token to get subscription data
        const response = await fetch(`${apiBaseUrl}/saas-resolve?token=${encodeURIComponent(token)}`);
        if (!response.ok) throw Error('Failed to resolve subscription, possibly because the link expired.  Please go back to your AppSource subscription purchase confirmation page or email and click the link again.');
        const resolveData = await response.json();

        // Login with login_hint of purchaser email
        const loginResponse = await msal(resolveData.subscription.purchaser.emailId);
        console.log('Login response:', loginResponse);

        // Display subscription info and messages
        displaySubscription(resolveData.subscription);
        setupActivateListener(resolveData.subscription.id);
    } catch (error) {
        displayMessage(error.message);
    }
}

function displaySubscription(subscription) {
    const subscriptionInfo = document.getElementById('subscriptionInfo');
    const table = subscriptionInfo.querySelector('table');
    table.innerHTML = `
        <tr><td>Subscription ID<br>(link to M365 admin portal)</td><td><a href="https://admin.microsoft.com/Adminportal/Home#/subscriptions/assets/${subscription.id}" target="_blank">${subscription.id}</a></td></tr>
        <tr><td>Subscription Name</td><td>${subscription.name}</td></tr>
        <tr><td>Status</td><td>${subscription.saasSubscriptionStatus}</td></tr>
        <tr><td>Purchaser Email</td><td>${subscription.purchaser.emailId}</td></tr>
        <tr><td>Term</td><td>Month</td></tr>
        <tr><td>Auto Renew</td><td>${subscription.autoRenew ? 'Yes' : 'No'}</td></tr>
    `;
    const messages = {
        PendingFulfillmentStart: 'Click Activate to start your subscription. If not activated within 30 days, this subscription will be automatically deleted by AppSource, and you will not be billed.',
        Subscribed: 'Your subscription has already been activated.',
        Suspended: 'Your subscription has been suspended due to payment method failure, please go to the Microsoft 365 Admin portal to resolve using the Subscription ID link above.',
        Unsubscribed: 'Your subscription has been canceled and cannot be reactivated. Please purchase a new subscription in AppSource.',
        default: 'Click Activate to start your subscription.'
    };

    // Display the message based on the subscription status
    displayMessage(messages[subscription.saasSubscriptionStatus] || messages.default);

    // Show the activate button if PendingFulfillmentStart
    if (subscription.saasSubscriptionStatus === 'PendingFulfillmentStart') {
        const activateButton = document.getElementById('activateButton');
        activateButton.style.display = 'block'; // Show the button
    }
}

function setupActivateListener(subscriptionId) {
    const activateButton = document.getElementById('activateButton');
    activateButton.addEventListener('click', async () => {
        activateButton.disabled = true; // Disable the button 
        displayMessage('Activating your subscription...');
        try {
            const response = await fetch(`${apiBaseUrl}/saas-activate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ subscriptionId })
            });
            if (!response.ok) throw new Error('Activation failed.');
            displayMessage('Your subscription has been activated.');
            activateButton.style.display = 'none'; // Hide the button
        } catch (error) {
            displayMessage(`We ran into a problem, please try again. Error: ${error.message}`);
            activateButton.disabled = false;
        }
    });
}