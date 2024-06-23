import Spacer from "./spacer";
import TextInput from "./text_input";
import "../styles/edit_options.css";
import { CalendarOutlined } from "@ant-design/icons";

function EditOptions({ task, onCancel, onSave }) {
  return (
    <div className="edit-options">
      <div className="label">Task Description</div>
      <TextInput
        placeholder="Task Description"
        prefixIcon={null}
        isTextArea
        value={task.description}
      />
      <Spacer />
      <div className="label">Due Date</div>
      <TextInput placeholder="Task Description" prefixIcon={<CalendarOutlined />} type="date" value={task.formatDateToYMD()} />
      <Spacer />
      <div className="right">
        <button onClick={onCancel}>Cancel</button>
        &emsp;
        <button onClick={onSave}>Save</button>
      </div>
    </div>
  );
}

export default EditOptions;
