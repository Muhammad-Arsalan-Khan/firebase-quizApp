import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

import { doc, setDoc, getFirestore, getDoc, collection, getDocs, addDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
//import { getDatabase } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDFBZfxGKAqqByruB9ErLZzhstgIwzx_yk",
  authDomain: "my-first-firebase-projec-c24e3.firebaseapp.com",
  projectId: "my-first-firebase-projec-c24e3",
  storageBucket: "my-first-firebase-projec-c24e3.firebasestorage.app",
  messagingSenderId: "222737038297",
  appId: "1:222737038297:web:9bde3f530bb5ef89c9f7c8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

// Initialize Realtime Database and get a reference to the service
//const database = getDatabase(app); 
const db = getFirestore(app);

export {
  app,
  db,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  doc, setDoc,
  auth,
  getDoc,
  collection, addDoc,
  getDocs,
  updateDoc,
};
