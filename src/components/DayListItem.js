// Import React, classNames library, and component-specific styles
import React from "react";
import classNames from "classnames";
import '../components/DayListItem.scss';

// Define a DayListItem component for rendering individual day items
export default function DayListItem(props) {
  // Generate dynamic class names based on provided props
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  // Function to format the display of available spots
  const formatSpots = (spots) => {
    if (spots === 0) {
      return "no spots remaining";
    } else if (spots === 1) {
      return "1 spot remaining";
    } else {
      return `${spots} spots remaining`;
    }
  };

  // Render an individual day item with dynamic class and click event
  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
};

//onClick={() => {formatSpots(props.spots)}}

// const formatSpots = (spots) => {
//   if (spots === 0) {
//     return "no spots remaining";
//   } else if (spots === 1) {
//     return "1 spot remaining";
//   } else {
//     return `${spots} spots remaining`;
//   }
// };

// module.exports(formatSpots);