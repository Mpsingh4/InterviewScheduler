import React from "react";
import "./styles.scss"; 
import Header from "./header";
import Show from "./show";
import Empty from "./empty";
import Form from "./form";
import useVisualMode from "hooks/useVisualMode";
import Status from "./status";
import Confirm from "./confirm";
import Error from "./error"

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const CONFIRM = "CONFIRM";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  const save = function(name, interviewer) {
    console.log(interviewer);
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW)
      })
      .catch((error) => {
        transition(ERROR_SAVE, true);
        console.log("Error in index", error)
      });
  };

  const cancelInterview = function() {
    transition(DELETING, true)
    props.cancelInterview(props.id)
    .then(() => {
      transition(EMPTY)
    })
    .catch((error) => {
      transition(ERROR_DELETE, true)
    })
  }



  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show student={props.interview.student} interviewer={props.interview.interviewer}
        onDelete={() => transition(CONFIRM)} onEdit={() => transition(EDIT)}/>
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
        <Confirm message="Are you sure you would like to delete?" onCancel={back} onConfirm={cancelInterview} /> 
      )}
      {mode === EDIT && (
        <Form
          interviewers= {props.interviewers}
          student= {props.interview.student}
          interviewer= {props.interview.interviewer.id} 
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
        message={mode}
        onClose={back}
          />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message={mode}
          onClose={back}
        />
      )}
    </article>
  );
}