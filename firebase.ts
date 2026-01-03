// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase config from the web snippet
const firebaseConfig = {
  apiKey: "AIzaSyACeSadG6tMv6IVReEA88i6Od7_ga9COTY",
  authDomain: "family-channel-c63b5.firebaseapp.com",
  projectId: "family-channel-c63b5",
  storageBucket: "family-channel-c63b5.firebasestorage.app",
  messagingSenderId: "596654349778",
  appId: "1:596654349778:web:54feefb4599dc12bd0bc0b"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);