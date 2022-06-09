import { db } from "../firebase-config";
import {
  collection,
  query,
  where,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";

/** DELETE EXAMPLE */
const people = [
  { id: "1", name: "oja" },
  { id: "3", name: "baka" },
  { id: "2", name: "oku" },
];

// delete
const deletePerson = (id) => {
  return people.filter((person) => person.id !== id);
};

// get currently logging in user from database
export const getCurrUser = async (currUid) => {
  const q = query(collection(db, "users"), where("uid", "==", currUid));
  const querySnapshot = await getDocs(q);

  if (querySnapshot) {
    let theUser = null;
    // return querySnapshot.filter((doc) => doc.uid === currUid);
    querySnapshot.forEach((doc) => {
      theUser = doc.data();
    });
    return theUser;
  } else {
    console.log("no user found");
    return {};
  }
};
