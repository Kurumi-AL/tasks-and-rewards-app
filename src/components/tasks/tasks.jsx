import React, { Component, useEffect, useState, useContext } from "react";
import { db } from "../../firebase-config";
import SearchBox from "../../elements/searchBox";
import TasksTable from "./tasksTable";
import Pagination from "../../elements/pagination";
import Popup_Form from "../popup/popup_form";
import { getTasks } from "../../services/fakeTasksData";
import { paginate } from "./../../utils/paginate";
import { getCurrUser } from "./../../firebase/userService";
import { deleteTask, addPoints } from "../../firebase/taskService";
import { UserContext } from "../../utils/userContext";
import { doc } from "firebase/firestore";

import _ from "lodash";
import { getDoc } from "firebase/firestore";

function Tasks() {
  const [currUser, setCurrUser] = useContext(UserContext);

  // const userTasks = currUser ? currUser.tasks : [];

  // const [tasks, setTasks] = useState(userTasks);
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
  }, [currUser]);

  const toggleModal = async () => {
    setModalOpen(!modalOpen);

    // const docRef = doc(db, "users", currUser.uid);
    // const docSnap = await getDoc(docRef);
    // getPageData();

    // await updateTasks(docSnap.data().tasks);

    // const docRef = doc(db, "users", currUser.uid);
    // const docSnap = await getDoc(docRef);
    // await updateTasks();
  };

  const updateTasks = async (tasks) => {
    console.log("updateTasks");

    // await setTasks(tasks);
  };
  // const updateTasks = async () => {
  //   const docRef = doc(db, "users", currUser.uid);
  //   const docSnap = await getDoc(docRef);

  //   await setTasks(docSnap.data().tasks);
  // };

  const handleConfirm = () => {
    console.log("Added a new task");
    this.toggleModal();
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
              // tasks={tasks}
              sortColumn={sortColumn}
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
