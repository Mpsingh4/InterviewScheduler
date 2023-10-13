// Import React, classNames library, component-specific styles
import React from "react";
import classNames from "classnames";
import "../components/InterviewerListItem.scss";

// Define an InterviewerListItem component for rendering individual interviewer items
export default function InterviewerListItem(props) {
  // Generate dynamic class names based on provided props, indicating selection
  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });

  // Render an individual interviewer item with dynamic class and click event
  return (
    <li
      className={interviewerClass}
      onClick={props.setInterviewer}
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {/* Display the interviewer's name if selected */}
      {props.selected && props.name}
    </li>
  );
}
