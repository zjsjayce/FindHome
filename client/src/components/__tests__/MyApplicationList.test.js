import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import { act } from "react-dom/test-utils";
import MyApplicationList from "../MyApplicationList";

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

// jest
//   .spyOn(React, "useState")
//   .mockImplementation(() => {
//     [
//       [
//         {
//           _id: "626d6dde4afd82d55ff4529e",
//           landlord: {
//             sub: "107101686573519046825",
//             nickname: "Zhang",
//             career: "SDE",
//             phone: "7789947888",
//             email: "zjs.jayce@gmail.com",
//           },
//           applicant: {
//             sub: "625da79e99de6d0069fb7edd",
//           },
//           home_id: "625dbe2044a06d140a838591",
//           message: "I want it!",
//           room_title:
//             "8555 Number 2 Road is a house for rent in Richmond, BC. It has 1 unit. Units have 3 bedrooms. Units have 3 bathrooms.",
//         },
//         {
//           _id: "626d6dfc4afd82d55ff4529f",
//           landlord: {
//             sub: "107101686573519046825",
//             nickname: "Zhang",
//             career: "SDE",
//             phone: "7789947888",
//             email: "zjs.jayce@gmail.com",
//           },
//           applicant: {
//             sub: "625da79e99de6d0069fb7edd",
//           },
//           home_id: "625dbd6f44a06d140a838590",
//           message: "I want it!",
//           room_title:
//             "Two stories well-maintenance beautiful fully-furnished townhouse located in quiet neighborhood of Richmond central location. (Blundell Road & No.2 Road)",
//         },
//       ],
//       () => null,
//     ];
//   })
//   .mockImplementation(() => [false, () => null])
//   .mockImplementation((x) => [x, () => null]);

act(() => {
  test("Page Elements", async () => {
    render(
      <MemoryRouter>
        <Auth0Provider>
          <MyApplicationList />
        </Auth0Provider>
      </MemoryRouter>
    );
  });
  // const landlordname = screen.getByTestId("test-landlordname");
  // expect(landlordname).toBeInTheDocument();
});
