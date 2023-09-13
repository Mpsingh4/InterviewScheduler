import React from 'react';
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";
import { useState } from "react";

export default function Form(props) {
  const [studentName, setStudentName] = useState(props.student || "");
  const [selectedInterviewer, setSelectedInterviewer] = useState(props.interviewer || null);


  const handleNameChange = (event) => {
    setStudentName(event.target.value);
  };

  const handleInterviewerChange = (interviewerId) => {
    setSelectedInterviewer(interviewerId);
  };
  

  const { interviewer, interviewers, onSave, onCancel } = props;

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={studentName}
            onChange={handleNameChange}
          />
        </form>
        <InterviewerList
           interviewer={selectedInterviewer}
          interviewers={interviewers}
          onChange={handleInterviewerChange}
          />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={onCancel}>
            Cancel
          </Button>
          <Button confirm onClick={() => onSave(studentName, selectedInterviewer)}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
