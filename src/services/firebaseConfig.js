// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGmb9P7iOIVZRbMKSzt3PI-sfAgMwwOww",
  authDomain: "elopet-b05eb.firebaseapp.com",
  projectId: "elopet-b05eb",
  storageBucket: "elopet-b05eb.firebasestorage.app",
  messagingSenderId: "711865344895",
  appId: "1:711865344895:web:3c69dcbc15b882d16bf04a",
  measurementId: "G-VWRSQNN5RE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app)