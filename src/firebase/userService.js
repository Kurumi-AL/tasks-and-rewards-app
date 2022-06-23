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
// const people = [
//   { id: "1", name: "oja", job: { title: "react pro", salary: "1 million" } },
//   { id: "3", name: "baka" },
//   { id: "2", name: "oku" },
// ];

// // delete
// const deletePerson = (id) => {
//   const person = people.find((person) => person.id === id);
//   person.job.title = "react noob";
//   return people.filter((person) => person.id !== id);
// };

// get currently logging in user DATA from database
export const getCurrUser = async (currUid) => {
  console.log("getCurrUser");
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
