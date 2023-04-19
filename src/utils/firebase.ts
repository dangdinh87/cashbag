function initFirebaseApp(callback?) {
  if (typeof window === 'undefined') {
    return;
  }
  const firebaseConfig = {
    apiKey: process.env.FB_API_KEY,
    authDomain: process.env.FB_AUTH_DOMAIN,
    projectId: process.env.FB_PROJECT_ID,
    storageBucket: process.env.FB_STORAGE_BUCKET,
    messagingSenderId: process.env.FB_MESSAGING_SENDER,
    appId: process.env.FB_APP_ID,
    measurementId: process.env.FB_MEASUREMENT_ID,
  };

  // Initialize Firebase
  return import('firebase/app').then((firebase) => {
    import('firebase/analytics').then((analytic) => {
      const app = firebase.initializeApp(firebaseConfig);
      analytic.getAnalytics(app);
      callback?.();
    });
  });
}

export default {
  initFirebaseApp,
};
