import nock from 'nock'
import axios from 'axios';
axios.defaults.adapter = require('axios/lib/adapters/http')

// Note to self: console.log increases test response delay

describe('Testing moves data fetch', () => {
  // afterAll(nock.restore);
  afterEach(nock.cleanAll);

  const controller = new AbortController()
  async function fetchData(currentFighter: string) {
    const { status, data } = await axios.get(`https://the-ultimate-api.herokuapp.com/api/fighters/data/moves?fighter=${currentFighter}`, {
      signal: controller.signal,
      validateStatus: () => true
    });
    if (status !== 200) {
      return { error: 'fetch failed!' }
    }
    return data
  }

  it('Correctly sends data on 200 status', async () => {
    const scope = nock('https://the-ultimate-api.herokuapp.com')
      .persist()
      .get('/api/fighters/data/moves?fighter=inkling')
      .reply(200, {
        fighter: 'inkling',
        fighterId: 25,
        displayName: 'Inkling',
        rosterId: 75
      })
      // { 'Access-Control-Allow-Origin': '*' })
    const result: any = await fetchData('inkling');
    expect(result.fighter).toBe('inkling');
    expect(result).toEqual(
      expect.objectContaining({
        fighter: expect.any(String),
        fighterId: expect.any(Number),
        displayName: expect.any(String),
        rosterId: expect.any(Number)
      })
    )
  })
  it('Correctly returns error', async () => {
    const scope = nock('https://the-ultimate-api.herokuapp.com')
      .persist()
      .get('/api/fighters/data/moves?fighter=inklingsssss')
      .reply(400, {
        error: 'fetch failed!'
      })
      // { 'Access-Control-Allow-Origin': '*' })
    const result: any = await fetchData('inklingsssss');
    expect(result.error).toBe('fetch failed!');
  })
})
