import RenderCards from '../../../components/RenderCards';
import SiteNavbar from '../../../components/navbar/SiteNavbar';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { screen, waitFor, act } from '@testing-library/react';
import '@testing-library/user-event';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom';
import 'jest-extended';
import { renderWithProviders } from '../../../util/test-utils';
import App from '../../../App';
import FighterDetails from '../../../pages/FighterDetails';

describe("Testing fighterDetails", () => {
  // describe("Testing Home page", () => {

  //   it("Renders Home on page after loading", async () => {
  //     renderWithProviders(<App />);
  //     /**
  //      * Cards on page aren't rendered until a database
  //      * fetch is received.
  //      *
  //      * waitFor() pauses the test for up to 3000ms
  //      * or until database fetch is received.
  //      */
  //     await (waitFor(() => screen.findByText(/Bayonetta/i), { timeout: 3000 }));
  //     await screen.findByText(/Inkling/i);
  //     await screen.findByTestId(/^joker-heart$/i);
  //   });

  // })

  it("renders fighterDetails component when a fighter's card is clicked", async () => {
    renderWithProviders(<FighterDetails />);
    // await (waitFor(() => screen.findByText(/Bayonetta/i), { timeout: 3000 }));
    console.log(window.location.pathname);
    // userEvent.click(screen.getByText(/^home$/i));
    // await (waitFor(() => screen.findByText(/^Joker's moves$/i), { timeout: 3000 }));
    // const joker = await screen.findByTestId(/^joker$/i);
    // userEvent.click(joker);
    const moves = await screen.findByText(/^Joker's moves$/i);
    screen.debug();
    // const grabs = await screen.findByText(/^Grabs\/Throws$/i);
    // const dodges = await screen.findByText(/^Dodges\/Rolls$/i);
    // const stats = await screen.findByText(/^Stats$/i);
    expect(moves).toBeInTheDocument();
    // expect(grabs).toBeInTheDocument();
    // expect(dodges).toBeInTheDocument();
    // expect(stats).toBeInTheDocument();
  });

  // it("renders fighterDetails component when 'enter' is pressed on a focused card", async () => {
  //   renderWithProviders(<App />);
  //   // userEvent.click(screen.getByText(/^home$/i));
  //   const joker = await screen.findByTestId(/^joker$/i);
  //   joker.focus();
  //   expect(document.activeElement).toBe(joker);
  //   userEvent.keyboard('abc');
  //   expect(document.activeElement).toBe(joker);
  //   userEvent.keyboard('{Enter}');
  //   const moves = await screen.findByText(/^Joker's moves$/i);
  //   // const grabs = await screen.findByText(/^Grabs\/Throws$/i);
  //   // const dodges = await screen.findByText(/^Dodges\/Rolls$/i);
  //   // const stats = await screen.findByText(/^Stats$/i);
  //   expect(moves).toBeInTheDocument();
  //   // expect(grabs).toBeInTheDocument();
  //   // expect(dodges).toBeInTheDocument();
  //   // expect(stats).toBeInTheDocument();
  // });
});
