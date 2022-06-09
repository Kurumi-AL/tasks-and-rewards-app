import React, { Component, useEffect } from "react";
import SearchBox from "../../elements/searchBox";
import TasksTable from "./tasksTable";
import Pagination from "../../elements/pagination";
import Popup_Form from "../popup/popup_form";
import { getTasks } from "../../services/fakeTasksData";
import { paginate } from "./../../utils/paginate";
import { getCurrUser } from "./../../firebase/userService";
import { deleteTask, addPoints } from "../../firebase/taskService";

import _ from "lodash";

class Tasks extends Component {
  state = {
    tasks: [],
    currUser: this.props.user,
    currentPage: 1,
    pageSize: 8,
    sortColumn: { path: "name", order: "asc" },
    searchQuery: "",
    modalOpen: false,
  };

  // constructor(props) {
  //   super(props);

  //   const currentUid = props.user.uid;

  //   const currUser = getCurrUser(currentUid);
  //   this.setState({ currUser });
  // }

  componentDidMount = () => {
    console.log("componentDidMount in tasks");

    // Get current user
    // auth.onAuthStateChanged(async (user) => {
    //   if (user) {
    //     const userData = await getCurrentUser(user.uid);
    //     this.setState({ currUser: userData });
    //   }
    // });
    const currUser = this.props.user;
    this.setState({ currUser });
    console.log("currUser: ", this.state.currUser);

    // Get tasks from database
    const tasks = this.state.currUser.tasks;
    this.setState({ tasks });
  };

  toggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };

  updateTasks = (tasks) => {
    this.setState({ tasks });
  };

  handleConfirm = () => {
    console.log("Added a new task");
    this.toggleModal();
  };

  // handleAddPoint = (task) => {
  //   console.log("added");
  // };

  // handleDelete = (task) => {
  //   const tasks = this.state.tasks.filter((t) => t.id !== task.id);
  //   this.setState({ tasks });
  // };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleAddNewTask = () => {
    console.log("handle add new task");
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPageData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      searchQuery,
      tasks: allTasks,
    } = this.state;

    let filtered = allTasks;
    if (searchQuery)
      filtered = allTasks.filter((t) =>
        t.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const tasks = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: tasks };
  };

  render() {
    const { length: count } = this.state.tasks;
    const { pageSize, currentPage, user, sortColumn, searchQuery } = this.state;

    const { totalCount, data: tasks } = this.getPageData();

    console.log("Tasks: ", user);

    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-2"></div>
            <div className="col-xl">
              <SearchBox value={searchQuery} onChange={this.handleSearch} />

              <TasksTable
                tasks={tasks}
                sortColumn={sortColumn}
                onAddPoints={addPoints}
                onDelete={deleteTask}
                onSort={this.handleSort}
              />

              <Pagination
                itemsCount={totalCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={this.handlePageChange}
              />
            </div>
            <div className="col-2"></div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={this.toggleModal}
            type="button"
            className="btn btn-success btn-lg text-center"
          >
            Add a new task!
          </button>
        </div>

        <Popup_Form
          show={this.state.modalOpen}
          onClose={this.toggleModal}
          path="tasks"
          currUser={user}
          // onConfirm={handleTaskSubmit}
        />
      </React.Fragment>
    );
  }
}

export default Tasks;
