import React from "react";

import axios from "__mocks__/axios";

import { render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText, toBeInTheDocument, queryByText,
queryByAltText   } from "@testing-library/react";

import Application from "components/Application";
import Appointment from "components/Appointment";



afterEach(cleanup);

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);
    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);
  
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    const appointments = getAllByTestId(container, "appointment");
    
  
    fireEvent.click(getByAltText(appointments, "Delete"));

    expect(getByText(appointments, "DELETING")).toBeInTheDocument();
  
    fireEvent.change(getByPlaceholderText(appointments, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
  
    fireEvent.click(getByAltText(appointments, "Sylvia Palmer"));
    fireEvent.click(getByText(appointments, "Save"));
  
    expect(getByText(appointments, "Saving")).toBeInTheDocument();

    await waitForElement(() => getByAltText(appointments, "Add"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });
  
  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(queryByAltText(appointment, "Edit"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(queryByText(appointment, "Save"));

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  // it("shows the save error when failing to save an appointment", async () => {
  //   axios.put.mockRejectedValueOnce();
  //   const { container, debug } = render(<Application />);
    
  //   await waitForElement(() => getByText(container, "Archie Cohen"));

  //   const appointment = getAllByTestId(container, "appointment")[0];
  //   fireEvent.click(getByAltText(appointment, "Add"));

  //   fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
  //     target: {value: "Lydia Miller-Jones"}
  //   });
  //   fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

  //   fireEvent.click(getByText(appointment, "Save"));
  //   await waitForElement(() => queryByText(appointment, "Error saving appointment"));
  //   expect(getByText(appointment, "Error saving appointment")).toBeInTheDocument();
  // });

  // it("shows the delete error when failing to save an appointment", async () => {
  //   axios.delete.mockRejectedValueOnce();
  //   const { container, debug } = render(<Application />);

  //   await waitForElement(() => getByText(container, "Archie Cohen"));

  //   const appointment = getAllByTestId(container, "appointment").find(
  //     appointment => queryByText(appointment, "Archie Cohen")
  //   );

  //   fireEvent.click(queryByAltText(appointment, "Delete"));
  //   expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();
  //   fireEvent.click(getByText(appointment, "Confirm"))

  //   await waitForElement(() => queryByText(appointment, "Error deleting appointment"));
  //   expect(getByText(appointment, "Error deleting appointment")).toBeInTheDocument();
  // });

});