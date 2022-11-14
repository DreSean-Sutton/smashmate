import nock from 'nock';
import axios from 'axios';
axios.defaults.adapter = require('axios/lib/adapters/http')

describe('Testing throw data fetching', () => {
  afterEach(nock.cleanAll);

  const controller = new AbortController()
  async function fetchData(currentFighter: string) {
    const { status, data } = await axios.get(`https://the-ultimate-api.dreseansutton.com/api/get/fighters/data/throws?fighter=${currentFighter}`, {
      signal: controller.signal,
      validateStatus: () => true
    });
    if (status !== 200) {
      return { error: `${currentFighter} doesn't exist` }
    }
    return data
  }

  it('sends throw data on 200 status code', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const scope = nock('https://the-ultimate-api.dreseansutton.com')
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
    const result: any = await fetchData('inkling');
    expect(result).toContainAllKeys([
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
    expect(result.activeFrames).toBeOneOf([null, expect.any(String)]);
    expect(result.damage).toBeOneOf([null, expect.any(String)]);
    expect(result.displayName).toBeString();
    expect(result.fighter).toBeString();
    expect(result.fighterId).toBeNumber();
    expect(result.name).toBeString();
    expect(result.rosterId).toBeNumber();
    expect(result.throwId).toBeNumber();
    expect(result.totalFrames).toBeOneOf([null, expect.any(String)]);
    expect(result.type).toMatch('throw');
  })
  it('sends error message on 400 status', async() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const scope = nock('https://the-ultimate-api.dreseansutton.com')
      .persist()
      .get('/api/get/fighters/data/throws?fighter=inklingsssss')
      .reply(400)
  })
})
