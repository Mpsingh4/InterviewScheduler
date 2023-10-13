// Import React and the DayListItem component
import React from "react";
import DayListItem from "./DayListItem";

// Define a DayList component for rendering a list of days
export default function DayList(props) {
  // Map the days from props into DayListItem components
  const days = props.days.map((day) => {
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={props.setDay}
      />
    );
  });

  // Render an unordered list containing the DayListItem components
  return <ul>{days}</ul>;
}
