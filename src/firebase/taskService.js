import { db } from "../firebase-config";
import {
  collection,
  query,
  where,
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";

// Add a new task in collection "users/tasks"
export const addTask = async ({
  newTitle,
  newPoint,
  newComment,
  currUser,
  onClose,
}) => {
  console.log("addTask: ", currUser);

  // TODO: substitute `${currUser.uid}` with documentId
  // TODO: How to get a documentId?????
  const userDoc = doc(db, "users", `${currUser.uid}`);

  try {
    // Grab the current tasks[]
    const tasks = [...currUser.tasks];

    // Create a new task object
    const newTask = {
      name: newTitle,
      points: newPoint,
      comment: newComment,
      timestamp: Timestamp.now(),
    };

    // Add the new task object to tasks[]
    tasks.push(newTask);
    const newFields = { tasks: tasks };

    console.log("userDoc: ", userDoc);
    console.log("newFields: ", newFields);

    await updateDoc(userDoc, newFields);

    onClose();
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// Delete
export const deleteTask = async ({ itemId, currUser }) => {
  console.log("deleteTask: ", itemId);

  // TODO: Change the uid to documentId
  const userDoc = doc(db, "users", `${currUser.uid}`);

  try {
    const tasks = currUser.tasks;
    const newTasks = tasks.filter((task) => task.timestamp !== itemId);
    const newFields = { tasks: newTasks };
    await updateDoc(userDoc, newFields);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// Add point to the user account
export const addPoints = async ({ itemId, currUser }) => {
  console.log("addPoints: ", itemId);

  // TODO: Change the uid to documentId
  const userDoc = doc(db, "users", `${currUser.uid}`);

  try {
    const tasks = currUser.tasks;
    const theItem = tasks.find((task) => task.timestamp === itemId);
    const newFields = { points: currUser.points + theItem.points };
    await updateDoc(userDoc, newFields);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
