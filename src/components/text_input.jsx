import "../styles/text_input.css";
import { useState } from "react";

/**
 * onSubmit can return a value which will be set as the value of the input
 */
function TextInput({
  onSubmit = (currentValue) => {},
  placeholder,
  prefixIcon,
  type = "text",
  isTextArea = false,
  value = "",
  inputClassName,
  suffixText,
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
            defaultValue={value}
            placeholder={placeholder}
            onFocus={onFocus}
            onBlur={onBlur}
            className={inputClassName}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                var newValue = onSubmit(e.target.value);
                if (newValue !== undefined) {
                  e.target.value = newValue;
                }
              }
            }}
          />
        ) : (
          <input
            type={type}
            placeholder={placeholder}
            defaultValue={value}
            onFocus={onFocus}
            onBlur={onBlur}
            className={inputClassName}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                var newValue = onSubmit(e.target.value);
                if (newValue !== undefined) {
                  e.target.value = newValue;
                }
              }
            }}
          />
        )}
        {suffixText && <div className="suffix">{suffixText}</div>}
      </div>
    </div>
  );
}

export default TextInput;
