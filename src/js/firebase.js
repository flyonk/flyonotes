import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCOkfbZFVu0ZIBErRaTI3Sh7zLv6jaRqks",
  authDomain: "noteballz-feb5a.firebaseapp.com",
  projectId: "noteballz-feb5a",
  storageBucket: "noteballz-feb5a.appspot.com",
  messagingSenderId: "152843528441",
  appId: "1:152843528441:web:a0e93996be12d817d31a28"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };