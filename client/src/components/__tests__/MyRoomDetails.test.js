import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import { act } from "react-dom/test-utils";
import MyRoomDetails from "../MyRoomDetails";

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
          <MyRoomDetails />
        </Auth0Provider>
      </MemoryRouter>
    );
  });
  // const header = screen.getAllByRole("header");
  // expect(header).toBeInTheDocument();
  // const landlordname = screen.getByTestId("test-landlordname");
  // expect(landlordname).toBeInTheDocument();
});

// room: {
//   title:
//     "Charming character home located on a quiet cul-del-sac street in Oakridge area",
//   address: "738 West 53rd Avenue - Vancouver, BC",
//   type: "house",
//   room_num: 4,
//   pictures: [
//     "https://images.rentals.ca/property-pictures/medium/vancouver-bc/501979/house-5345154.jpg",
//     "https://images.rentals.ca/property-pictures/medium/vancouver-bc/501979/house-5345155.jpg",
//     "https://images.rentals.ca/property-pictures/medium/vancouver-bc/501979/house-5345153.jpg",
//     "https://images.rentals.ca/property-pictures/medium/vancouver-bc/501979/house-5345158.jpg",
//     "https://images.rentals.ca/property-pictures/medium/vancouver-bc/501979/house-5345157.jpg",
//     "https://images.rentals.ca/property-pictures/medium/vancouver-bc/501979/house-5345133.jpg",
//     "https://images.rentals.ca/property-pictures/medium/vancouver-bc/501979/house-5345149.jpg",
//     "https://images.rentals.ca/property-pictures/medium/vancouver-bc/501979/house-5345151.jpg",
//     "https://images.rentals.ca/property-pictures/medium/vancouver-bc/501979/house-5345152.jpg",
//     "https://images.rentals.ca/property-pictures/medium/vancouver-bc/501979/house-5345150.jpg",
//     "https://images.rentals.ca/property-pictures/medium/vancouver-bc/501979/house-5345131.jpg",
//     "https://images.rentals.ca/property-pictures/medium/vancouver-bc/501979/house-5345132.jpg",
//     "https://images.rentals.ca/property-pictures/medium/vancouver-bc/501979/house-5345128.jpg",
//   ],
//   price: 5000,
//   details:
//     "CONVENIENCES\n\n* Sir Winston Churchill Secondary School (offers IB Program) -- 2 mins walk\n\n* Sir Wilfrid Laurier Elementary School -- 10 mins walk\n\n* Annie B. Jamieson Elementary School -- 10 mins walk\n\n* Langara College -- 14 mins walk\n\n* UBC -- 20 mins drive, 10 mins walk to 49 Bus Stop\n\n* 49 Langara Canada Line Station -- 13 mins walk\n\n* Oakridge Centre -- 15 mins walk\n\n* Safeway, T&T -- 15 - 25 mins walk\n\n\n\nUNIT FEATURES\n\n* About 2100 sqft living space \n\n* 4 Bedrooms + 2 Bathrooms\n\n* Mainfloor = 1450 sqft (Kitchen, 3 Bed, 2 Bath, Living Room, Dining Room)\n\n* Basement = 650 sqft (1BR, 1 Living Room)\n\n* Double Carport\n\n\n\nRENTAL TERMS:\n\n* Available: 01 Oct 21\n\n* Rental Fee: $5,000/month furnished all excluding utilities\n\n* Minimum one (1) year lease\n\n* Insurance: Tenant MUST purchase insurance for personal content and liability \n\n* Prohibitions: No subletting, no smoking (cigarette, cigar, marijuana, cannabis etc.). No grow-ops, No illegal and commercial activities on property\n\n* Applications with references will be considered after viewing \n\n* Property to be rented as is where is; check conditions thoroughly before submitting applications \n\n* Reference, Employment and credit check required. We reserve the right to decline a booking.",
// },
