import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_ACCOUNT_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_ACCOUNT_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_ACCOUNT_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_ACCOUNT_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_ACCOUNT_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_ACCOUNT_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, db, auth };
