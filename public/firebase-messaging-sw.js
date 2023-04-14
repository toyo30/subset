// Import and configure the Firebase SDK
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.9/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.9/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id",
});

const messaging = firebase.messaging();
