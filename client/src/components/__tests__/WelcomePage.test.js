import { render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import WelcomePage from "../WelcomePage";

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
      <WelcomePage />
    </MemoryRouter>
  );
  const imgs = screen.getAllByRole("img");
  expect(imgs.length).toBe(7);
  const heading = screen.getByRole("heading", {
    name: "Find Home Smarter and Easier",
  });
  expect(heading).toBeInTheDocument();
  const linkShowRoom = screen.getByRole("link", {
    name: "Show Room Listings",
  });
  expect(linkShowRoom).toBeEnabled();
  expect(linkShowRoom).toBeInTheDocument();
});
