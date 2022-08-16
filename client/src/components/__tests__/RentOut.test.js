import { render, screen } from "@testing-library/react";
import RentOut from "../RentOut";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import "@testing-library/jest-dom";

jest.mock("@auth0/auth0-react", () => ({
  Auth0Provider: ({ children }) => children,
  useAuth0: () => {
    return {
      isLoading: false,
      user: {
        picture:
          "https://s.gravatar.com/avatar/3230409ae68e0b84148132590710423b?s=480&r...",
        email: "zjs.jayce@gmail.com",
        email_verified: false,
        sub: "6248bd89be9b3f0070b939a4",
      },
      isAuthenticated: true,
    };
  },
}));

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
      <Auth0Provider>
        <RentOut />
      </Auth0Provider>
    </MemoryRouter>
  );
  const titleInput = screen.getByTestId("test-title");
  expect(titleInput).toBeInTheDocument();
  const addressInput = screen.getByTestId("test-address");
  expect(addressInput).toBeInTheDocument();
  const priceInput = screen.getByTestId("test-price");
  expect(priceInput).toBeInTheDocument();
  const roomNumInput = screen.getByTestId("test-roomNum");
  expect(roomNumInput).toBeInTheDocument();
  const typeInput = screen.getByTestId("test-type");
  expect(typeInput).toBeInTheDocument();
  const detailsInput = screen.getByTestId("test-details");
  expect(detailsInput).toBeInTheDocument();
  
});
