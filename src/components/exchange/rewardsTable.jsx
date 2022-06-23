import React, { useState, useContext, useEffect } from "react";
import Popup_Rewards from "./../popup/popup_rewards";
import { UserContext } from "./../../utils/userContext";
import { deleteReward, exchangeReward } from "../../firebase/rewardService";
import { getCurrUser } from "./../../firebase/userService";
import "./exchangeCard.css";

function RewardsTable({ getPageData }) {
  const [currUser, setCurrUser] = useContext(UserContext);
  const [rewards, setRewards] = useState([]);

  useEffect(() => {
    console.log("useEffect in rewardsTable: ", currUser);
    setRewards(currUser.rewards);
  }, [currUser]);

  const raiseToggleModal = (reward) => {
    const rewards = [...this.props.rewards];
    const index = rewards.indexOf(reward);
    rewards[index] = { ...rewards[index] };
    rewards[index].isModalOpen = !rewards[index].isModalOpen;
    this.props.onToggleModal(rewards);
  };

  const handleDeleteReward = async ({ reward }) => {
    console.log("handleDeleteReward");
    await deleteReward({ reward, currUser });

    const updatedUser = await getCurrUser(currUser.uid);
    setCurrUser(updatedUser);
    getPageData();
  };

  const handleExchange = async ({ reward }) => {
    console.log("handleExchange");
    await exchangeReward({ reward, currUser });

    const updatedUser = await getCurrUser(currUser.uid);
    setCurrUser(updatedUser);
    getPageData();
  };

  return (
    <div className="row">
      {rewards.map((r) => (
        <div
          key={r.id}
          className="col-sm-3 py-2"
          onClick={() => this.raiseToggleModal(r)}
        >
          <div className="card bg-light">
            <div className="card-header">{r.points} pt</div>
            <div className="card-body">
              <h5 className="card-title">{r.name}</h5>
              <p className="card-text">{r.comment}</p>
              {/* <p className="card-text">{r.genre.name}</p> */}
            </div>
          </div>
          <Popup_Rewards
            show={r.isModalOpen}
            onClose={() => this.raiseToggleModal(r)}
            onConfirm={() => handleExchange({ r })}
            onDelete={() => handleDeleteReward({ r })}
            selectedItem={r}
          />
        </div>
      ))}
    </div>
  );
}

export default RewardsTable;
