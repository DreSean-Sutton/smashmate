import nock from 'nock'
import axios from 'axios';
axios.defaults.adapter = require('axios/lib/adapters/http')

describe('Testing moves data fetch', () => {
  afterAll(nock.restore);
  afterEach(nock.cleanAll);


  it('Correctly sends data on 200 status', async () => {
    const fetchData = async (currentFighter: string) => {
      try {
        const { status, data } = await axios.get(`https://the-ultimate-api.herokuapp.com/api/fighters/data/moves?fighter=${currentFighter}`);
        if(status !== 200) throw new Error()
        console.log(data)
        return data
      } catch(e: any) {
        return e.response.data
      }
    }
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
      const fetchData = async (currentFighter: string) => {
        try {
          const { status, data } = await axios.get(`https://the-ultimate-api.herokuapp.com/api/fighters/data/moves?fighter=${currentFighter}`);
          if(status !== 200) throw new Error()
          return data;
        } catch(e: any) {
          return e.response.data
        }
      }
      const scope = nock('https://the-ultimate-api.herokuapp.com')
        .persist()
        .get('/api/fighters/data/moves?fighter=inkling')
        .reply(400, {
          error: 'fetch failed!'
        })
        // { 'Access-Control-Allow-Origin': '*' })
      const result: any = await fetchData('inkling');
      expect(result.error).toBe('fetch failed!');
    })
  // it('testing', async () => {
  //   nock('http://www.google.com')
  //     .persist()
  //     .get('/cat-poems')
  //     .reply(404, {error: 'fetch failed!'})
  //   async function fetchData() {
  //     try {
  //       const { status, data } = await axios.get('http://www.google.com/cat-poems')
  //       if(status !== 200) throw new Error('Fetch failed!')
  //       expect(data).toBeTruthy()
  //     } catch(e: any) {
  //       return e.response.data
  //     }
  //   }
  //   const result = await fetchData()
  //   expect(result.error).toBe('fetch failed!')
  // })
  it('testing', async () => {
    nock('http://www.google.com')
      .persist()
      .get('/cat-poems')
      .reply(404, {error: 'fetch failed!'})
    async function fetchData() {
      try {
        const { status, data } = await axios.get('http://www.google.com/cat-poems')
        if(status !== 200) throw new Error('Fetch failed!')
        expect(data).toBeTruthy()
      } catch(e: any) {
        return e.response.data
      }
    }
    const result = await fetchData()
    expect(result.error).toBe('fetch failed!')
  })
})
