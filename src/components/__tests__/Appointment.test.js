import React from "react";

import { render, cleanup } from "@testing-library/react";

import Appointment from "components/Appointment";

afterEach(cleanup);

describe("Appointment:", () => {
  it("Renders without Crashing", () => {
    render(<Appointment/>)
  })
})