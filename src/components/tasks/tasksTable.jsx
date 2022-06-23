import React, { useState, useEffect, useContext } from "react";
import TableHeader from "../../elements/tableHeader";
import { db } from "../../firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { getCurrUser } from "../../firebase/userService";
import { UserContext } from "../../utils/userContext";
import { deleteTask, addPoints } from "../../firebase/taskService";

function TasksTable({ sortColumn, onSort, getPageData }) {
  const [columns, setColumns] = useState([
    { path: "name", label: "Task name" },
    { path: "points", label: "Points" },
    { key: "add", label: "Add points" },
    { key: "delete", label: "Delete" },
  ]);
  const [currUser, setCurrUser] = useContext(UserContext);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    console.log("useEffect in tasksTable: ", currUser);
    setTasks(currUser.tasks);
  }, [currUser]);

  const renderSortIcon = (column) => {
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc"></i>;

    return <i className="fa fa-sort-desc"></i>;
  };

  const handleDeleteTask = async ({ task }) => {
    console.log("handleDeleteTask");
    await deleteTask({ task, currUser });

    const updatedUser = await getCurrUser(currUser.uid);
    setCurrUser(updatedUser);
    getPageData();
    // updateTasks(currUser.tasks);
  };

  const handleAddPoints = async ({ task }) => {
    console.log("handleAddPoints");
    await addPoints({ task, currUser });

    const updatedUser = await getCurrUser(currUser.uid);
    setCurrUser(updatedUser);
    getPageData();
  };

  return (
    <table className="table">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />

      <tbody>
        {tasks.map((task) => (
          <tr key={task.timestamp}>
            <td style={{ width: 55 + "%" }}>{task.name}</td>
            <td className="text-end" style={{ width: 15 + "%" }}>
              {task.points} pt
            </td>
            <td className="text-center" style={{ width: 15 + "%" }}>
              {" "}
              <button
                onClick={() => handleAddPoints({ task })}
                type="btn btn-sm"
                className="btn btn-outline-dark"
              >
                +
              </button>
            </td>
            <td style={{ width: 15 + "%" }}>
              {" "}
              <button
                onClick={() => handleDeleteTask({ task })}
                type="btn btn-sm"
                className="btn btn-outline-dark"
              >
                -
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TasksTable;
