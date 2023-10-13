import { useState } from 'react';

// Define a custom hook for managing visual modes in a component
export default function useVisualMode(initial) {
  // Initialize state for the current mode and a history of modes
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // Function to transition to a new mode, with an option to replace the current mode in history
  function transition(newMode, replace = false) {
    // Update the history based on whether or not to replace the current mode
    if (replace) {
      setHistory((prevHistory) => [...prevHistory.slice(0, -1), newMode]);
    } else {
      setHistory((prevHistory) => [...prevHistory, newMode]);
    }
    // Set the current mode to the new mode
    setMode(newMode);
  }

  // Function to go back to the previous mode in history
  function back() {
    // Check if there is a previous mode to go back to
    if (history.length > 1) {
      // Remove the current mode from history
      setHistory((prevHistory) => prevHistory.slice(0, -1));
      // Set the current mode to the mode before the current one
      setMode(history[history.length - 2]);
    }
  }

  // Return the current mode and functions for transitioning and going back as an object
  return { mode, transition, back };
}
