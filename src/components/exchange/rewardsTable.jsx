import React, { useState, useContext, useEffect } from "react";
import Popup_Rewards from "./../popup/popup_rewards";
import { UserContext } from "./../../utils/userContext";
import { deleteReward, exchangeReward } from "../../firebase/rewardService";
import { getCurrUser } from "./../../firebase/userService";
import "./exchangeCard.css";

function RewardsTable({
  rewards,
  onDeleteReward,
  onExchange,
  availablePoints,
  getPageData,
  // onToggleModal
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null);

  // const [currUser, setCurrUser] = useContext(UserContext);
  // const [rewards, setRewards] = useState([]);

  useEffect(() => {
    console.log("useEffect in rewardsTable: ", rewards);
    // setRewards(currUser.rewards);
  });

  const raiseToggleModal = ({ reward }) => {
    console.log("raiseToggleModal", reward);
    const index = rewards.indexOf(reward);
    rewards[index] = { ...rewards[index] };
    rewards[index].isModalOpen = !rewards[index].isModalOpen;
    // this.props.onToggleModal(rewards);
  };

  const toggleModal = (reward) => {
    console.log("toggleModal", reward);
    setModalOpen(!modalOpen);
    setSelectedReward(reward);
    console.log(selectedReward);
  };

  const isDisabled = (r) => {
    if (availablePoints >= r.points) return "card";
    return "card-disabled";
  };

  console.log("availablePoints: ", availablePoints);
  return (
    <React.Fragment>
      <div className="row">
        {rewards.map((r) => (
          <div
            key={r.timestamp}
            className="col-sm-3 py-2"
            onClick={() => availablePoints >= r.points && toggleModal(r)}
            // disabled={availablePoints >= r.points ? false : true}
          >
            {/* <div className=${`availablePoints>=r.points ? "card bg-light" : "card-disabled bg-light"`}> */}
            <div
              className={
                availablePoints >= r.points ? "card bg-light" : "card-disabled"
              }
            >
              <div className="card-header">{r.points} pt</div>
              <div className="card-body">
                <h5 className="card-title">{r.name}</h5>
                <p className="card-text">{r.comment}</p>
                {/* <p className="card-text">{r.genre.name}</p> */}
              </div>

              {/* {availablePoints < r.points && <div className="overlay"></div>} */}
            </div>

            {/* <Popup_Rewards
            show={modalOpen}
            onClose={toggleModal({ r })}
            onConfirm={() => onExchange({ r })}
            onDelete={() => onDeleteReward({ r })}
            selectedItem={r}
          /> */}
          </div>
        ))}
        <Popup_Rewards
          show={modalOpen}
          onClose={toggleModal}
          onConfirm={onExchange}
          onDelete={onDeleteReward}
          selectedItem={selectedReward}
        />
      </div>
    </React.Fragment>
  );
}

export default RewardsTable;
