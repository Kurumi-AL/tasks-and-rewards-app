import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { UserContext } from "../../utils/userContext";
import { getCurrUser } from "./../../firebase/userService";
import { exchangeReward, deleteReward } from "./../../firebase/rewardService";
import SearchBox from "../../elements/searchBox";
import RewardsTable from "./rewardsTable";
import Popup_Form from "../popup/popup_form";
import _ from "lodash";
import "./exchange.css";

function Exchange() {
  const [currUser, setCurrUser] = useContext(UserContext);
  console.log("Exchange currUser: ", currUser);

  const userRewards = currUser ? currUser.rewards : [];
  const [rewards, setRewards] = useState(userRewards);

  const [sortColumn, setSortColumn] = useState({ order: "asc" });
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    console.log("useEffect in exchange", currUser);
    getPageData();
  }, [currUser, sortColumn, searchQuery]);

  const toggleModal = async () => {
    setModalOpen(!modalOpen);
  };

  const handleDeleteReward = async ({ selectedItem: reward, onClose }) => {
    console.log("handleDeleteReward", reward);
    await deleteReward({ reward, currUser });
    onClose();

    const updatedUser = await getCurrUser(currUser.uid);
    setCurrUser(updatedUser);
    getPageData();
  };

  const handleExchange = async ({ selectedItem: reward, onClose }) => {
    console.log("handleExchange", reward);
    await exchangeReward({ reward, currUser });
    onClose();

    const updatedUser = await getCurrUser(currUser.uid);
    setCurrUser(updatedUser);
    getPageData();
  };

  // const handleSort = (sortColumn) => {
  //   setSortColumn(sortColumn);
  // };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // const handleAddNewReward = () => {
  //   const isAddFormModalOpen = !isAddFormModalOpen;
  //   setIsAddFormModalOpen(isAddFormModalOpen);
  // };

  const handleDelete = async (selectedReward) => {
    console.log("Handle delete");
    const originalRewards = rewards;
    const rewards = originalRewards.filter((r) => r.id !== selectedReward.id);
    setRewards(rewards);
    try {
      await deleteReward(selectedReward);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This reward has already been deleted.");

      setRewards(originalRewards);
    }
  };

  const handleToggleModal = (rewards) => {
    setRewards(rewards);
  };

  const getPageData = () => {
    console.log("getPageData in exchange");
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

    const length = sorted.length;
    setTotalCount(length);

    // return { totalCount: sorted.length, data: sorted };
  };

  const raiseSort = () => {
    console.log("raiseSort", sortColumn);
    sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    setSortColumn(sortColumn);
    console.log(sortColumn);
    getPageData();
    // handleSort(sortColumn);
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
        // onDelete={handleDelete}
        getPageData={getPageData}
        onToggleModal={handleToggleModal}
      />

      <Popup_Form
        show={modalOpen}
        onClose={() => toggleModal()}
        path="rewards"
        // currUser={currUser}
        // genres={genres}
      />
    </div>
  );
}

export default Exchange;
