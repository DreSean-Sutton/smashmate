import nock from 'nock';
import axios from 'axios';
const matchers = require('jest-extended')
expect.extend(matchers);
axios.defaults.adapter = require('axios/lib/adapters/http');

// Note to self: console.log increases test response delay

describe.only('Testing moves data fetch', () => {
  afterEach(nock.cleanAll);

  const controller = new AbortController()
  async function fetchData(currentFighter: string) {
    const { status, data } = await axios.get(`https://the-ultimate-api.herokuapp.com/api/fighters/data/moves?fighter=${currentFighter}`, {
      signal: controller.signal,
      validateStatus: () => true
    });
    if (status !== 200) {
      return { error: 'inklingsssss doesn\'t exist' }
    }
    return data
  }

  it('Correctly sends data on 200 status', async () => {
    expect.extend({
      toBeStringOrNull(received: any, argument: any) {
        const pass: any = expect(received).toEqual(expect.any(argument));
        if (pass || received === null) {
        return {
          message: () => `expected ${received} to be ${argument} type or null`,
          pass: true
        };
      } else {
        return {
          message: () => `expected ${received} to be ${argument} type or null`,
          pass: false
        };
      }
    }
  })
    const scope = nock('https://the-ultimate-api.herokuapp.com')
      .persist()
      .get('/api/fighters/data/moves?fighter=inkling')
      .reply(200, {
        "activeFrames": "3-4",
        "category": "ground",
        "damage": "2.0%",
        "displayName": "Inkling",
        "fighter": "inkling",
        "fighterId": 25,
        "moveId": 561,
        "moveType": "single",
        "name": "jab 1",
        "rosterId": 70,
        "firstFrame": "3",
        "totalFrames": "19",
        "type": "move"
      })
      // { 'Access-Control-Allow-Origin': '*' })
    const result: any = await fetchData('inkling');

    expect(result.activeFrames).toBeOneOf([null, expect.any(String)]);
    expect(result.damage).toBeOneOf([null, expect.any(String)]);
    expect(result.firstFrame).toBeOneOf([null, expect.any(String)]);
    expect(result.totalFrames).toBeOneOf([null, expect.any(String)]);
    expect(result).toEqual(
      expect.objectContaining({
          activeFrames: expect(result.activeFrames).toBeStringOrNull(String),
          category: expect.any(String),
          damage: expect.anything(),
          displayName: expect.any(String),
          fighter: expect.any(String),
          fighterId: expect.any(Number),
          moveId: expect.any(Number),
          moveType: expect.any(String),
          name: expect.any(String),
          rosterId: expect.any(Number),
          firstFrame: expect.anything(),
          totalFrames: expect.anything(),
          type: expect.stringMatching('move')
      })
    )
  })
  it('Correctly returns error', async () => {
    const scope = nock('https://the-ultimate-api.herokuapp.com')
      .persist()
      .get('/api/fighters/data/moves?fighter=inklingsssss')
      .reply(400)
    const result: any = await fetchData('inklingsssss');
    expect(result.error).toBe('inklingsssss doesn\'t exist');
  })
})
