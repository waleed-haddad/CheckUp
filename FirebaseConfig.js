// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABTNO93YhbeHJBdmAwFRq4CzND0tjGHJQ",
  authDomain: "checkup-4c500.firebaseapp.com",
  projectId: "checkup-4c500",
  storageBucket: "checkup-4c500.appspot.com",
  messagingSenderId: "758151819768",
  appId: "1:758151819768:web:ce564afcd1689275d8e60d"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
