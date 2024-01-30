// importing firebase modules
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, addDoc, collection } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "coursehub-9a761.firebaseapp.com",
  projectId: "coursehub-9a761",
  storageBucket: "coursehub-9a761.appspot.com",
  messagingSenderId: "740574193119",
  appId: "1:740574193119:web:7ddc31318a13a40499906a",
  measurementId: "G-66H6N6L8G1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(); // Use getAuth() to get the authentication instance
const googleAuthProvider = new GoogleAuthProvider();
const firestore = getFirestore(); // Use getFirestore() to get the Firestore instance

export { firestore, auth, googleAuthProvider };
