import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import { act } from "react-dom/test-utils";
import MyRoomsList from "../MyRoomsList";

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

const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

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

act(() => {
  test("Page Elements", async () => {
    render(
      <MemoryRouter>
        <Auth0Provider>
          <MyRoomsList />
        </Auth0Provider>
      </MemoryRouter>
    );
  });
  // const landlordname = screen.getByTestId("test-landlordname");
  // expect(landlordname).toBeInTheDocument();
});
