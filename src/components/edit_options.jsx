import Spacer from "./spacer";
import TextInput from "./text_input";
import "../styles/edit_options.css";
import { CalendarOutlined } from "@ant-design/icons";
import DateFormatter from "../utils/date_formatter";
import { useEffect } from "react";
import Task from "../models/task";

function EditOptions({ task, onCancel, onSave }) {
  useEffect(() => {
    var mainInput = document.querySelector(".main-input");
    mainInput.value = task.title;
    console.log(mainInput, task.title);
    console.log("Ran useEffect in EditOptions.jsx");
    return () => {
      mainInput.value = "";
      console.log("Cleaned up useEffect in EditOptions.jsx");
    };
  }, [task]);

  return (
    <div className="edit-options">
      <div className="label">Task Description</div>
      <TextInput
        placeholder="Task Description"
        prefixIcon={null}
        isTextArea
        inputClassName={"edit-textarea"}
        value={task.description}
      />
      <Spacer />
      <div className="label">Due Date</div>
      <TextInput
        placeholder="Task Description"
        prefixIcon={<CalendarOutlined />}
        type="date"
        inputClassName={"edit-date"}
        value={DateFormatter.formatToYMD(task.dueDate)}
      />
      <Spacer />
      <div className="right">
        <button onClick={onCancel}>Cancel</button>
        &emsp;
        <button
          onClick={() => {
            var newTask = new Task(
              task.id,
              task.title,
              task.description,
              task.isCompleted,
              task.dueDate
            );

            newTask.title = document.querySelector(".main-input").value;
            newTask.description =
              document.querySelector(".edit-textarea").value;
            newTask.dueDate = new Date(
              document.querySelector(".edit-date").value
            ).getTime();

            onSave(newTask);
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default EditOptions;
