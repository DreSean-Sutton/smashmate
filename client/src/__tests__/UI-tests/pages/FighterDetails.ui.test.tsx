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

  describe("Walking through bayonetta's data", () => {

    it("renders bayonetta's data", async () => {
      renderWithProviders(<FighterDetails />);
      const moves = await screen.findByText(/^bayonetta's moves$/i);
      const movesTable = await screen.findByTestId(/^moves-table$/);
      expect(moves).toBeInTheDocument();
      expect(movesTable).toBeInTheDocument();
      expect(screen.getByRole('table')).toBeInTheDocument();
    });

  })
});
