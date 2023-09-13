import React from 'react';
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";
import { useState } from "react";

export default function Form(props) {
  const [studentName, setStudentName] = useState(props.student || "");

  const handleNameChange = (event) => {
    setStudentName(event.target.value);
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
          interviewer={interviewer}
          interviewers={interviewers}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={onCancel}>
            Cancel
          </Button>
          <Button confirm onClick={() => onSave(studentName, interviewer)}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}


// export default function Form(props) {
//   return (
//     <main className="appointment__card appointment__card--create">
//   <section className="appointment__card-left">
//     <form autoComplete="off">
//       <input
//         className="appointment__create-input text--semi-bold"
//         name="name"
//         type="text"
//         placeholder="Enter Student Name"
//         /*
//           This must be a controlled component
//           your code goes here
//         */
//       />
//     </form>
//     <InterviewerList 
//       /* your code goes here */
//     />
//   </section>
//   <section className="appointment__card-right">
//     <section className="appointment__actions">
//       <Button danger {/* your code goes here */}>Cancel</Button>
//       <Button confirm {/* your code goes here */}>Save</Button>
//     </section>
//   </section>
// </main>
//   )
// }