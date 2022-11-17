import fetchDetailsData from '../../../lib/fetch-details-data';
import 'jest-extended';
import nock from 'nock';
import axios from 'axios';
axios.defaults.adapter = require('axios/lib/adapters/http');

describe('Testing stats data fetching', () => {
  afterEach(nock.cleanAll);

  it('sends stat data on 200 status code', async () => {
    const scope = nock('https://the-ultimate-api.dreseansutton.com')
      .persist()
      .get('/api/get/fighters/data/stats?fighter=inkling')
      .reply(200, {
        "displayName": "Inkling",
        "fighter": "inkling",
        "fighterId": 25,
        "name": "weight",
        "rosterId": 70,
        "statId": 315,
        "statValue": "94",
        "type": "stat"
      })
    const { status, data } = await fetchDetailsData('stats', 'inkling');
    expect(status).toBe(200);
    expect(data).toContainAllKeys([
      'displayName',
      'fighter',
      'fighterId',
      'name',
      'rosterId',
      'statId',
      'statValue',
      'type'
    ]);
    expect(data.displayName).toBeString();
    expect(data.fighter).toBeString();
    expect(data.fighterId).toBeNumber();
    expect(data.name).toBeString();
    expect(data.rosterId).toBeNumber();
    expect(data.statId).toBeNumber();
    expect(data.statValue).toBeString();
    expect(data.type).toMatch('stat');
  });
  it('sends error message on 400 status', async () => {
    const scope = nock('https://the-ultimate-api.dreseansutton.com')
      .persist()
      .get('/api/get/fighters/data/stats?fighter=inklingsssss')
      .reply(400, { error: 'inklingsssss doesn\'t exist' })
      const { status, data } = await fetchDetailsData('stats', 'inklingsssss');
      expect(status).toBe(400);
      expect(data.error).toBe('inklingsssss doesn\'t exist');
  })
})
