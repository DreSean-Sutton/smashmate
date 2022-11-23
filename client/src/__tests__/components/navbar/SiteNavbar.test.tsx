import SiteNavbar from '../../../components/navbar/SiteNavbar';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { screen, waitFor } from '@testing-library/react';
import '@testing-library/user-event';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom';
import 'jest-extended';
import nock from 'nock';
import axios from 'axios';
axios.defaults.adapter = require('axios/lib/adapters/http');
import { renderWithProviders } from '../../test-utils';

describe('Testing SiteNavbar UI/UX', () => {
  it('renders SiteNavbar', async () => {
    renderWithProviders(
      <BrowserRouter>
        <SiteNavbar />
      </BrowserRouter>
    )
    screen.getByText(/guest/i)
    screen.getByText(/home/i)
    screen.getByText(/favorites/i)
    screen.getByText(/login/i)
    screen.getByTestId(/profile-icon/)
  })
})
