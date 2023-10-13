// Import React, InterviewerListItem component, styles, and PropTypes
import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "../components/InterviewList.scss";
import PropTypes from 'prop-types';

// Define an InterviewerList component for rendering a list of interviewers
export default function InterviewerList(props) {
  // Map the interviewers from props into InterviewerListItem components
  const interviewerListItems = props.interviewers.map(interviewer => {
    return <InterviewerListItem 
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer={() => props.onChange(interviewer.id)}
      />
  });

  // Render a section containing the interviewer list
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerListItems}</ul>
    </section>
  );
}

// Define PropTypes for the InterviewerList component
InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};
