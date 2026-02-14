// src/firebase.ts

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJf_ovsL-2v4s5MNFlk1DZhmHXUdqSU9g",
  authDomain: "hr-details-mini-01.firebaseapp.com",
  projectId: "hr-details-mini-01",
  storageBucket: "hr-details-mini-01.firebasestorage.app",
  messagingSenderId: "862868841404",
  appId: "1:862868841404:web:9f72fb4866e8eaea4341b9",
  measurementId: "G-RCE60ZFYN5",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);