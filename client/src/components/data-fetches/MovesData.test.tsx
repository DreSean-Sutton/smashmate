import nock from 'nock';
import axios from 'axios';
const matchers = require('jest-extended')
expect.extend(matchers);
axios.defaults.adapter = require('axios/lib/adapters/http');

// Note to self: console.log increases test response delay

describe('Testing moves data fetch', () => {
  afterEach(nock.cleanAll);

  const controller = new AbortController()
  async function fetchData(currentFighter: string) {
    const { status, data } = await axios.get(`https://the-ultimate-api.dreseansutton.com/api/get/fighters/data/moves?fighter=${currentFighter}`, {
      signal: controller.signal,
      validateStatus: () => true
    });
    if (status !== 200) {
      return { error: `${currentFighter} doesn't exist` }
    }
    return data
  }

  it('sends move data on 200 status code', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const scope = nock('https://the-ultimate-api.dreseansutton.com')
      .persist()
      .get('/api/api/get/fighters/data/moves?fighter=inkling')
      .reply(200, {
        "activeFrames": "3-4",
        "category": "ground",
        "damage": "2.0%",
        "displayName": "Inkling",
        "fighter": "inkling",
        "fighterId": 25,
        "firstFrame": "3",
        "moveId": 561,
        "moveType": "single",
        "name": "jab 1",
        "rosterId": 70,
        "totalFrames": "19",
        "type": "move"
      })
    const result: any = await fetchData('inkling');
    expect(result).toContainAllKeys([
      'activeFrames',
      'category',
      'damage',
      'displayName',
      'fighter',
      'fighterId',
      'firstFrame',
      'moveId',
      'moveType',
      'name',
      'rosterId',
      'totalFrames',
      'type'
    ])
    expect(result.activeFrames).toBeOneOf([null, expect.any(String)]);
    expect(result.category).toBeString();
    expect(result.damage).toBeOneOf([null, expect.any(String)]);
    expect(result.displayName).toBeString();
    expect(result.fighter).toBeString();
    expect(result.fighterId).toBeNumber();
    expect(result.firstFrame).toBeOneOf([null, expect.any(String)]);
    expect(result.moveId).toBeNumber();
    expect(result.moveType).toBeString();
    expect(result.name).toBeString();
    expect(result.rosterId).toBeNumber();
    expect(result.totalFrames).toBeOneOf([null, expect.any(String)]);
    expect(result.type).toMatch('move');
    // expect(result).toEqual(
    //   expect.objectContaining({
    //       activeFrames: expect(result.activeFrames).toBeOneOf([null, expect.anything()]),
    //       category: expect.any(String),
    //       damage: expect.anything(),
    //       displayName: expect.any(String),
    //       fighter: expect.any(String),
    //       fighterId: expect.any(Number),
    //       moveId: expect.any(Number),
    //       moveType: expect.any(String),
    //       name: expect.any(String),
    //       rosterId: expect.any(Number),
    //       firstFrame: expect.anything(),
    //       totalFrames: expect.anything(),
    //       type: expect.stringMatching('move')
    //   })
    // )
  })
  it('Correctly returns error', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const scope = nock('https://the-ultimate-api.dreseansutton.com')
      .persist()
      .get('/api/get/fighters/data/moves?fighter=inklingsssss')
      .reply(400)
    const result: any = await fetchData('inklingsssss');
    expect(result.error).toBe('inklingsssss doesn\'t exist');
  })
})
