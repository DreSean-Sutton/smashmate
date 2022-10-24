import nock from 'nock';
import axios from 'axios';
const matchers = require('jest-extended')
expect.extend(matchers);
axios.defaults.adapter = require('axios/lib/adapters/http')

describe('Testing stats data fetching', () => {
  afterEach(nock.cleanAll);

  const controller = new AbortController()
  async function fetchData(currentFighter: string) {
    const { status, data } = await axios.get(`https://the-ultimate-api.herokuapp.com/api/get/fighters/data/stats?fighter=${currentFighter}`, {
      signal: controller.signal,
      validateStatus: () => true
    });
    if (status !== 200) {
      return { error: `${currentFighter} doesn't exist` }
    }
    return data
  }

  it('sends stat data on 200 status code', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const scope = nock('https://the-ultimate-api.herokuapp.com')
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
    const result: any = await fetchData('inkling');
    expect(result).toContainAllKeys([
      'displayName',
      'fighter',
      'fighterId',
      'name',
      'rosterId',
      'statId',
      'statValue',
      'type'
    ])
    expect(result.displayName).toBeString();
    expect(result.fighter).toBeString();
    expect(result.fighterId).toBeNumber();
    expect(result.name).toBeString();
    expect(result.rosterId).toBeNumber();
    expect(result.statId).toBeNumber();
    expect(result.statValue).toBeString();
    expect(result.type).toMatch('stat');
  })
  it('sends error message on 400 status', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const scope = nock('https://the-ultimate-api.herokuapp.com')
      .persist()
      .get('/api/get/fighters/data/stats?fighter=inklingsssss')
      .reply(400)
  })
})
