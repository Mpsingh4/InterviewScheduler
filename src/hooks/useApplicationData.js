import "components/Application.scss";
// import Appointment from "Appointment/index.js"
import Appointment from "components/Appointment";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";



export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const bookInterview = function(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const day = state.days.find(day => day.name === state.day);

    return axios.put(`/api/appointments/${id}`, { interview: interview })
      .then(() => {
        setState({ ...state, appointments });
        day.spots--;
      })
  };

  const cancelInterview = function(id) {
    const day = state.days.find(day => day.name === state.day);

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        day.spots++;
      });
    
  };



  const interviewers = getInterviewersForDay(state, state.day)
  const dailyAppointments = getAppointmentsForDay(state, state.day);
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

  const setDay = day => {console.log("setDay called with :", day); setState( prev => ({ ...prev, day }))};
  const setDays = days => setState(prev => ({ ...prev, days }));

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({ 
        ...prev, 
        days: all[0].data, 
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    });  
  }, [])

  return {state, setDay, bookInterview, cancelInterview};
};