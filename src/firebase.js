// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
​​import {
    ​​  GoogleAuthProvider,
    ​​  getAuth,
    ​​  signInWithPopup,
    ​​  signInWithEmailAndPassword,
    ​​  createUserWithEmailAndPassword,
    ​​  sendPasswordResetEmail,
    ​​  signOut,
    ​​} from "firebase/auth";
    ​​import {
        ​​  getFirestore,
        ​​  query,
        ​​  getDocs,
        ​​  collection,
        ​​  where,
        ​​  addDoc,
        ​​} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGVdQ1IDptSonL2MPGxxG5o6FoqQTCeto",
  authDomain: "tasks-and-rewards.firebaseapp.com",
  projectId: "tasks-and-rewards",
  storageBucket: "tasks-and-rewards.appspot.com",
  messagingSenderId: "691976205595",
  appId: "1:691976205595:web:463bc6743ec507bf9fcfbe",
  measurementId: "G-5VHXPD1MHC"
};

// Initialize Firebase
const app = ​​initializeApp(firebaseConfig);
​​const auth = getAuth(app);
​​const db = getFirestore(app);
const analytics = getAnalytics(app);

// Login with google account
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async() => {
    try {
        const res = await signInWithPopup(auth,googleProvider);
        const user = res.user;
        const q = query(collection(db, 'users'), where('uid', '==', user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await addDoc(collection(db, 'users'), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
            });
        }
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
}

// Sign in with email and password
const logInWithEmailAndPassword = async(email,password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

// Register a user with an email and password
const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch(err) {
        console.error(err);
        alert(err.message);
    }
};

// Send a password reset link to an email address
const sendPasswordReset = async(email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

// Logout
const logout = () => {
    signOut(auth);
};

export {
    auth,
    db,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
  };