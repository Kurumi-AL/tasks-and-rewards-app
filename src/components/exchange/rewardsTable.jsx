import React, { useState } from "react";
import Popup_Rewards from "./../popup/popup_rewards";

import "./exchangeCard.css";

function RewardsTable({
  rewards,
  onDeleteReward,
  onExchange,
  availablePoints,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null);

  // Change the status of modalOpen to show/hide the popup
  const toggleModal = (reward) => {
    setModalOpen(!modalOpen);
    setSelectedReward(reward);
  };

  return (
    <React.Fragment>
      <div className="row">
        {rewards.map((r) => (
          <div
            key={r.timestamp}
            className="col-sm-3 py-2"
            onClick={() => availablePoints >= r.points && toggleModal(r)}
          >
            <div
              className={
                availablePoints >= r.points ? "card bg-light" : "card-disabled"
              }
            >
              <div className="card-header">{r.points} pt</div>
              <div className="card-body">
                <h5 className="card-title">{r.name}</h5>
                <p className="card-text">{r.comment}</p>
              </div>
            </div>
          </div>
        ))}
        <Popup_Rewards
          show={modalOpen}
          selectedItem={selectedReward}
          onClose={toggleModal}
          onConfirm={onExchange}
          onDelete={onDeleteReward}
        />
      </div>
    </React.Fragment>
  );
}

export default RewardsTable;
