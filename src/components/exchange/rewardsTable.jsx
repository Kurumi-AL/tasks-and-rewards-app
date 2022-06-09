import React, { Component } from "react";
import Popup_Rewards from "./../popup/popup_rewards";
import "./exchangeCard.css";

class RewardsTable extends Component {
  // state = {
  //   rewards: this.props.rewards,
  // };

  raiseToggleModal = (reward) => {
    const rewards = [...this.props.rewards];
    const index = rewards.indexOf(reward);
    rewards[index] = { ...rewards[index] };
    rewards[index].isModalOpen = !rewards[index].isModalOpen;
    this.props.onToggleModal(rewards);
  };

  handleConfirm = () => {
    console.log("Exchanged!");
  };

  render() {
    const { rewards, onDelete, onToggleModal } = this.props;

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
              onConfirm={this.handleConfirm}
              onDelete={onDelete}
              selectedItem={r}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default RewardsTable;
