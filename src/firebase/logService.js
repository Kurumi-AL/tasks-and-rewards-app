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
  CollectionReference,
} from "firebase/firestore";
import { element } from "prop-types";
import { getCurrUser } from "./userService";

// Login with google account
const signInWithGoogle = async (onUser) => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    onUser(user);
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await setDoc(doc(db, "users", user.uid), {
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
const logInWithEmailAndPassword = async (email, password, setCurrUser) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const user = res.user;

    const theUser = await getCurrUser(user.uid);
    await setCurrUser(theUser);
    // onUser(user);
  } catch (err) {
    console.error(err);
    alert(err.message);
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
    console.log("Register with Email and Password: ", user);

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

// To get document id
const getDocumentId = async () => {
  let id;
  let value = await CollectionReference.getDocuments();
  value.documents.forEach((element) => {
    id = element.documentId;
  });
  return id;
};

export {
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
