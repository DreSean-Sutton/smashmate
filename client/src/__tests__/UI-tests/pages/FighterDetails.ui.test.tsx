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

  describe("Walking through Bayonetta's data", () => {

    it("renders Bayonetta's Moves data", async () => {
      renderWithProviders(<FighterDetails />);
      const moves = await (waitFor(() => screen.findByText(/^bayonetta's moves$/i), { timeout: 3000 }));
      // const moves = await screen.findByText(/^bayonetta's moves$/i);
      const movesTable = await screen.findByTestId(/^moves-table$/);
      expect(moves).toBeInTheDocument();
      expect(movesTable).toBeInTheDocument();
      expect(screen.getByRole('table')).toBeInTheDocument();
    });

    it("opens the DataModal component when the data navbar is clicked", async () => {
      renderWithProviders(<FighterDetails />);
      const dataNavbar = await screen.findByTestId(/data-navbar/);
      expect(dataNavbar).toBeInTheDocument();
      userEvent.click(dataNavbar);
      const dataModal = await screen.findByTestId(/data-modal/);
      const movesButton = screen.getByRole('button', { name: /moves/i });
      expect(dataModal).toBeInTheDocument();
      expect(movesButton).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /throws/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /movements/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /stats/i })).toBeInTheDocument();
      await act(() => userEvent.click(movesButton));
      expect(dataModal).not.toBeInTheDocument();
    });

    it("closes the DataModal component when the outside of the modal is clicked", async () => {
      renderWithProviders(<FighterDetails />);
      userEvent.click(await screen.findByTestId(/data-navbar/));
      const dataModal = await screen.findByTestId(/data-modal/);
      const modalBackdrop = document.querySelector('.modal-backdrop');
      await act(() => userEvent.click(modalBackdrop));
      expect(dataModal).not.toBeInTheDocument();
    });

    it("renders Bayonetta's throw data when DataModal's throws button is clicked", async () => {
      renderWithProviders(<FighterDetails />);
      const movesTable = await screen.findByTestId(/^moves-table$/);
      userEvent.click(await screen.findByTestId(/data-navbar/));
      const dataModal = await screen.findByTestId(/data-modal/);
      const throwButton = await screen.findByRole('button', { name: /throws/i });
      await act(() => userEvent.click(throwButton));
      expect(dataModal).not.toBeInTheDocument();
      expect(movesTable).not.toBeInTheDocument();
      expect(await screen.findByTestId(/^throws-table$/)).toBeInTheDocument();
    });

    it("renders Bayonetta's movement data when DataModal's movements button is clicked", async () => {
      renderWithProviders(<FighterDetails />);
      const movesTable = await screen.findByTestId(/^moves-table$/);
      userEvent.click(await screen.findByTestId(/data-navbar/));
      const dataModal = await screen.findByTestId(/data-modal/);
      const movementButton = await screen.findByRole('button', { name: /movements/i });
      await act(() => userEvent.click(movementButton));
      expect(dataModal).not.toBeInTheDocument();
      expect(movesTable).not.toBeInTheDocument();
      expect(await screen.findByTestId(/^movements-table$/)).toBeInTheDocument();
    });

    it("renders Bayonetta's stat data when DataModal's stats button is clicked", async () => {
      renderWithProviders(<FighterDetails />);
      const movesTable = await screen.findByTestId(/^moves-table$/);
      userEvent.click(await screen.findByTestId(/data-navbar/));
      const dataModal = await screen.findByTestId(/data-modal/);
      const statButton = await screen.findByRole('button', { name: /stats/i });
      await act(() => userEvent.click(statButton));
      expect(dataModal).not.toBeInTheDocument();
      expect(movesTable).not.toBeInTheDocument();
      expect(await screen.findByTestId(/^stats-table$/)).toBeInTheDocument();
    });

  })
});
