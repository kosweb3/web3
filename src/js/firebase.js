import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDWDTI7nRjH17h4HGy7naz_f3k-liYToTk",
  authDomain: "web3-dd175.firebaseapp.com",
  projectId: "web3-dd175",
  storageBucket: "web3-dd175.appspot.com",
  messagingSenderId: "535389489282",
  appId: "1:535389489282:web:ddae34082991824310cc9b",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, db, auth };
