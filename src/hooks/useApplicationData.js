// Import necessary styles and components
import "components/Application.scss";
import Appointment from "components/Appointment";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

// Define a custom hook for managing application data
export default function useApplicationData(props) {
  // Initialize the application state using the useState hook
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  // Function to book an interview for a specific appointment
  const bookInterview = function(id, interview) {
    // Create a new appointment object with the updated interview data
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    // Create a new appointments object with the updated appointment
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // Find the day object for the currently selected day
    const day = state.days.find(day => day.name === state.day);

    // Make a PUT request to save the interview data to the server
    return axios.put(`/api/appointments/${id}`, { interview: interview })
      .then(() => {
        // Update the state with the new appointments data and decrement available spots
        setState({ ...state, appointments });
        day.spots--;
      })
  };

  // Function to cancel an interview for a specific appointment
  const cancelInterview = function(id) {
    // Find the day object for the currently selected day
    const day = state.days.find(day => day.name === state.day);

    // Make a DELETE request to remove the interview data from the server
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        // Increment available spots
        day.spots++;
      });
  };

  // Retrieve the list of interviewers for the currently selected day
  const interviewers = getInterviewersForDay(state, state.day)

  // Retrieve the list of daily appointments for the currently selected day
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  // Create a list of Appointment components based on the dailyAppointments data
  const appointmentsList = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  // Function to set the currently selected day
  const setDay = day => {
    console.log("setDay called with :", day);
    setState(prev => ({ ...prev, day }));
  };

  // Function to set the list of available days
  const setDays = days => setState(prev => ({ ...prev, days }));

  // Use the useEffect hook to fetch initial data when the component mounts
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      // Update the state with data from the server
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    });  
  }, []);

  // Return the application state and relevant functions as an object
  return { state, setDay, bookInterview, cancelInterview };
};
