import React, { Component } from "react";
import MyVerticallyCenteredModal from "../popup/popup";
import "./exchangeCard.css";

const RewardsTable = ({ rewards, onDelete }) => {
  const [modalOpen, setModalOpen] = React.useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleConfirm = () => {
    console.log("Exchanged!");
  };

  return (
    <div className="row">
      {rewards.map((r) => (
        <div key={r.id} className="col-sm-3 py-2" onClick={toggleModal}>
          <div className="card bg-light">
            <div className="card-header">{r.point} pt</div>
            <div className="card-body">
              <h5 className="card-title">{r.name}</h5>
              <p className="card-text">{r.genre}</p>
            </div>
          </div>
          <MyVerticallyCenteredModal
            show={modalOpen}
            onClose={toggleModal}
            onConfirm={handleConfirm}
            onDelete={onDelete}
            selectedReward={r}
          />
        </div>
      ))}
    </div>
  );
};

export default RewardsTable;
