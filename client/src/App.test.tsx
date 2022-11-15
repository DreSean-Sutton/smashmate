import App from './App';
import Home from './pages/Home';
import BackgroundCarousel from './components/BackgroundCarousel';
import { LocationDisplay } from './App';
import React from 'react';
import { BrowserRouter, MemoryRouter, Routes, Route } from 'react-router-dom';
import { screen, fireEvent, render, waitFor } from '@testing-library/react';
import '@testing-library/user-event';
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from './util/test-utils';
import '@testing-library/jest-dom';
import 'jest-extended';
import nock from 'nock';
import axios from 'axios';
axios.defaults.adapter = require('axios/lib/adapters/http');
import './util/matchMedia.mock';

describe.only('Testing App.tsx UI', () => {
  it.only('Renders smashmate title', async () => {
    renderWithProviders(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    await (waitFor(() => (screen.findByText(/Bayonetta/i)), { timeout: 4000 }));
    await (waitFor(() => screen.findByText(/Inkling/i), { timeout: 4000 }));
  });
  it('Renders sign-in page when Login is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    await user.click(screen.getByText(/Login/i));
    expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
    // const signInForm = screen.getByRole('form', {name: 'Sign In'});
    // const signInForm = screen.getByText(/Sign In/i);
    // expect
  })
  it('tests memory router', () => {
    const user = userEvent.setup();
    const testRoute = '/registration/sign-in'
    renderWithProviders(
      <MemoryRouter initialEntries={[testRoute]}>
        <App />
      </MemoryRouter>,
    )
    expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
  })
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
