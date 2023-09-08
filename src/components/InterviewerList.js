import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "../components/InterviewList.scss";

export default function InterviewerList(props) {
  const setInterviewer = (id) => {
    props.setInterviewer(id);
  };

  // Map interviewers array and generate IListitems components
  const interviewerItems = props.interviewers.map((interviewer) => (
    <InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === props.interviewer}
      // Pass setInterviewer function down 2 InterviewerListItem
      setInterviewer={() => setInterviewer(interviewer.id)}
    />
  ));

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerItems}</ul>
    </section>
  );
}
