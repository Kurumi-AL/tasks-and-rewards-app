import React, { Component } from "react";
import { deleteReward, getRewards } from "./../../services/fakeRewardsData";
import SearchBox from "../../elements/searchBox";
import RewardsTable from "./rewardsTable";
import { toast } from "react-toastify";
import _ from "lodash";
import "./exchange.css";

class Exchange extends Component {
  state = {
    rewards: getRewards(),
    sortColumn: { order: "asc" },
    searchQuery: "",
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query });
  };

  getPageData = () => {
    const { sortColumn, searchQuery, rewards: allRewards } = this.state;

    let filtered = allRewards;
    if (searchQuery)
      filtered = allRewards.filter((r) =>
        r.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    const sorted = _.orderBy(filtered, ["point"], [sortColumn.order]);
    return { totalCount: sorted.length, data: sorted };
  };

  raiseSort = () => {
    const sortColumn = { ...this.state.sortColumn };
    sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";

    this.handleSort(sortColumn);
  };

  handleAddNewReward = () => {
    console.log("add");
  };

  handleDelete = async (selectedReward) => {
    const originalRewards = this.state.rewards;
    const rewards = originalRewards.filter((r) => r.id !== selectedReward.id);
    this.setState({ rewards });
    try {
      await deleteReward(selectedReward.id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This reward has already been deleted.");

      this.setState({ rewards: originalRewards });
    }
  };

  render() {
    const { sortColumn, searchQuery } = this.state;
    const { totalCount, data: rewards } = this.getPageData();

    return (
      <div className="container">
        <div className="text-center title">
          <h3>You've worked so hard!</h3>
          <h3>Choose rewards to exchange with your points :)</h3>
        </div>

        <SearchBox
          className="search-box"
          value={searchQuery}
          onChange={this.handleSearch}
        />

        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => this.raiseSort()}
        >
          Sort by point
        </button>

        <button
          type="button"
          className="btn btn-secondary btn-add"
          onClick={() => this.handleAddNewReward()}
        >
          Add a new reward
        </button>

        <RewardsTable rewards={rewards} onDelete={this.handleDelete} />
      </div>
    );
  }
}

export default Exchange;
