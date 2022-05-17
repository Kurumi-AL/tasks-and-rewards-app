import React, { Component } from "react";
import SearchBox from "../../elements/searchBox";
import TasksTable from "./tasksTable";
import Pagination from "../../elements/pagination";
import { getTasks } from "../../services/fakeTasksData";
import { paginate } from "./../../utils/paginate";
import _ from "lodash";

class Tasks extends Component {
  state = {
    tasks: getTasks(),
    currentPage: 1,
    pageSize: 8,
    sortColumn: { path: "name", order: "asc" },
    searchQuery: "",
  };

  handleAddPoint = (task) => {
    console.log("added");
  };

  handleDelete = (task) => {
    const tasks = this.state.tasks.filter((t) => t.id !== task.id);
    this.setState({ tasks });
  };

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
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    const { totalCount, data: tasks } = this.getPageData();

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
                onAddPoint={this.handleAddPoint}
                onDelete={this.handleDelete}
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
            onClick={this.handleAddNewTask}
            type="button"
            className="btn btn-success btn-lg text-center"
          >
            Add a new task!
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default Tasks;
