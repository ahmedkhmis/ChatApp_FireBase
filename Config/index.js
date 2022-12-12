// Import the functions you need from the SDKs you need
import app from "firebase/compat/app";
import  "firebase/compat/auth";
import  "firebase/compat/database";
import  "firebase/compat/storage";
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlsRNO-dT322eMcDK6yVWSQcQKlTvoTJQ",
  authDomain: "chatappissat2022-18a54.firebaseapp.com",
  databaseURL: "https://chatappissat2022-18a54-default-rtdb.firebaseio.com",
  projectId: "chatappissat2022-18a54",
  storageBucket: "chatappissat2022-18a54.appspot.com",
  messagingSenderId: "464892438587",
  appId: "1:464892438587:web:54ec0f494de9b5d94c941e",
  measurementId: "G-HH3ZT78DT9"
};

// Initialize Firebase
const initfirebase = app.initializeApp(firebaseConfig);
export const auth = getAuth();
export const database = getFirestore();
export default initfirebase;