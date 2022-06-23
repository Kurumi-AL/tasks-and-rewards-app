import React, { useState, useEffect, useContext } from "react";
import { deleteReward, getRewards } from "./../../services/fakeRewardsData";
import { toast } from "react-toastify";
import { UserContext } from "../../utils/userContext";
import SearchBox from "../../elements/searchBox";
import RewardsTable from "./rewardsTable";
import Popup_Form from "../popup/popup_form";
import _ from "lodash";
import "./exchange.css";

function Exchange() {
  const [currUser, setCurrUser] = useContext(UserContext);
  const userRewards = currUser.rewards;

  const [rewards, setRewards] = useState(userRewards);
  // const [currUser, setCurrUser] = useState(user);
  const [sortColumn, setSortColumn] = useState({ order: "asc" });
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddFormModalOpen, setIsAddFormModalOpen] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    console.log("useEffect in exchange", currUser);
    getPageData();
  });

  const handleSort = (sortColumn) => {
    setSortColumn(sortColumn);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleAddNewReward = () => {
    const isAddFormModalOpen = !isAddFormModalOpen;
    setIsAddFormModalOpen(isAddFormModalOpen);
  };

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
    if (rewards.length === 0) return;

    const allRewards = [...rewards];
    let filtered = allRewards;
    if (searchQuery)
      filtered = allRewards.filter((r) =>
        r.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    const sorted = _.orderBy(filtered, ["point"], [sortColumn.order]);

    const length = sorted.length;
    setTotalCount(length);
    setRewards(sorted);

    // return { totalCount: sorted.length, data: sorted };
  };

  const raiseSort = () => {
    const sortColumn = { ...sortColumn };
    sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";

    handleSort(sortColumn);
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

      <button type="button" className="btn btn-secondary" onClick={raiseSort}>
        Sort by point
      </button>

      <button
        type="button"
        className="btn btn-success btn-add"
        onClick={handleAddNewReward}
      >
        Add a new reward
      </button>

      <Popup_Form
        show={isAddFormModalOpen}
        onClose={handleAddNewReward}
        path="rewards"
        // currUser={currUser}
        // genres={genres}
      />

      <RewardsTable
        // rewards={rewards}
        // onDelete={handleDelete}
        getPageData={getPageData}
        onToggleModal={handleToggleModal}
      />
    </div>
  );
}

export default Exchange;
