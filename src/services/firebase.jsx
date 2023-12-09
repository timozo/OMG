// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, set, ref, push, get, remove, onValue } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDrmXIfXZHMwgb8jrYP2o9ezeR7O_WuOIc",
  authDomain: "omg-db-97fa1.firebaseapp.com",
  databaseURL: "https://omg-db-97fa1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "omg-db-97fa1",
  storageBucket: "omg-db-97fa1.appspot.com",
  messagingSenderId: "113740184638",
  appId: "1:113740184638:web:3bbdba6a73fecfd6efe56f",
  measurementId: "G-GSEK9D22FP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const firestore = getFirestore(app);

export { app, auth, database, firestore, signInWithEmailAndPassword, createUserWithEmailAndPassword, set, ref, get, remove, push, onValue };