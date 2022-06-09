import React, { Component } from "react";
import TableHeader from "../../elements/tableHeader";

class TasksTable extends Component {
  columns = [
    { path: "name", label: "Task name" },
    { path: "points", label: "Points" },
    { key: "add", label: "Add points" },
    { key: "delete", label: "Delete" },
  ];

  renderSortIcon = (column) => {
    const { sortColumn } = this.props;

    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc"></i>;

    return <i className="fa fa-sort-desc"></i>;
  };

  render() {
    const { tasks, onAddPoints, onDelete, onSort } = this.props;

    return (
      <table className="table">
        <TableHeader
          columns={this.columns}
          sortColumn={this.props.sortColumn}
          onSort={onSort}
        />

        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td style={{ width: 55 + "%" }}>{task.name}</td>
              <td className="text-end" style={{ width: 15 + "%" }}>
                {task.points} pt
              </td>
              <td className="text-center" style={{ width: 15 + "%" }}>
                {" "}
                <button
                  onClick={() => onAddPoints(task)}
                  type="btn btn-sm"
                  className="btn btn-outline-dark"
                >
                  +
                </button>
              </td>
              <td style={{ width: 15 + "%" }}>
                {" "}
                <button
                  onClick={() => onDelete(task)}
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
}

export default TasksTable;
