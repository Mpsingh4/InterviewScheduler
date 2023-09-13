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
    console.log("Selected interviewer:", interviewerId);
    setSelectedInterviewer(interviewerId);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSave(studentName, selectedInterviewer);
  };
  

  const { interviewer, interviewers, onSave, onCancel } = props;


  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={studentName}
            onChange={handleNameChange}
          />
          <InterviewerList
            interviewer={selectedInterviewer}
            interviewers={interviewers}
            onChange={handleInterviewerChange}
          />
          <section className="appointment__actions">
            <Button danger onClick={onCancel}>
              Cancel
            </Button>
            <Button confirm type="submit">
              Save
            </Button>
          </section>
        </form>
      </section>
    </main>
  );
}



// import React from 'react';
// import InterviewerList from "components/InterviewerList";
// import Button from "components/Button";
// import { useState } from "react";

// export default function Form(props) {
//   const [studentName, setStudentName] = useState(props.student || "");
//   const [selectedInterviewer, setSelectedInterviewer] = useState(props.interviewer || null);

//   const handleNameChange = (event) => {
//     setStudentName(event.target.value);
//   };

//   const handleInterviewerChange = (interviewerId) => {
//     console.log("Selected interviewer:", interviewerId);
//     setSelectedInterviewer(interviewerId);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault(); // Prevent the default form submission behavior
//     props.onSave(studentName, selectedInterviewer);
//   };

//   const { interviewer, interviewers, onSave, onCancel } = props;

//   return (
//     <main className="appointment__card appointment__card--create">
//       <section className="appointment__card-left">
//         <form autoComplete="off" onSubmit={handleSubmit}> {/* Add onSubmit event handler here */}
//           <input
//             className="appointment__create-input text--semi-bold"
//             name="name"
//             type="text"
//             placeholder="Enter Student Name"
//             value={studentName}
//             onChange={handleNameChange}
//           />
//           <InterviewerList
//             interviewer={selectedInterviewer}
//             interviewers={interviewers}
//             onChange={handleInterviewerChange}
//           />
//           <section className="appointment__actions">
//             <Button danger onClick={onCancel}>
//               Cancel
//             </Button>
//             <Button confirm type="submit">
//               Save
//             </Button>
//           </section>
//         </form>
//       </section>
//     </main>
//   );
// }
