import App from '../App';
import React from 'react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { screen, waitFor } from '@testing-library/react';
import '@testing-library/user-event';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom';
import 'jest-extended';
import nock from 'nock';
import axios from 'axios';
axios.defaults.adapter = require('axios/lib/adapters/http');
import getFighters from '../lib/fetch-fighters';
import { renderWithProviders } from './test-utils';

describe('Testing App.tsx UI/UX', () => {

  describe('Testing Home page', () => {

    it('Renders Home on page after loading', async () => {
      renderWithProviders(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      );
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

  describe('testing navbar links', () => {

    it('Renders signIn component when Login link is clicked', async () => {
      const user = userEvent.setup();
      renderWithProviders(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      );
      const loginNav = screen.getByRole('link', { name: /^login$/i });
      expect(loginNav).toHaveAttribute('href', '/registration/sign-in');
      await user.click(loginNav);
      await screen.findByTestId(/^sign-in-form$/i);
    });

    it('Renders Home component when Home nav is clicked', async () => {
      const user = userEvent.setup();
      renderWithProviders(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      );
      const homeNav = screen.getByRole('link', { name: /^home$/i });
      expect(homeNav).toHaveAttribute('href', '/');
      await user.click(homeNav);
      await screen.findByText(/^Joker$/i);
    });

    it('Renders Favorites component when Favorites nav is clicked', async () => {
      const user = userEvent.setup();
      renderWithProviders(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      );
      const favoritesNav = screen.getByRole('link', { name: /^favorites$/i });
      expect(favoritesNav).toHaveAttribute('href', '/favorites');
      await user.click(favoritesNav);
      await screen.findByText(/^Favorites Are Empty/i);
      await screen.findByRole('link', {name: /^add some!$/i});
    });

    it('Renders signIn component when Login icon is clicked', async () => {
      const user = userEvent.setup();
      renderWithProviders(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      );
      await user.click(screen.getByTestId(/^profile-icon$/i));
      await screen.findByTestId(/^sign-in-form$/i);
    });

    it('Renders Home when Smashmate title is clicked', async () => {
      const user = userEvent.setup();
      renderWithProviders(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      );
      const home = screen.getByText(/^smashmate$/i);
      await user.click(home);
      await screen.findByTestId(/^joker$/i);
    });
  });

  describe('Testing favoriting/unfavoriting fighters', () => {

    it('Favorites a fighter and they appear on Favorites page', async () => {
      const user = userEvent.setup();
      renderWithProviders(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      );
      await user.click(screen.getByText(/^home$/i));
      const heart = await screen.findByTestId(/^pyra-heart$/i);
      const favorites = await screen.findByText(/^favorites$/i);
      await user.click(heart)
      await user.click(favorites);
      await screen.findByTestId(/^pyra$/i);
    });

    it('unfavorites a fighter and they disappear from the Favorites page', async () => {
      const user = userEvent.setup();
      renderWithProviders(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      );
      await user.click(screen.getByRole('link', { name: /^favorites$/i }));
      const heart = await screen.findByTestId(/^pyra-heart$/i);
      expect(heart).toBeInTheDocument();
      await user.click(heart);
      expect(heart).not.toBeInTheDocument();
    });

  });

  describe('Testing fighterDetails', () => {

    it('renders fighterDetails component when a fighter\'s card is clicked', async () => {
      const user = userEvent.setup();
      renderWithProviders(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      );
      await user.click(screen.getByText(/^home$/i));
      const joker = await screen.findByTestId(/^joker$/i);
      await user.click(joker);
      await screen.findByText(/^Moves$/i);
      await screen.findByText(/^Grabs\/Throws$/i);
      await screen.findByText(/^Dodges\/Rolls$/i);
      await screen.findByText(/^Stats$/i);
    });
  })
});

describe('testing /api/get/fighters route', () => {

  it.only('Returns an array of fighters with 200 status code', async () => {
    const fighterArray = {};
    const result = await getFighters();
    for(const obj of result) {
      fighterArray[obj.fighter] = obj;
    }
    expect(fighterArray['inkling']).toBeTruthy();
    expect(fighterArray['inkling']).toHaveProperty('fighter');
    expect(fighterArray['inkling']).toHaveProperty('displayName');
    expect(fighterArray['inkling']).toHaveProperty('rosterId');
    expect(fighterArray['inkling']).toHaveProperty('fighterId');
    expect(Object.keys(fighterArray)[5]).toBe('captainFalcon');
  })
});

describe('Testing /api/favoriting/characters/upsert', () => {

  describe('Testing add/remove favorites', () => {
    afterEach(nock.cleanAll);

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
    const controller = new AbortController();
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
      nock('http://localhost:5000')
        .persist()
        .post('/api/favoriting/characters/upsert')
        .reply(201, {
            lastErrorObject: {
              updatedExisting: true
            }
          })
        const result = await addFavorites();
      expect(result).toBeTruthy();
      expect(result.lastErrorObject.updatedExisting).toBeTruthy();
    })

    it('returns an error message if insert fails', async () => {
      nock('http://localhost:5000')
        .persist()
        .post('/api/favoriting/characters/upsert')
        .replyWithError('An unexpected error occurred!');
      const result = await addFavorites();
      expect(result).toHaveProperty('error');
    });
  });

  describe('Testing /api/favoriting/characters/get', () => {
    afterEach(nock.cleanAll);

    const url = 'http://localhost:5000/api/favoriting/characters/get';
    const queryEmail = { email:'testemail@gmail.com' };
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
      nock('http://localhost:5000')
        .persist()
        .post('/api/favoriting/characters/get')
        .reply(200, [
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
        ])
      const result = await getFavorites();
      expect(result).toBeTruthy();
      expect(result.size).toBe(2);
      expect(result).not.toHaveProperty('error');
    });

    it('Returns an error when fetch fails', async () => {
      nock('http://localhost:5000')
        .persist()
        .post('/api/favoriting/characters/get')
        .replyWithError('An unexpected error occurred')
      const result = await getFavorites();
      expect(result).toHaveProperty('error')
    })
  });
});
