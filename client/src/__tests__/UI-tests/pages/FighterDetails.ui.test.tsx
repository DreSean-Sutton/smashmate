import FighterDetails from '../../../pages/FighterDetails';
import App from '../../../App';
import React from 'react';
import { BrowserRouter as Router, useParams } from 'react-router-dom';
import { screen, waitFor, act } from '@testing-library/react';
import '@testing-library/user-event';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom';
import 'jest-extended';
import { renderWithProviders } from '../../../util/test-utils';

describe("Testing fighterDetails", () => {

  describe("testing arrows", () => {
    afterEach(() => {
      useParams.mockReturnValue({ fighter: 'bayonetta' });
    });

    test("previous arrow should switch shown data to previous fighter", async () => {
      renderWithProviders(<App />);
      await (waitFor(() => screen.findByText(/bayonetta/i), { timeout: 3000 }));
      userEvent.click(screen.getByTestId(/^bayonetta$/i));
      const leftArrow = await screen.findByTestId(/left-arrow/i);
      userEvent.click(leftArrow);
      const rightArrow = await screen.findByTestId(/right-arrow/);
      useParams.mockReturnValue({ fighter: 'banjo' });
      expect(await screen.findByText(/^banjo/i)).toBeInTheDocument();
    });

    test("next arrow should switch shown data to next fighter", async () => {
      renderWithProviders(<App />);
      const rightArrow = await screen.findByTestId(/right-arrow/i);
      userEvent.click(rightArrow);
      const leftArrow = await screen.findByTestId(/left-arrow/);
      useParams.mockReturnValue({ fighter: 'bowser' });
      expect(await screen.findByText(/^bowser/i)).toBeInTheDocument();

    });
  });
  describe("Walking through Bayonetta's data", () => {

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

    it("renders Bayonetta's Moves data", async () => {
      renderWithProviders(<FighterDetails />);
      const movesTable = await (waitFor(() => screen.findByTestId(/^moves-table$/), { timeout: 3000 }));
      expect(movesTable).toBeInTheDocument();
      expect(screen.getByRole('table')).toBeInTheDocument();
    });

    it("renders Bayonetta's throw data when DataModal's throws button is clicked", async () => {
      renderWithProviders(<FighterDetails />);
      const movesTable = await (waitFor(() => screen.findByTestId(/^moves-table$/), { timeout: 3000 }));
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
      const movesTable = await (waitFor(() => screen.findByTestId(/^moves-table$/), { timeout: 3000 }));
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
      const movesTable = await (waitFor(() => screen.findByTestId(/^moves-table$/), { timeout: 3000 }));
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
