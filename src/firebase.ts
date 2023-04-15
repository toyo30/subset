// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getMessaging } from "firebase/messaging";
import { getFirestore} from 'firebase/firestore';
import { getDatabase} from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBY0cKVHZHSGHZfYw3wxC2RiA7Ss2LBL-8",
  authDomain: "subset-abd73.firebaseapp.com",
  projectId: "subset-abd73",
  storageBucket: "subset-abd73.appspot.com",
  messagingSenderId: "1002646336340",
  appId: "1:1002646336340:web:a4187dca93d5eba3c8cec1",
  measurementId: "G-PV45ZT9JM4",
  databaseURL: "https://subset-abd73-default-rtdb.asia-southeast1.firebasedatabase.app",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const authService = getAuth(app);
export const analytics = getAnalytics(app);
export const messaging = getMessaging(app);
export const db = getFirestore(app);
export const dbRT = getDatabase(app);