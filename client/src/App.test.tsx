import nock from 'nock';
import axios from 'axios';
const matchers = require('jest-extended')
expect.extend(matchers);
axios.defaults.adapter = require('axios/lib/adapters/http');

// import { render, screen } from '@testing-library/react';
// import App from './app';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

describe('Testing /favoriting/characters/upsert', () => {
  afterEach(nock.cleanAll);

  describe('Testing add/remove favorites', () => {
    const url = '/favoriting/characters/upsert';
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

      nock('/')
        .persist()
        .post('/favoriting/characters/upsert')
        .replyWithError('An unexpected error occurred!');
      const result = await addFavorites();
      expect(result).toHaveProperty('error');
    })
  })

  describe.only('Testing /favoriting/characters/get', () => {

    const url = '/favoriting/characters/get';
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
