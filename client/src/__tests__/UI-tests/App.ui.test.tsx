import App from '../../App';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { screen, waitFor, act } from '@testing-library/react';
import '@testing-library/user-event';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom';
import 'jest-extended';
import { renderWithProviders } from '../../util/test-utils';

describe("Testing App.tsx UI/UX", () => {

  describe("Testing Home page", () => {

    it("Renders Home on page after loading", async () => {
      renderWithProviders(<App />);
      /**
       * Cards on page aren't rendered until a database
       * fetch is received.
       *
       * waitFor() pauses the test for up to 3000ms
       * or until database fetch is received.
       */
      await (waitFor(() => screen.findByText(/Bayonetta/i), { timeout: 3000 }));
      await screen.findByText(/Inkling/i);
      await screen.findByTestId(/^joker-heart$/i);
    });

  })

  describe("testing navbar links", () => {

    it("Renders signIn component when Login link is clicked", async () => {
      renderWithProviders(<App />);
      const loginNav = screen.getByRole('link', { name: /^login$/i });
      expect(loginNav).toHaveAttribute('href', '/registration/sign-in');
      userEvent.click(loginNav);
      await screen.findByTestId(/^sign-in-form$/i);
    });

    it("Renders Home component when Home nav is clicked", async () => {
      renderWithProviders(<App />);
      const homeNav = screen.getByRole('link', { name: /^home$/i });
      expect(homeNav).toHaveAttribute('href', '/');
      userEvent.click(homeNav);
      await screen.findByTestId(/^joker$/i);
    });

    it("Renders Favorites component when Favorites nav is clicked", async () => {
      renderWithProviders(<App />);
      const favoritesNav = screen.getByRole('link', { name: /^favorites$/i });
      expect(favoritesNav).toHaveAttribute('href', '/favorites');
      userEvent.click(favoritesNav);
      await screen.findByText(/^Favorites Are Empty/i);
      await screen.findByRole('link', {name: /^add some!$/i});
    });

    it("Renders signIn component when Login icon is clicked", async () => {
      renderWithProviders(<App />);
      userEvent.click(screen.getByTestId(/^profile-icon$/i));
      await screen.findByTestId(/^sign-in-form$/i);
    });

    it("Renders Home when Smashmate title is clicked", async () => {
      renderWithProviders(<App />);
      const homeNav = screen.getByRole('link', { name: /^smashmate$/i });
      expect(homeNav).toHaveAttribute('href', '/');
      userEvent.click(homeNav);
      await screen.findByTestId(/^joker$/i);
    });
  });

  describe("Testing favoriting/unfavoriting fighters", () => {

    it("Favorites a fighter and they appear on Favorites page", async () => {
      renderWithProviders(<App />);
      userEvent.click(screen.getByText(/^home$/i));
      const pyra = await screen.findByTestId(/^pyra$/i);
      const heart = await screen.findByTestId(/^pyra-heart$/i);
      const favorites = await screen.findByText(/^favorites$/i);
      await act (async () => await userEvent.click(heart));
      await act (async () => await userEvent.click(favorites));
      await screen.findByTestId(/^pyra$/i);
    });

    it("unfavorites a fighter and they disappear from the Favorites page", async () => {
      renderWithProviders(<App />);
      userEvent.click(screen.getByRole('link', { name: /^favorites$/i }));
      const heart = await screen.findByTestId(/^pyra-heart$/i);
      expect(heart).toBeInTheDocument();
      await act(async () => await userEvent.click(heart));
      expect(heart).not.toBeInTheDocument();
    });
  });

  describe("Testing navigation to FighterDetails component", () => {

    it("renders FighterDetails component when a fighter's card is clicked", async () => {
      renderWithProviders(<App />);
      userEvent.click(screen.getByText(/^home$/i));
      const bayonetta = await screen.findByTestId(/^bayonetta$/i);
      userEvent.click(bayonetta);
      const movesTable = await screen.findByTestId(/^moves-table$/);
      expect(movesTable).toBeInTheDocument();
    });

    it("renders FighterDetails component when 'enter' is pressed on a focused card", async () => {
      renderWithProviders(<App />);
      userEvent.click(screen.getByText(/^home$/i));
      const bayonetta = await screen.findByTestId(/^bayonetta$/i);
      bayonetta.focus();
      expect(document.activeElement).toBe(bayonetta);
      userEvent.keyboard('abc');
      expect(document.activeElement).toBe(bayonetta);
      userEvent.keyboard('{Enter}');
      const movesTable = await screen.findByTestId(/^moves-table$/);
      expect(movesTable).toBeInTheDocument();
    });
  })

});
