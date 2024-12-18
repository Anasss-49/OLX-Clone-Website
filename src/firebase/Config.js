import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from 'firebase/auth'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAgT29EqJUbjtx_zN1giBe0z0qovf01lmo",
  authDomain: "olx-clone-82f54.firebaseapp.com",
  projectId: "olx-clone-82f54",
  storageBucket: "olx-clone-82f54.firebasestorage.app",
  messagingSenderId: "356961691743",
  appId: "1:356961691743:web:64362268d43c71f42293ea",
  measurementId: "G-MH98RG0L8E"
};

export const Firebase = initializeApp(firebaseConfig)
export const Fstore = getFirestore(Firebase)
export const Fauth = getAuth(Firebase)
