# Running client-side code in Google Sheets with Firebase Cloud Messaging

Yes, you can use external notification mechanisms such as [Firebase Cloud Messaging (FCM)](https://firebase.google.com/docs/cloud-messaging/js/receive) to notify the client of a new job. This approach involves:

1. **Setting up Firebase Cloud Messaging**: Create a Firebase project and configure FCM.
2. **Modifying the Sidebar HTML/JavaScript**: Integrate FCM to receive notifications.
3. **Modifying the Google Apps Script**: Send notifications to FCM when a new job is added.

### Step-by-Step Plan

1. **Set up Firebase Cloud Messaging**:
    - Create a Firebase project.
    - Configure FCM and obtain the server key and sender ID.
    - Add Firebase SDK to your sidebar HTML.

2. **Modify the Sidebar HTML/JavaScript**:
    - Integrate FCM to receive notifications.
    - Handle incoming notifications to process new jobs.

3. **Modify the Google Apps Script**:
    - Send notifications to FCM when a new job is added.

### Code Implementation

#### 1. Set up Firebase Cloud Messaging

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Create a new project.
3. Navigate to the project settings and select the "Cloud Messaging" tab.
4. Obtain the server key and sender ID.

#### 2. Modify the Sidebar HTML/JavaScript

```html
<!-- Sidebar.html -->
<!DOCTYPE html>
<html>
  <head>
    <base target="_top">
    <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging.js"></script>
    <script>
      // Firebase configuration
      const firebaseConfig = {
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_PROJECT_ID.appspot.com",
        messagingSenderId: "YOUR_SENDER_ID",
        appId: "YOUR_APP_ID"
      };

      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);

      // Initialize Firebase Cloud Messaging
      const messaging = firebase.messaging();

      // Request permission to receive notifications
      messaging.requestPermission()
        .then(() => messaging.getToken())
        .then(token => {
          console.log('FCM Token:', token);
          // Send the token to the server to subscribe to notifications
          google.script.run.subscribeToNotifications(token);
        })
        .catch(error => console.error('Error getting FCM token:', error));

      // Handle incoming messages
      messaging.onMessage(payload =>

 {


        console.log('Message received:', payload);
        const job = payload.data;
        const result = performCalculations(job);
        google.script.run.updateJobResult(job.id, result);
      });

      function performCalculations(data) {
        // Perform calculations here
        return "Calculated: " + data.input;
      }
    </script>
  </head>
  <body>
    <h1>Sidebar</h1>
  </body>
</html>
```

#### 3. Modify the Google Apps Script

```javascript
// Code.gs
function addJob(input) {
  const properties = PropertiesService.getScriptProperties();
  const jobId = new Date().getTime().toString(); // Use timestamp as job ID
  const job = { id: jobId, input: input, status: 'pending' };
  properties.setProperty(jobId, JSON.stringify(job));

  // Send notification to FCM
  sendNotification(job);

  return jobId;
}

function sendNotification(job) {
  const url = 'https://fcm.googleapis.com/fcm/send';
  const token = PropertiesService.getScriptProperties().getProperty('FCM_TOKEN');
  const payload = {
    to: token,
    data: job
  };
  const options = {
    method: 'post',
    contentType

:

 'application/json',
    headers: {
      'Authorization': 'key=YOUR_SERVER_KEY'
    },
    payload: JSON.stringify(payload)
  };
  UrlFetchApp.fetch(url, options);
}

function subscribeToNotifications(token) {
  PropertiesService.getScriptProperties().setProperty('FCM_TOKEN', token);
}

function updateJobResult(jobId, result) {
  const properties = PropertiesService.getScriptProperties();
  const job = JSON.parse(properties.getProperty(jobId));
  job.result = result;
  job.status = 'completed';
  properties.setProperty(jobId, JSON.stringify(job));
}

function getJobResult(jobId) {
  const properties = PropertiesService.getScriptProperties();
  const job = JSON.parse(properties.getProperty(jobId));
  return job.status === 'completed' ? job.result : null;
}

function customFunction(input) {
  const jobId = addJob(input);
  const startTime = new Date().getTime();
  const timeout = 25000; // 25 seconds to ensure we don't hit the 30-second limit

  // Poll for the result
  let result = null;
  while (!result && (new Date().getTime() - startTime) < timeout) {
    result = getJobResult(jobId);
    if (!result) {
      Utilities.sleep(1000); // Wait for 1 second before polling again
    }
  }

  if (!result) {
    throw new Error("Calculation timed out. Please try again.");
  }

  return result;
}
```

### Summary

- The custom function adds a job to `PropertiesService` and sends a notification to FCM.
- The sidebar receives the notification via FCM and processes the job.
- The sidebar updates the job status in `PropertiesService`.
- The custom function polls `PropertiesService` for the result and returns it.

This setup ensures that the client is notified of new jobs without continuous polling, leveraging Firebase Cloud Messaging for efficient notifications.