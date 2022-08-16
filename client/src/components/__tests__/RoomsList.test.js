import { render, screen } from "@testing-library/react";
import RoomsList from "../RoomsList";
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

test("Navigation links", async () => {
  render(
    <MemoryRouter>
      <RoomsList />
    </MemoryRouter>
  );
  const searchButton = screen.getByTestId("test-search");
  expect(searchButton).toBeInTheDocument();
});
