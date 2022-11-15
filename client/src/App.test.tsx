import App from './App';
import { LocationDisplay } from './App';
import React from 'react';
import { BrowserRouter, MemoryRouter, } from 'react-router-dom';
import { screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/user-event';
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from './util/test-utils';
import '@testing-library/jest-dom';
import 'jest-extended';
import nock from 'nock';
import axios from 'axios';
axios.defaults.adapter = require('axios/lib/adapters/http');

describe('Testing App.tsx UI/UX', () => {


  it('Renders Home on page load', async () => {
    renderWithProviders(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    await (waitFor(() => screen.findByText(/Bayonetta/i), { timeout: 3000 }));
    await (waitFor(() => screen.findByText(/Inkling/i), { timeout: 3000 }));
  });

  it('Renders signIn component when Login nav is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    await act(() => user.click(screen.getByText(/Login/i)));
    await waitFor(() => screen.findByTestId(/sign-in-form/i));
  });

  it('Renders signIn component when Login icon is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    await act(() => user.click(screen.getByTestId(/profile-icon/i)));
    await waitFor(() => screen.findByTestId(/sign-in-form/i));
  });

  it('Renders Favorites component when favorites nav is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    await act(() => user.click(screen.getByText(/Favorites/i)));
    await screen.findByText(/Favorites Are Empty/i)
  })

  it('Renders Home component when home nav is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const home = screen.getByText(/Home/i);
    await act(() => user.click(home));
    await screen.findByText(/Joker/i);
  })

it('renders fighterDetails component when a fighter\'s card is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    const joker = await waitFor(() => screen.findByTestId(/joker/i), { timeout: 2000 });
    await act(() => user.click(joker));
    await screen.findByText(/Moves/i);
    await screen.findByText(/Grabs\/Throws/i);
    await screen.findByText(/Dodges\/Rolls/i);
    await screen.findByText(/Stats/i);
  });

  it.skip('tests memory router', () => {
    const user = userEvent.setup();
    const testRoute = '/registration/sign-in'
    renderWithProviders(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    )
    expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
  });
})

describe('Testing /api/favoriting/characters/upsert', () => {
  afterEach(nock.cleanAll);

  describe('Testing add/remove favorites', () => {
    const url = 'http://localhost:5000/api/favoriting/characters/upsert';
    const myProfile = {
      email: 'testemail@gmail.com',
      favorites: [
        {
          displayName: 'Inkling',
          fighter: 'inkling',
          fighterId: 25,
          rosterId: 70
        },
        {
          displayName: "Bowser Jr",
          fighter: "bowserJr",
          fighterId: 4,
          rosterId: 63
        }
      ]
    }
    const controller = new AbortController()
    const headers = {
      signal: controller.signal,
      validateStatus: () => true
    }
    async function addFavorites() {
      try {
        const { status, data }: any = await axios.post(url, myProfile, headers);
        if (status !== 201) throw new Error('favoriting failed!')
        return data;
      } catch (e: any) {
        return { error: e.message }
      }
    }

    it('responds with 201 status data if inserted correctly', async () => {

      const result = await addFavorites();
      expect(result).toBeTruthy();
      expect(result.lastErrorObject.updatedExisting).toBeTruthy();
    })

    it('returns an error message if insert fails', async () => {

      nock('http://localhost:5000')
        .persist()
        .post('/favoriting/characters/upsert')
        .replyWithError('An unexpected error occurred!');
      const result = await addFavorites();
      expect(result).toHaveProperty('error');
    })
  })

  describe('Testing /api/favoriting/characters/get', () => {

    const url = 'http://localhost:5000/api/favoriting/characters/get';
    const queryEmail = {email:'testemail@gmail.com'};
    const controller = new AbortController()
    const header = {
      signal: controller.signal,
      validateStatus: () => true
    }
    async function getFavorites() {
      try {
        const {status, data} = await axios.post(url, queryEmail, header);
        if(status !== 200) throw new Error('Fetch failed!');
        return data
      } catch(e: any) {
        return {error: e.message}
      }
    }

    it('Returns an array of favorites from database', async () => {
      const result = await getFavorites();
      expect(result).toBeTruthy();
      expect(result).not.toHaveProperty('error');
    })
  })
})
