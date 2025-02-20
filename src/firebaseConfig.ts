// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArzVV4RuBTxxtzndUrHVm867raf02fiHg",
  authDomain: "classinsightwaji-5b3b2.firebaseapp.com",
  projectId: "classinsightwaji-5b3b2",
  storageBucket: "classinsightwaji-5b3b2.firebasestorage.app",
  messagingSenderId: "738715229891",
  appId: "1:738715229891:web:b50ddf86f1f13ca4b90c76",
  measurementId: "G-9VWPLMDH15"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore();

export { db };

// Initialize Firebase Authentication
export const auth = getAuth(app);

export default app;