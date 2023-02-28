import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAAWXc8JaEPnCca7woG7x2BWGL7kPIJXP0",
  authDomain: "trading-dbbfe.firebaseapp.com",
  projectId: "trading-dbbfe",
  storageBucket: "trading-dbbfe.appspot.com",
  messagingSenderId: "1093434645789",
  appId: "1:1093434645789:web:487c8c37d811c8f335d5f4",
};

const app = initializeApp(firebaseConfig);

export const authService = getAuth(app);
export const dbService = getFirestore();
export const realtimeDbService = getDatabase();
