// Import necessary styles and libraries
import React from "react";
import "components/Button.scss";
import classNames from "classnames";

// Define a reusable Button component
export default function Button(props) {
  // Generate dynamic class names based on provided props
  const buttonClass = classNames("button", {
    "button--confirm": props.confirm,
    "button--danger": props.danger
  });

  // Render a button element with dynamic class and event handling
  return (
    <button
      className={buttonClass}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
