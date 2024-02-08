import ErrorPage from '../../../pages/ErrorPage';
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

describe("Testing ErrorPage Component", () => {
  it("should render ErrorPage", async ()=> {
    renderWithProviders(<ErrorPage />);
    await (waitFor(() => screen.findByText(/This is the error page/i), { timeout: 3000 }));
  })
  describe("Testing ErrorPage rendering", () => {
    beforeEach(() => {
      useParams.mockReturnValue({ fighter: 'bayonetta', currentDataType: 'moves' });
    });

    it("Should render ErrorPage if fighter doesn't exist", async () => {
      renderWithProviders(<FighterDetails />);
      const dataNavbar = await screen.findByTestId(/data-navbar/);
      expect(dataNavbar).toBeInTheDocument();
      useParams.mockReturnValue({ fighter: 'i-dont-exist'});
      const errorPage = await screen.findByTestId(/^error-page$/);
      expect(errorPage).toBeInTheDocument();
    });

    it("Should render ErrorPage if currentDataType doesn't exist", async () => {
      renderWithProviders(<FighterDetails />);
      const dataNavbar = await screen.findByTestId(/data-navbar/);
      expect(dataNavbar).toBeInTheDocument();
      useParams.mockReturnValue({ fighter: 'i-dont-exist'});
      const errorPage = await screen.findByTestId(/^error-page$/);
      expect(errorPage).toBeInTheDocument();
    });
  })
});
