import { initializeApp } from "firebase/app";
import { getFirestore, initializeFirestore } from "firebase/firestore";

// Firebase configuration using Vite environment variables for client side
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firestore with settings for Node.js environment
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  useFetchStreams: false,
});

// Only initialize analytics in browser environment
// if (typeof window !== "undefined") {
//   const { getAnalytics } = await import("firebase/analytics");
//   const analytics = getAnalytics(app);
// }

// Only initialize analytics in browser environment
if (typeof window !== "undefined") {
  (async () => {
    const { getAnalytics } = await import("firebase/analytics");
    const analytics = getAnalytics(app);
  })();
}
