// Import necessary styles and components
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import React, { useState, useEffect } from "react";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

// Define the main Application component
export default function Application(props) {
  // Use the custom hook to initialize state and functions related to application data
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  // Retrieve the list of interviewers for the currently selected day
  const interviewers = getInterviewersForDay(state, state.day);

  // Retrieve and map appointments for the currently selected day
  const appointments = getAppointmentsForDay(state, state.day).map(
    appointment => {
      return (
        <Appointment
          key={appointment.id}
          {...appointment}
          interview={getInterview(state, appointment.interview)}
          interviewers={interviewers}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
        />
      );
    }
  );

  // Render the main application layout
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          {/* Render the DayList component with relevant props */}
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {/* Render the list of appointments */}
        {appointments}
        {/* Render an Appointment component for the last time slot */}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
