import { db } from "../firebase-config";
import { getCurrUser } from "./userService";
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
  setCurrUser,
  onClose,
}) => {
  console.log("addReward");

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

    await updateDoc(userDoc, {
      rewards: rewards,
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
export const deleteReward = async ({ reward, currUser }) => {
  console.log("deleteReward: ", reward);
  const itemId = reward.timestamp.seconds;
  const userDoc = doc(db, "users", `${currUser.uid}`);

  try {
    const rewards = [...currUser.rewards];
    const newRewards = rewards.filter(
      (reward) => reward.timestamp.seconds !== itemId
    );
    await updateDoc(userDoc, {
      rewards: newRewards,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// Sub the points from the user's total points
export const exchangeReward = async ({ reward, currUser }) => {
  console.log("exchangeReward: ", reward);
  const userDoc = doc(db, "users", `${currUser.uid}`);

  try {
    const newTotalPoints = currUser.totalPoints - reward.points;

    const exchangedRewards = [...currUser.exchangeRewards];
    exchangedRewards.push(reward);

    await updateDoc(userDoc, {
      totalPoints: newTotalPoints,
      exchangedRewards: exchangedRewards,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
