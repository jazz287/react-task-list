import { CheckCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import "../styles/task_list_tile.css";

function TaskListTile({ title, dueDate }) {
  let [isCompleted, setIsCompleted] = useState(false);
  return (
    <div
      className={"tlt" + (isCompleted ? " tlt-checked" : "")}
      onClick={() => {
        setIsCompleted(!isCompleted);
      }}
    >
      <span>
        <CheckCircleOutlined />
        <div className="title">{title}
            <div className="lineAcross">
                _________________________
            </div>
        </div>
      </span>
      <span className="trailing">{dueDate}</span>
    </div>
  );
}

export default TaskListTile;
