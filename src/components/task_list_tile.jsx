import {
  CheckCircleOutlined,
  DeleteOutlined,
  EditFilled,
} from "@ant-design/icons";
import "../styles/task_list_tile.css";
import DateFormatter from "../utils/date_formatter";

function TaskListTile({ task, onToggle, onEditInitiate, onDelete }) {
  return (
    <div
      className={"tlt" + (task.isCompleted ? " tlt-checked" : "")}
      onClick={() => {
        onToggle(!task.isCompleted);
      }}
    >
      <span className="left">
        <CheckCircleOutlined />
        <div>
          <div className="title">
            {task.title}
            <div className="lineAcross"></div>
          </div>
          {
            // only show description for incomplete tasks
            !task.isCompleted ? (
              <div className="subtitle">{task.description}</div>
            ) : null
          }
        </div>
      </span>
      <div className="trailing">
        <span className="trailing-text">
          {DateFormatter.formateToMD(task.dueDate)}
        </span>
        <div className="trailing-options">
          <EditFilled
            className="option"
            onClick={(e) => {
              e.stopPropagation();
              onEditInitiate();
            }}
          />
          <DeleteOutlined
            className="option"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default TaskListTile;
