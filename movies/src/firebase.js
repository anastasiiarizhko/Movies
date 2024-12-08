// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "movies-d0c9d.firebaseapp.com",
  projectId: "movies-d0c9d",
  storageBucket: "movies-d0c9d.firebasestorage.app",
  messagingSenderId: "577989997377",
  appId: "1:577989997377:web:5a2a7b64859591b5abe7c0",
  measurementId: "G-LQ1EPPXQY5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export default app;