import fetchDetailsData from '../../../lib/fetch-details-data';
import 'jest-extended';
import nock from 'nock';
import axios from 'axios';
axios.defaults.adapter = require('axios/lib/adapters/http');

describe('Testing throw data fetching', () => {
  afterEach(nock.cleanAll);

  it('sends throw data on 200 status code', async () => {
    nock('https://the-ultimate-api.dreseansutton.com')
      .persist()
      .get('/api/get/fighters/data/throws?fighter=inkling')
      .reply(200, {
        "activeFrames": "8-9",
        "damage": null,
        "displayName": "Inkling",
        "fighter": "inkling",
        "fighterId": 25,
        "name": "grab",
        "rosterId": 70,
        "totalFrames": "34",
        "throwId": 196,
        "type": "throw"
      })
    const { status, data } = await fetchDetailsData('throws', 'inkling');
    expect(status).toBe(200);
    expect(data).toContainAllKeys([
      'activeFrames',
      'damage',
      'displayName',
      'fighter',
      'fighterId',
      'name',
      'rosterId',
      'totalFrames',
      'throwId',
      'type'
    ])
    expect(data.activeFrames).toBeOneOf([null, expect.any(String)]);
    expect(data.damage).toBeOneOf([null, expect.any(String)]);
    expect(data.displayName).toBeString();
    expect(data.fighter).toBeString();
    expect(data.fighterId).toBeNumber();
    expect(data.name).toBeString();
    expect(data.rosterId).toBeNumber();
    expect(data.throwId).toBeNumber();
    expect(data.totalFrames).toBeOneOf([null, expect.any(String)]);
    expect(data.type).toMatch('throw');
  })
  it('sends error message on 400 status', async() => {
    nock('https://the-ultimate-api.dreseansutton.com')
      .persist()
      .get('/api/get/fighters/data/throws?fighter=inklingsssss')
      .reply(400, { error: 'inklingsssss doesn\'t exist' })
    const { status, data } = await fetchDetailsData('throws', 'inklingsssss');
    expect(status).toBe(400);
    expect(data.error).toBe('inklingsssss doesn\'t exist');
  })
})
