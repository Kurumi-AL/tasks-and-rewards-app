import React, { useState } from "react";
import TableHeader from "../../elements/tableHeader";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import "./tasksTable.css";

function TasksTable({ tasks, sortColumn, onDeleteTask, onAddPoints, onSort }) {
  const [columns, setColumns] = useState([
    { path: "name", label: "Task name" },
    { path: "points", label: "Points" },
    { key: "add", label: "Add points" },
    { key: "delete", label: "Delete" },
  ]);

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
            </td>
            <td style={{ width: 15 + "%" }}>
              <FontAwesomeIcon
                className="fontawesome-icon"
                onClick={() => onDeleteTask({ task })}
                icon={faMinus}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TasksTable;
