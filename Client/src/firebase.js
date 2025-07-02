// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyC-KJILQHM2jvPV9f09ab54iROk7_iCY7o",
    authDomain: "food-order-website-870bd.firebaseapp.com",
    projectId: "food-order-website-870bd",
    storageBucket: "food-order-website-870bd.firebasestorage.app",
    messagingSenderId: "976586714797",
    appId: "1:976586714797:web:dec4dbe016f803c892a024",
    measurementId: "G-46KX1YL7W2"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
