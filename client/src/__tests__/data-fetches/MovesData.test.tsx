import fetchDetailsData from '../../lib/fetch-details-data';
import 'jest-extended';
import nock from 'nock';
import axios from 'axios';
axios.defaults.adapter = require('axios/lib/adapters/http');

// Note to self: console.log increases test response delay

describe('Testing moves data fetch', () => {
  afterEach(nock.cleanAll);

  it('sends move data on 200 status code', async () => {
    const scope = nock('https://the-ultimate-api.dreseansutton.com')
      .persist()
      .get('/api/get/fighters/data/moves?fighter=inkling')
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
    const { status, data } = await fetchDetailsData('moves', 'inkling');
    expect(status).toBe(200);
    expect(data).toContainAllKeys([
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
    expect(data.activeFrames).toBeOneOf([null, expect.any(String)]);
    expect(data.category).toBeString();
    expect(data.damage).toBeOneOf([null, expect.any(String)]);
    expect(data.displayName).toBeString();
    expect(data.fighter).toBeString();
    expect(data.fighterId).toBeNumber();
    expect(data.firstFrame).toBeOneOf([null, expect.any(String)]);
    expect(data.moveId).toBeNumber();
    expect(data.moveType).toBeString();
    expect(data.name).toBeString();
    expect(data.rosterId).toBeNumber();
    expect(data.totalFrames).toBeOneOf([null, expect.any(String)]);
    expect(data.type).toMatch('move');
  })
  it('Correctly returns error', async () => {
    const scope = nock('https://the-ultimate-api.dreseansutton.com')
      .persist()
      .get('/api/get/fighters/data/moves?fighter=inklingsssss')
      .reply(400, { error: 'inklingsssss doesn\'t exist' })
    const { status, data } = await fetchDetailsData('moves', 'inklingsssss');
    expect(status).toBe(400);
    expect(data.error).toBe('inklingsssss doesn\'t exist');
  })
})
