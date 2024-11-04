import { twMerge } from "tailwind-merge";
import PropTypes from "prop-types";

function Button({ children, disabled, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={twMerge(
        "text-l rounded bg-primary p-2 text-white ",
        className
      )}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired, // Ensures children is provided and can be rendered
  disabled: PropTypes.bool, // Indicates whether the button is disabled
  onClick: PropTypes.func, // Function to handle button click event
  className: PropTypes.string, // Additional class names to be applied to the button
};

export default Button;
