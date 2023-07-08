import SiteNavbar from '../../../components/navbar/SiteNavbar';
import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/user-event';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom';
import 'jest-extended';
import axios from 'axios';
axios.defaults.adapter = require('axios/lib/adapters/http');
import { renderWithProviders } from '../../../../util/test-utils';

describe('Testing SiteNavbar UI/UX', () => {
  it('renders SiteNavbar', async () => {
    renderWithProviders(<SiteNavbar />)
    expect(screen.getByText(/guest/i)).toBeInTheDocument();
    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/favorites/i)).toBeInTheDocument();
    expect(screen.getByText(/login/i)).toBeInTheDocument();
    expect(screen.getByTestId(/profile-icon/)).toBeInTheDocument();
  })
})
