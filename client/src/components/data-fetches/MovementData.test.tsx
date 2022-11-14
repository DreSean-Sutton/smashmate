import fetchDetailsData from '../../lib/fetch-details-data';
import nock from 'nock';
import axios from 'axios';
import 'jest-extended'
axios.defaults.adapter = require('axios/lib/adapters/http')

describe('Testing movement data fetching', () => {
  afterEach(nock.cleanAll);

  const controller = new AbortController()
  async function fetchData(currentFighter: string) {
    const { status, data } = await axios.get(`https://the-ultimate-api.dreseansutton.com/api/get/fighters/data/movements?fighter=${currentFighter}`, {
      signal: controller.signal,
      validateStatus: () => true
    });
    if (status !== 200) {
      return { error: `${currentFighter} doesn't exist` }
    }
    return data
  }

  it('sends movement data on 200 status code', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const scope = nock('https://the-ultimate-api.dreseansutton.com')
      .persist()
      .get('/api/get/fighters/data/movements?fighter=inkling')
      .reply(200, {
        "activeFrames": "3-17",
        "displayName": "Inkling",
        "fighter": "inkling",
        "fighterId": 25,
        "movementId": 218,
        "name": "spot dodge",
        "rosterId": 70,
        "totalFrames": "20/25",
        "type": "movement"
      })
    const {status, data } = await fetchDetailsData('movements', 'inkling');
    expect(status).toBe(200);
    expect(data).toContainAllKeys([
      'activeFrames',
      'displayName',
      'fighter',
      'fighterId',
      'movementId',
      'name',
      'rosterId',
      'totalFrames',
      'type'
    ])
    expect(data.activeFrames).toBeOneOf([null, expect.any(String)]);
    expect(data.displayName).toBeString();
    expect(data.fighter).toBeString();
    expect(data.fighterId).toBeNumber();
    expect(data.movementId).toBeNumber();
    expect(data.name).toBeString();
    expect(data.rosterId).toBeNumber();
    expect(data.totalFrames).toBeOneOf([null, expect.any(String)]);
    expect(data.type).toMatch('movement');
  })
  it('sends error message on 400 status', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const scope = nock('https://the-ultimate-api.dreseansutton.com')
      .persist()
      .get('/api/get/fighters/data/movements?fighter=inklingsssss')
      .reply(400)
      const { status, data } = await fetchDetailsData('movements', 'inklingsssss');
      expect(status).toBe(400);
      expect(data).not.toBeTruthy()
  })
})
