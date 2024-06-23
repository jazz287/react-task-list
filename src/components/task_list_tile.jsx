import { CheckCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import "../styles/task_list_tile.css";

function TaskListTile({ title, dueDate , onToggle, isCompleted}) {
  return (
    <div
      className={"tlt" + (isCompleted ? " tlt-checked" : "")}
      onClick={() => {
        onToggle(!isCompleted);
      }}
    >
      <span>
        <CheckCircleOutlined />
        <div className="title">
          {title}
          <div className="lineAcross"></div>
        </div>
      </span>
      <span className="trailing">{dueDate}</span>
    </div>
  );
}

export default TaskListTile;
