import { db, auth, googleProvider } from "../firebase-config";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  setDoc,
} from "firebase/firestore";

// Login with google account
const signInWithGoogle = async (onUser) => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    onUser(user);
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        totalPoints: user.totalPoints,
        tasks: user.tasks,
        rewards: user.rewards,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// Sign in with email and password
const logInWithEmailAndPassword = async (email, password, onUser) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const user = res.user;
    // TODO: get the result and store the information somewhere
    onUser(user);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// Register a user with an email and password
const registerWithEmailAndPassword = async (name, email, password, onUser) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    console.log("Register with Email and Password: ", user);
    // TODO: get the result and store the information somewhere
    onUser(user);
    // await setDoc(doc(db, "users"), {
    //   uid: user.uid,
    //   name,
    //   authProvider: "local",
    //   email,
    //   totalPoints: 0,
    //   tasks: [],
    //   rewards: [],
    // });
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
      totalPoints: 0,
      tasks: [],
      rewards: [],
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// Send a password reset link to an email address
const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// Logout
const logout = async () => {
  try {
    await signOut(auth);
    window.location = "/";
    alert("Logged out successfully!");
    console.log("logged out");
  } catch (err) {
    alert(err.message);
  }
};

export {
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
