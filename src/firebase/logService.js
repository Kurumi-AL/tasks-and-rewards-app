import { db, auth, googleProvider } from "../firebase-config";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getCurrUser } from "./userService";
import { toast } from "react-toastify";

// Login with Google account
const signInWithGoogle = async (setCurrUser) => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;

    const theUser = await getCurrUser(user.uid);
    await setCurrUser(theUser);

    toast.success("Hi, " + theUser.name + "!");
  } catch (err) {
    toast.error(err.message);
  }
};

// Register with Google account
const registerWithGoogle = async (setCurrUser) => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name: user.displayName,
      authProvider: user.providerId,
      email: user.email,
      totalPoints: 0,
      tasks: [],
      rewards: [],
      exchangedRewards: [],
    });

    const theUser = await getCurrUser(user.uid);
    await setCurrUser(theUser);

    toast.success("Hi, " + theUser.name + "!");
  } catch (err) {
    toast.error(err.message);
  }
};

// Sign in with email and password
const logInWithEmailAndPassword = async (email, password, setCurrUser) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const user = res.user;

    const theUser = await getCurrUser(user.uid);
    await setCurrUser(theUser);

    toast.success("Welcome back, " + theUser.name + "!");
  } catch (err) {
    toast.error(err.message);
  }
};

// Register a user with an email and password
const registerWithEmailAndPassword = async (
  name,
  email,
  password,
  setCurrUser
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
      totalPoints: 0,
      tasks: [],
      rewards: [],
      exchangedRewards: [],
    });

    const theUser = await getCurrUser(user.uid);
    await setCurrUser(theUser);
    toast.success("Hello " + theUser.name + "!");
  } catch (err) {
    toast.error(err.message);
  }
};

// Send a password reset link to an email address
const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    toast.success("Just sent you an email!");
  } catch (err) {
    toast.error(err.message);
  }
};

// Logout
const logout = async () => {
  try {
    await signOut(auth);
    toast.success("Logged out successfully!");
    window.location = "/";
  } catch (err) {
    toast.error(err.message);
  }
};

export {
  signInWithGoogle,
  registerWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
