import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDGVdQ1IDptSonL2MPGxxG5o6FoqQTCeto",
  authDomain: "tasks-and-rewards.firebaseapp.com",
  projectId: "tasks-and-rewards",
  storageBucket: "tasks-and-rewards.appspot.com",
  messagingSenderId: "691976205595",
  appId: "1:691976205595:web:463bc6743ec507bf9fcfbe",
  measurementId: "G-5VHXPD1MHC",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
