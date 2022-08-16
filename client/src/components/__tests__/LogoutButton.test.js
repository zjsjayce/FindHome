import { render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import LogoutButton from "../LogoutButton";

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
      <LogoutButton />
    </MemoryRouter>
  );
  const linkShowRoom = screen.getByRole("button", {
    name: "Logout",
  });
  expect(linkShowRoom).toBeEnabled();
  expect(linkShowRoom).toBeInTheDocument();
});
