import React, { useEffect, useState, useContext } from "react";
import SearchBox from "../../elements/searchBox";
import TasksTable from "./tasksTable";
import Pagination from "../../elements/pagination";
import Popup_Form from "../popup/popup_form";
import { paginate } from "./../../utils/paginate";
import { getCurrUser } from "./../../firebase/userService";
import { deleteTask, addPoints } from "../../firebase/taskService";
import { UserContext } from "../../utils/userContext";

import _ from "lodash";

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
    getPageData();
  }, [currUser, sortColumn, searchQuery]);

  // Change the status of modalOpen
  const toggleModal = async () => {
    setModalOpen(!modalOpen);
  };

  // Delete the task
  const handleDeleteTask = async ({ task }) => {
    await deleteTask({ task, currUser });

    const updatedUser = await getCurrUser(currUser.uid);
    setCurrUser(updatedUser);
    getPageData();
  };

  // Add points of the task
  const handleAddPoints = async ({ task }) => {
    await addPoints({ task, currUser });

    const updatedUser = await getCurrUser(currUser.uid);
    setCurrUser(updatedUser);
    getPageData();
  };

  // Search for the query
  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  // Update the page information
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Sort the tasks
  const handleSort = (sortColumn) => {
    setSortColumn(sortColumn);
    getPageData();
  };

  // Get the information for the page
  const getPageData = () => {
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

      <Popup_Form show={modalOpen} onClose={toggleModal} path="tasks" />
    </React.Fragment>
  );
}

export default Tasks;
