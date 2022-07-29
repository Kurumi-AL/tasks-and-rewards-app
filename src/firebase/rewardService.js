import { db } from "../firebase-config";
import { getCurrUser } from "./userService";
import { doc, updateDoc, Timestamp } from "firebase/firestore";
import { toast } from "react-toastify";

// Add a new reward
export const addReward = async ({
  newTitle,
  newPoint,
  newComment,
  currUser,
  setCurrUser,
  onClose,
}) => {
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

    toast.success("Added reward successfully!");

    // Get updated user
    const updatedUser = await getCurrUser(currUser.uid);
    setCurrUser(updatedUser);
    onClose();
  } catch (err) {
    toast.error(err.message);
  }
};

// Delete a reward
export const deleteReward = async ({ reward, currUser }) => {
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

    toast.success("Deleted reward successfully!");
  } catch (err) {
    toast.error(err.message);
  }
};

// Sub the points from the user's total points
export const exchangeReward = async ({ reward, currUser }) => {
  const userDoc = doc(db, "users", `${currUser.uid}`);

  try {
    const newTotalPoints = currUser.totalPoints - reward.points;

    const exchangedRewards = [...currUser.exchangedRewards];
    exchangedRewards.push(reward);

    await updateDoc(userDoc, {
      totalPoints: newTotalPoints,
      exchangedRewards: exchangedRewards,
    });

    toast.success("Exchanged reward successfully!");
  } catch (err) {
    toast.error(err.message);
  }
};
