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
import firebaseApp from "firebase-app";
// import Tasks from "../components/tasks/tasks";
import { getCurrUser } from "./userService";

// Add a new task in collection "users/tasks"
export const addTask = async ({
  newTitle,
  newPoint,
  newComment,
  currUser,
  setCurrUser,
  onClose,
}) => {
  console.log("addTask: ", currUser);

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

    await updateDoc(userDoc, {
      tasks: tasks,
    });

    // Get updated user
    const updatedUser = await getCurrUser(currUser.uid);
    setCurrUser(updatedUser);
    onClose();
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// Delete
export const deleteTask = async ({ task, currUser }) => {
  console.log("deleteTask: ", task);
  const itemId = task.timestamp.seconds;

  const userDoc = doc(db, "users", `${currUser.uid}`);

  try {
    const tasks = [...currUser.tasks];
    const newTasks = tasks.filter((task) => task.timestamp.seconds !== itemId);
    await updateDoc(userDoc, {
      tasks: newTasks,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// Add point to the user account
export const addPoints = async ({ task, currUser }) => {
  const userDoc = doc(db, "users", `${currUser.uid}`);

  try {
    const newTotalPoints = currUser.totalPoints + task.points;

    await updateDoc(userDoc, {
      totalPoints: newTotalPoints,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
