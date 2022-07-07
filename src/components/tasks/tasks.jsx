import React, { Component, useEffect, useState, useContext } from "react";
import { db } from "../../firebase-config";
import SearchBox from "../../elements/searchBox";
import TasksTable from "./tasksTable";
import Pagination from "../../elements/pagination";
import Popup_Form from "../popup/popup_form";
import { getTasks } from "../../services/fakeTasksData";
import { paginate } from "./../../utils/paginate";
import { getCurrUser } from "./../../firebase/userService";
import { deleteTask, addPoints, updateTasks } from "../../firebase/taskService";
import { UserContext } from "../../utils/userContext";
import { doc } from "firebase/firestore";

import _ from "lodash";
import { getDoc } from "firebase/firestore";

function Tasks() {
  const [currUser, setCurrUser] = useContext(UserContext);

  const userTasks = currUser ? currUser.tasks : [];
  const [tasks, setTasks] = useState(userTasks);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [sortColumn, setSortColumn] = useState({ path: "name", order: "asc" });
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    console.log("useEffect in tasks: ", currUser);
    // setTasks(currUser.tasks);
    getPageData();
  }, [currUser, sortColumn, searchQuery]);

  const toggleModal = async () => {
    setModalOpen(!modalOpen);
  };

  const handleUpdateTasks = async ({ newTasks }) => {
    console.log("updateTasks");
    await updateTasks({ newTasks, currUser });

    const updatedUser = await getCurrUser(currUser);
    // await setTasks(tasks);
  };

  const updateUser = async () => {};

  const handleConfirm = () => {
    console.log("Added a new task");
    this.toggleModal();
  };

  const handleDeleteTask = async ({ task }) => {
    console.log("handleDeleteTask", task);
    await deleteTask({ task, currUser });

    const updatedUser = await getCurrUser(currUser.uid);
    setCurrUser(updatedUser);
    getPageData();
  };

  const handleAddPoints = async ({ task }) => {
    console.log("handleAddPoints");
    await addPoints({ task, currUser });

    const updatedUser = await getCurrUser(currUser.uid);
    setCurrUser(updatedUser);
    getPageData();
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAddNewTask = () => {
    console.log("handle add new task");
  };

  const handleSort = (sortColumn) => {
    console.log("handleSort");
    setSortColumn(sortColumn);
    getPageData();
  };

  const handleAddTask = async ({ task }) => {
    console.log("handleAddTask");
  };

  const getPageData = () => {
    console.log("Tasks get page data", currUser);
    const tasks = currUser.tasks;

    if (tasks.length === 0) return;

    const allTasks = [...tasks];

    let filtered = allTasks;
    if (searchQuery)
      filtered = allTasks.filter((t) =>
        t.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const newTasks = paginate(sorted, currentPage, pageSize);
    setTasks(newTasks);

    const totalCount = filtered.length;
    setTotalCount(totalCount);
    // return { totalCount: filtered.length, data: tasks };
  };

  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-2"></div>
          <div className="col-xl">
            <SearchBox value={searchQuery} onChange={handleSearch} />

            <TasksTable
              tasks={tasks}
              sortColumn={sortColumn}
              onDeleteTask={handleDeleteTask}
              onAddPoints={handleAddPoints}
              // onAddPoints={addPoints}
              // onDelete={() => deleteTask()}
              onSort={handleSort}
              getPageData={getPageData}
            />

            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
          <div className="col-2"></div>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={toggleModal}
          type="button"
          className="btn btn-success btn-lg text-center"
        >
          Add a new task!
        </button>
      </div>

      <Popup_Form
        show={modalOpen}
        onClose={toggleModal}
        path="tasks"
        // currUser={currUser}
        // onConfirm={handleTaskSubmit}
      />
    </React.Fragment>
  );
}

export default Tasks;
