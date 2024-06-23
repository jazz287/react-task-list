import "../styles/text_input.css";
import { useState } from "react";

function TextInput({
  onSubmit = () => {},
  placeholder,
  prefixIcon,
  type = "text",
  isTextArea = false,
}) {
  const [focused, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  return (
    <div className={"input-wrapper " + (focused ? "input-wrapper-active" : "")}>
      <div className="text-input">
        <div className="prefix">{prefixIcon}</div>
        {isTextArea ? (
          <textarea
            type={type}
            placeholder={placeholder}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSubmit(e.target.value);
              }
            }}
          />
        ) : (
          <input
            type={type}
            placeholder={placeholder}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSubmit(e.target.value);
              }
            }}
          />
        )}
      </div>
    </div>
  );
}

export default TextInput;
