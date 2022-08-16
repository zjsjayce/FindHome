import { render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import ErrorPage from "../ErrorPage";

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

test("Page Elements", () => {
  render(
    <MemoryRouter>
      <ErrorPage />
    </MemoryRouter>
  );
  const returnBtn = screen.getByRole("button", {
    name: "Back Home",
  });
  expect(returnBtn).toBeEnabled();
  expect(returnBtn).toBeInTheDocument();
});
