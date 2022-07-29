import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../utils/userContext";
import { getCurrUser } from "./../../firebase/userService";
import { exchangeReward, deleteReward } from "./../../firebase/rewardService";
import SearchBox from "../../elements/searchBox";
import RewardsTable from "./rewardsTable";
import Popup_Form from "../popup/popup_form";
import _ from "lodash";
import "./exchange.css";

// Exchange page
function Exchange() {
  const [currUser, setCurrUser] = useContext(UserContext);

  const userRewards = currUser ? currUser.rewards : [];
  const [rewards, setRewards] = useState(userRewards);

  const [sortColumn, setSortColumn] = useState({ order: "asc" });
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    getPageData();
  }, [currUser, sortColumn, searchQuery]);

  // Change the status of modalOpen
  const toggleModal = async () => {
    setModalOpen(!modalOpen);
  };

  // Delete the selectedItem (reward)
  const handleDeleteReward = async ({ selectedItem: reward, onClose }) => {
    await deleteReward({ reward, currUser });
    onClose();

    const updatedUser = await getCurrUser(currUser.uid);
    setCurrUser(updatedUser);
    getPageData();
  };

  // Exchange the selectedItem (reward) with the points
  const handleExchange = async ({ selectedItem: reward, onClose }) => {
    await exchangeReward({ reward, currUser });
    onClose();

    const updatedUser = await getCurrUser(currUser.uid);
    setCurrUser(updatedUser);
    getPageData();
  };

  // Serach rewards by name
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Get the page data according to the current condition
  const getPageData = () => {
    const rewards = currUser.rewards;

    if (rewards.length === 0) return;

    const allRewards = [...rewards];
    let filtered = allRewards;
    if (searchQuery)
      filtered = allRewards.filter((r) =>
        r.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    const sorted = _.orderBy(filtered, ["points"], [sortColumn.order]);
    setRewards(sorted);
  };

  // Sort the array
  const raiseSort = () => {
    sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    setSortColumn(sortColumn);
    getPageData();
  };

  return (
    <div className="container">
      <div className="text-center title">
        <h3>You've worked so hard!</h3>
        <h3>Choose rewards to exchange with your points :)</h3>
      </div>

      <SearchBox
        className="search-box"
        value={searchQuery}
        onChange={handleSearch}
      />

      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => raiseSort()}
      >
        Sort by point
      </button>

      <button
        type="button"
        className="btn btn-success btn-add"
        onClick={toggleModal}
      >
        Add a new reward
      </button>

      <RewardsTable
        rewards={rewards}
        onDeleteReward={handleDeleteReward}
        onExchange={handleExchange}
        availablePoints={currUser.totalPoints}
      />

      <Popup_Form
        show={modalOpen}
        onClose={() => toggleModal()}
        path="rewards"
      />
    </div>
  );
}

export default Exchange;
