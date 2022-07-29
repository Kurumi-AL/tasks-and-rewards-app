import { db } from "../firebase-config";
import { collection, query, where, getDocs } from "firebase/firestore";

// Get currnetly logging in user's information
export const getCurrUser = async (currUid) => {
  const q = query(collection(db, "users"), where("uid", "==", currUid));
  const querySnapshot = await getDocs(q);

  if (querySnapshot) {
    let theUser = null;
    querySnapshot.forEach((doc) => {
      theUser = doc.data();
    });
    return theUser;
  } else {
    return {};
  }
};
