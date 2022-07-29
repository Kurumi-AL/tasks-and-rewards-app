import { db } from "../firebase-config";
import { doc, updateDoc, Timestamp } from "firebase/firestore";
import { getCurrUser } from "./userService";
import { toast } from "react-toastify";

// Add a new task in collection "users/tasks"
export const addTask = async ({
  newTitle,
  newPoint,
  newComment,
  currUser,
  setCurrUser,
  onClose,
}) => {
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

    toast.success("Added a task successfully!");
  } catch (err) {
    toast.error(err.message);
  }
};

// Delete
export const deleteTask = async ({ task, currUser }) => {
  const itemId = task.timestamp.seconds;

  const userDoc = doc(db, "users", `${currUser.uid}`);

  try {
    const tasks = [...currUser.tasks];
    const newTasks = tasks.filter((task) => task.timestamp.seconds !== itemId);
    await updateDoc(userDoc, {
      tasks: newTasks,
    });
    toast.success("Deleted a task successfully!");
  } catch (err) {
    toast.error(err.message);
  }
};

// Add points to the user account
export const addPoints = async ({ task, currUser }) => {
  const userDoc = doc(db, "users", `${currUser.uid}`);

  try {
    const newTotalPoints = currUser.totalPoints + task.points;

    await updateDoc(userDoc, {
      totalPoints: newTotalPoints,
    });
    toast.success("Added points successfully!");
  } catch (err) {
    toast.error(err.message);
  }
};

// Update tasks
export const updateTasks = async ({ tasks, currUser }) => {
  const userDoc = doc(db, "users", `${currUser.uid}`);

  try {
    await updateDoc(userDoc, {
      tasks: tasks,
    });
  } catch (err) {
    toast.error(err.message);
  }
};
