import React from "react";

export function getAppointmentsForDay(state, day) {
  const selectedDay = state.days.find(d => d.name === day);
  if (!selectedDay || !selectedDay.appointments) {
    return [];
  }

  const appointments = selectedDay.appointments.map(id => state.appointments[id]);
  return appointments;
}