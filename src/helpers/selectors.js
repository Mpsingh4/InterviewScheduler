
// Function to retrieve appointments for a specific day
export function getAppointmentsForDay(state, day) {
  // Find the selected day object in state
  const selectedDay = state.days.find(d => d.name === day);
  
  // If the selected day doesn't exist or has no appointments, return an empty array
  if (!selectedDay || !selectedDay.appointments) {
    return [];
  }

  // Map appointment IDs to their corresponding appointment objects and return the result
  const appointments = selectedDay.appointments.map(id => state.appointments[id]);
  return appointments;
}

// Function to retrieve interview information
export function getInterview(state, interview) {
  // If there is no interview or no interviewer in the interview object, return null
  if (!interview || !interview.interviewer) {
    return null;
  }

  // Extract student and interviewer ID from the interview object
  const { student, interviewer } = interview;

  // Find the matching interviewer object in state
  const matchingInterviewer = state.interviewers[interviewer];

  // If no matching interviewer is found, return null
  if (!matchingInterviewer) {
    return null;
  }

  // Return an interview object with the student and a copy of the matching interviewer
  return {
    student,
    interviewer: { ...matchingInterviewer },
  };
}

// Function to retrieve interviewers available for a specific day
export function getInterviewersForDay(state, day) {
  // Find the selected day object in state
  const selectedDay = state.days.find(d => d.name === day);
  
  // If the selected day doesn't exist or has no interviewers, return an empty array
  if (!selectedDay || !selectedDay.interviewers) {
    return [];
  }

  // Map interviewer IDs to their corresponding interviewer objects and return the result
  const interviewers = selectedDay.interviewers.map(id => state.interviewers[id]);
  return interviewers;
}
