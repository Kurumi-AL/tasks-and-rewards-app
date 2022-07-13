import React, { useState, useEffect, useContext } from "react";
import TableHeader from "../../elements/tableHeader";
import { db } from "../../firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { getCurrUser } from "../../firebase/userService";
import { UserContext } from "../../utils/userContext";
import { deleteTask, addPoints } from "../../firebase/taskService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import "./tasksTable.css";

function TasksTable({
  tasks,
  sortColumn,
  onDeleteTask,
  onAddPoints,
  onSort,
  getPageData,
}) {
  const [columns, setColumns] = useState([
    { path: "name", label: "Task name" },
    { path: "points", label: "Points" },
    { key: "add", label: "Add points" },
    { key: "delete", label: "Delete" },
  ]);

  // const [currUser, setCurrUser] = useContext(UserContext);
  // const [tasks, setTasks] = useState([]);

  useEffect(() => {
    console.log("useEffect in tasksTable: ");
    // setTasks(currUser.tasks);
  });

  const renderSortIcon = (column) => {
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc"></i>;

    return <i className="fa fa-sort-desc"></i>;
  };

  return (
    <table className="table">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />

      <tbody>
        {tasks.map((task) => (
          <tr key={task.timestamp}>
            <td style={{ width: 50 + "%" }}>{task.name}</td>
            <td className="text-end" style={{ width: 15 + "%" }}>
              {task.points} pt
            </td>
            <td className="text-center" style={{ width: 15 + "%" }}>
              <FontAwesomeIcon
                className="fontawesome-icon"
                onClick={() => onAddPoints({ task })}
                icon={faPlus}
              />
              {/* {" "}
              <button
                onClick={() => onAddPoints({ task })}
                type="btn btn-sm"
                className="btn btn-outline-dark"
              >
                +
              </button> */}
            </td>
            <td style={{ width: 15 + "%" }}>
              <FontAwesomeIcon
                className="fontawesome-icon"
                onClick={() => onDeleteTask({ task })}
                icon={faMinus}
              />
              {/* {" "}
              <button
                onClick={() => onDeleteTask({ task })}
                type="btn btn-sm"
                className="btn btn-outline-dark"
              >
                -
              </button> */}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TasksTable;
