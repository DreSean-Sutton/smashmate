import React from 'react';
import { render, screen } from '@testing-library/react';
import nock from 'nock'
import axios from 'axios';
import FighterDetails from '../pages/fighter-details';
// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
interface FighterProps {
  fighter: string,
  fighterId: number | null,
  displayName: string,
  rosterId: number | null
};


describe('Testing moves data fetch', () => {
  afterAll(nock.restore);
  afterEach(nock.cleanAll);

  const scope = nock('https://the-ultimate-api.herokuapp.com').persist()
  .get('/api/fighters/data/moves')
  .query({ fighter: 'inkling' })
  .reply(200, {
    fighter: 'inkling',
    fighterId: 25,
    displayName: 'Inkling',
    rosterId: 75
  },
    { 'Access-Control-Allow-Origin': '*' })
  it('Correctly sends data on 200 status', async () => {
    const fetchData = async (currentFighter: string) => {
      const result = await axios.get(`https://the-ultimate-api.herokuapp.com/api/fighters/data/moves?fighter=${currentFighter}`);
      return result.data
    }
      // const controller = new AbortController()
      const result = await fetchData('inkling')
      expect(result).toEqual(
        expect.objectContaining({
          fighter: expect.any(String),
          fighterId: expect.any(Number),
          displayName: expect.any(String),
          rosterId: expect.any(Number)
        })
      )
      })
    })
