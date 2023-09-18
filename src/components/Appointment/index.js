import React from "react";
import "./styles.scss"; 
import Header from "./header";
import Show from "./show";
import Empty from "./empty";
import Form from "./form";
import useVisualMode from "hooks/useVisualMode";
import Status from "./status";
import Confirm from "./confirm";


export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const CONFIRM = "CONFIRM";
  const SAVING = "SAVING";
  const DELETING = "DELETING";

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  const save = function(name, interviewer) {
    console.log(interviewer);
    const interview = {
      student: name,
      interviewer
    };

    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW)
      });
  };

  const cancelInterview = function() {
    props.cancelInterview(props.id)
    .then(() => {
      transition(EMPTY)
    })
  }



  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show student={props.interview.student} interviewer={props.interview.interviewer} onDelete={() => transition(CONFIRM)}/>
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {(mode === DELETING || mode === SAVING) && (
        <Status message={mode} />
      )}
      {mode === CONFIRM && (
        <Confirm message={mode} onCancel={() => transition(SHOW)} onConfirm={cancelInterview} />
      )}
    </article>
  );
}