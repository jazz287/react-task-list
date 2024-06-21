import "../styles/main_input.css";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";

function MainInput() {
  const [focused, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  return (
    <div className={"input-wrapper " + (focused ? "input-wrapper-active" : "")}>
      <div className="main-input">
        <div className="prefix">
          <PlusOutlined
            style={{
              width: "15px",
              height: "15px",
            }}
          />
        </div>
        <input
          type="text"
          placeholder="Search for or add a Task"
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </div>
    </div>
  );
}

export default MainInput;
