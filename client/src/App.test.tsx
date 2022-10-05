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

describe('Testing favoriting', () => {
  afterEach(nock.cleanAll);

  const url = 'http://localhost:5000/favoriting/character/add';
  const myProfile = {
    email: 'dreseansutton@gmail.com',
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
    console.log('result value: ', result);
    expect(result).toBeTruthy();
    expect(result.lastErrorObject.updatedExisting).toBeTruthy();
  })
})
