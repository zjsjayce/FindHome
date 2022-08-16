import { render, screen } from "@testing-library/react";
import UpdateMyRoom from "../UpdateMyRoom";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";


Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

test("Navigation links", () => {
  render(
    <MemoryRouter>
      <UpdateMyRoom />
    </MemoryRouter>
  );
});
