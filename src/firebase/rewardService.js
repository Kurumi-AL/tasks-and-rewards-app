import { db } from "../firebase-config";
import {
  collection,
  query,
  where,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  Timestamp,
} from "firebase/firestore";

// Add a new reward
export const addReward = async ({
  newTitle,
  newPoint,
  newComment,
  currUser,
  onClose,
}) => {
  console.log("addReward");

  // TODO: Change the uid to documentId
  const userDoc = doc(db, "users", `${currUser.uid}`);

  try {
    const rewards = [...currUser.rewards];

    const newReward = {
      name: newTitle,
      points: newPoint,
      comment: newComment,
      timestamp: Timestamp.now(),
    };

    rewards.push(newReward);
    const newFields = { rewards: rewards };

    await updateDoc(userDoc, newFields);

    onClose();
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// Delete
export const deleteReward = async ({ itemId, currUser }) => {
  console.log("deleteReward: ", itemId);

  // TODO: Change the uid to documentId
  const userDoc = doc(db, "users", `${currUser.uid}`);

  try {
    const rewards = currUser.rewards;
    const newRewards = rewards.filter((reward) => reward.timestamp !== itemId);
    const newFields = { rewards: newRewards };
    await updateDoc(userDoc, newFields);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// Sub the points from the user's total points
export const subPoints = async ({ itemId, currUser }) => {
  console.log("subPoints: ", itemId);
  const userDoc = doc(db, "users", `${currUser.uid}`);

  try {
    const rewards = currUser.rewards;
    const theItem = rewards.find((reward) => reward.timestamp === itemId);
    const newFields = { points: currUser.points - theItem.points };
    await updateDoc(userDoc, newFields);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
