import { render, screen } from "@testing-library/react";
import App from "../../App";
import { MemoryRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import { act } from "react-dom/test-utils";

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
      user: {},
      isAuthenticated: true,
    };
  },
}));

act(() => {
  test("Page Elements", async () => {
    render(
      <MemoryRouter>
        <Auth0Provider>
          <App />
        </Auth0Provider>
      </MemoryRouter>
    );
    const linkHome = screen.getByRole("link", { name: "Home" });
    expect(linkHome).toBeEnabled();
    expect(linkHome).toBeInTheDocument();
    const linkRoom = screen.getByRole("link", { name: "Room" });
    expect(linkRoom).toBeEnabled();
    expect(linkRoom).toBeInTheDocument();
    const heading = screen.getByRole("heading", { name: "Find Home" });
    expect(heading).toBeInTheDocument();
  });
});
