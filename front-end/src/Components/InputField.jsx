import { useState } from "react";
import { twMerge } from "tailwind-merge";
import PropTypes from "prop-types";

export function InputField({
  labelName,
  type,
  value,
  onChange,
  placeholder = "",
  children = "",
  disableTransition = false,
  className = "",
  errorMessage = "", // This is the error message on submit, if applicable
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasContent, setHasContent] = useState(false);

  return (
    <div
      className={twMerge("relative", className)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      <input
        className="border rounded p-1 outline-none border-solid border-[#808080] bg-transparent w-full "
        type={type}
        placeholder={""}
        value={value}
        onChange={(e) => {
          e.target.value.length > 0
            ? setHasContent(true)
            : setHasContent(false);
          onChange(e);
        }}
      />
      <span
        className={twMerge(
          "absolute left-0 p-2 text-sm uppercase pointer-events-none font-robotoslab text-footer transition",
          (isFocused || hasContent) &&
            !disableTransition &&
            "text-black text-xs translate-x-2 -translate-y-2 py-0 bg-secondary tracking-widest   "
        )}
      >
        {labelName}
      </span>
      {children}
      {errorMessage && (
        <span className="text-sm font-bold text-red-500 ">{errorMessage}</span>
      )}
    </div>
  );
}

InputField.propTypes = {
  labelName: PropTypes.string.isRequired, // The label for the input field
  type: PropTypes.string.isRequired, // The type of input field (e.g., text, password)
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // The value of the input field
  onChange: PropTypes.func.isRequired, // Function to handle input field value change
  placeholder: PropTypes.string, // Placeholder text for the input field
  children: PropTypes.node, // Additional content to be rendered inside the input field component
  disableTransition: PropTypes.bool, // Indicates whether transition effects should be disabled
  className: PropTypes.string, // Additional class names to be applied to the input field component
  errorMessage: PropTypes.string, // Error message to be displayed, if applicable
};
