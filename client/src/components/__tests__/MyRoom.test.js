import { render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import MyRoom from "../MyRoom";

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
const room = {
  home: {
    title: "Good apartment in Metrotown",
    address: "6699 DUNBLANE Avenue - Burnaby, BC",
    type: "condo",
    room_num: 2,
    pictures: [
      "https://images.craigslist.org/00M0M_6WdQk9Jp6coz_0g80g8_600x450.jpg",

      "https://www.brickunderground.com/sites/default/files/styles/blog_prima...",

      "https://donurquhart.com/wp-content/uploads/2019/09/0912eb99-035f-43d0-...",
    ],
    price: 2800,
    details:
      "Burnaby Metrotown SUN TOWER ONE, 800 sqft, brand new unit with one bed...",
  },
  Landlord: "6248bd89be9b3f0070b939a4",
};

test("Navigation links", async () => {
  render(
    <MemoryRouter>
      <MyRoom room={room} deleteRoom={() => {}} />
    </MemoryRouter>
  );
  const card = screen.getByTestId("test-card");
  expect(card).toBeInTheDocument();
});
