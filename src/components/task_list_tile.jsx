import {
  CheckCircleOutlined,
  DeleteOutlined,
  EditFilled,
} from "@ant-design/icons";
import "../styles/task_list_tile.css";
import DateFormatter from "../utils/date_formatter";

function TaskListTile({ title, dueDate, onToggle, isCompleted, onEditInitiate, onDelete }) {
  return (
    <div
      className={"tlt" + (isCompleted ? " tlt-checked" : "")}
      onClick={() => {
        onToggle(!isCompleted);
      }}
    >
      <span className="left">
        <CheckCircleOutlined />
        <div className="title">
          {title}
          <div className="lineAcross"></div>
        </div>
      </span>
      <div className="trailing">
        <span className="trailing-text">{DateFormatter.formateToMD(dueDate)}</span>
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
