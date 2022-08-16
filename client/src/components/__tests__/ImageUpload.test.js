import { render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import ImageUpload from "../ImageUpload";

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
      <ImageUpload />
    </MemoryRouter>
  );
  // const upload = screen.getByTestId("test-upload");
  // expect(upload).toBeInTheDocument();
  // const modal = screen.getByTestId("test-modal");
  // expect(modal).toBeInTheDocument();
});
