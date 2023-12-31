import React, {useState} from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Fragment } from "react";

import "index.scss";
import Button from "components/Button";
import DayListItem from "components/DayListItem";
import DayList from "components/DayList";
import InterviewerListItem from "components/InterviewerListItem";
import InterviewerList from "components/InterviewerList";

import Appointment from "components/Appointment/index";
import Header from "components/Appointment/header";
import Empty from "components/Appointment/empty";
import Show from "components/Appointment/show";
import Confirm from "components/Appointment/confirm";
import Status from "components/Appointment/status";
import Error from "components/Appointment/error";
import Form from "components/Appointment/form";

storiesOf("Button", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }],
  })
  .add("Base", () => <Button>Base</Button>)
  .add("Confirm", () => <Button confirm>Confirm</Button>)
  .add("Danger", () => <Button danger>Cancel</Button>)
  .add("Clickable", () => (
    <Button onClick={action("button-clicked")}>Clickable</Button>
  ))
  .add("Disabled", () => (
    <Button disabled onClick={action("button-clicked")}>
      Disabled
    </Button>
  ));

storiesOf("DayListItem", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }],
  })
  .add("Unselected", () => <DayListItem name="Monday" spots={5} />) 
  .add("Selected", () => <DayListItem name="Monday" spots={5} selected />)
  .add("Full", () => <DayListItem name="Monday" spots={0} />)
  .add("Clickable", () => (
    <DayListItem name="Tuesday" setDay={action("setDay")} spots={5} />
  ));

const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

storiesOf("DayList", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }],
  })
  .add("Monday", () => (
    <DayList days={days} value={"Monday"} onChange={action("setDay")} />
  ))
  .add("Tuesday", () => (
    <DayList days={days} value={"Tuesday"} onChange={action("setDay")} />
  ))
  .add("Wednesday", () => (
    <DayList days={days} value={"Wednesday"} onChange={action("setDay")} />
  ));

const interviewers = [
  { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
  { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
  { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
  { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
  { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" },
];

const interviews = [
  {
    student: "Lydia Miller-Jones",
    interviewer: { name: "Sylvia Palmer" },
  },
  {
    student: "Fogell McLovin",
    interviewer: { name: "Carter Lee" },
  }
];

storiesOf("InterviewerList", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }],
  })
  .add("Initial", () => <InterviewerList interviewers={interviewers} />)
  .add("Selected", () => (
    <InterviewerList interviewers={interviewers} value={3} />
  ))
  .add("Clickable", () => (
    <InterviewerList
    interviewers={interviewers}
    onChange={action("setInterviewer")}
/>
  ));

  storiesOf("Appointment", module)
  .addParameters({
    backgrounds: [{ name: "white", value: "#fff", default: true }],
  })
  .add("Appointment", () => <Appointment />)
  .add("Appointment with Time", () => <Appointment time="12pm" />)
  .add("Header", () => <Header time="12pm" />)
  .add("Empty", () => <Empty onAdd={action("onAdd")} />)
  .add("Show", () => (
    interviews.map((interview, index) => (
      <Show
        key={index}
        student={interview.student}
        interviewer={interview.interviewer}
        onEdit={action("onEdit")}
        onDelete={action("onDelete")}
      />
    ))
  ))
  .add("Confirm", () => (
    <Confirm
      message="Delete the appointment?"
      onConfirm={action("onConfirm")}
      onCancel={action("onCancel")}
    />
  ))
  .add("Status", () => <Status message="Deleting" />)
  .add("Error", () => (
    <Error message="Could not delete appointment" onClose={action("onClose")} />
  ))
  .add("Form Create", () => (
    <Form
      interviewers={interviewers}
      onSave={(studentName, interviewerId) => {
        action("onSave")(studentName, interviewerId);
      }}
      onCancel={() => {
        action("onCancel")();
      }}
    />
  ))
  .add("Form Edit", () => (
    <Form
      student="Student Name" 
      interviewer={1}
      interviewers={interviewers}
      onSave={(studentName, interviewerId) => {
        action("onSave")(studentName, interviewerId);
      }}
      onCancel={() => {
        action("onCancel")();
      }}
    />
  ))
  .add("Appointment Empty", () => (
    <Fragment>
      <Appointment id={1} time="4pm" />
      <Appointment time="5pm" />
    </Fragment>
  ))
  .add("Appointment Booked", () => (
    <Fragment>
      <Appointment
        id={1}
        time="4pm"
        interview={{ student: "Lydia Miller-Jones", interviewer: interviewers[0] }}
      />
      <Appointment time="5pm" />
    </Fragment>
  ));