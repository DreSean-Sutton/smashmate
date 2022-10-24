import nock from 'nock';
import axios from 'axios';
const matchers = require('jest-extended')
expect.extend(matchers);
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
    const result: any = await fetchData('inkling');
    expect(result).toContainAllKeys([
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
    expect(result.activeFrames).toBeOneOf([null, expect.any(String)]);
    expect(result.displayName).toBeString();
    expect(result.fighter).toBeString();
    expect(result.fighterId).toBeNumber();
    expect(result.movementId).toBeNumber();
    expect(result.name).toBeString();
    expect(result.rosterId).toBeNumber();
    expect(result.totalFrames).toBeOneOf([null, expect.any(String)]);
    expect(result.type).toMatch('movement');
  })
  it('sends error message on 400 status', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const scope = nock('https://the-ultimate-api.dreseansutton.com')
      .persist()
      .get('/api/get/fighters/data/movements?fighter=inklingsssss')
      .reply(400)
  })
})
