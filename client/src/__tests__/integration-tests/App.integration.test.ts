import '@testing-library/jest-dom';
import 'jest-extended';
import nock from 'nock';
import axios from 'axios';
axios.defaults.adapter = require('axios/lib/adapters/http');
import getFighters from '../../lib/fetch-fighters';

describe("testing /api/get/fighters route", () => {
  afterEach(nock.cleanAll);

  it("Returns an array of fighters with 200 status code", async () => {
    nock('https://the-ultimate-api.dreseansutton.com')
      .persist()
      .get('/api/get/fighters')
      .reply(200, [
        {
          displayName: 'Inkling',
          fighter: 'inkling',
          fighterId: 25,
          rosterId: 70
        },
        {
          displayName: "Bowser Jr",
          fighter: "bowserJr",
          fighterId: 4,
          rosterId: 63
        }
      ])
    const fighterArray = { length: 0, fighterData: {} };
    const result = await getFighters();
    for(const obj of result) {
      fighterArray.fighterData[obj.fighter] = obj;
      fighterArray.length++;
    }
    expect(fighterArray.fighterData['inkling']).toBeTruthy();
    expect(fighterArray.fighterData['bowserJr']).toBeTruthy();
    expect(fighterArray.fighterData['inkling']).toHaveProperty('fighter');
    expect(fighterArray.fighterData['inkling']).toHaveProperty('displayName');
    expect(fighterArray.fighterData['inkling']).toHaveProperty('rosterId');
    expect(fighterArray.fighterData['inkling']).toHaveProperty('fighterId');
    expect(fighterArray.fighterData['bowserJr']).toHaveProperty('fighter');
    expect(fighterArray.fighterData['bowserJr']).toHaveProperty('displayName');
    expect(fighterArray.fighterData['bowserJr']).toHaveProperty('rosterId');
    expect(fighterArray.fighterData['bowserJr']).toHaveProperty('fighterId');
  })

  it("Returns an error on 404 response", async () => {
    nock('https://the-ultimate-api.dreseansutton.com')
      .persist()
      .get('/api/get/fighters')
      .reply(404)
    const { error } = await getFighters();
    expect(error).toBeTruthy();
    expect(error).toBe('An error has occurred');
  })
});

describe("Testing /api/favoriting/characters/upsert", () => {

  describe("Testing add/remove favorites", () => {
    afterEach(nock.cleanAll);

    const url = 'http://localhost:5000/api/favoriting/characters/upsert';
    const myProfile = {
      email: 'testemail@gmail.com',
      favorites: [
        {
          displayName: 'Inkling',
          fighter: 'inkling',
          fighterId: 25,
          rosterId: 70
        },
        {
          displayName: "Bowser Jr",
          fighter: "bowserJr",
          fighterId: 4,
          rosterId: 63
        }
      ]
    }
    const controller = new AbortController();
    const headers = {
      signal: controller.signal,
      validateStatus: () => true
    }
    async function addFavorites() {
      try {
        const { status, data }: any = await axios.post(url, myProfile, headers);
        if (status !== 201) throw new Error('favoriting failed!')
        return data;
      } catch (e: any) {
        return { error: e.message }
      }
    }

    it("responds with 201 status data if inserted correctly", async () => {
      nock('http://localhost:5000')
        .persist()
        .post('/api/favoriting/characters/upsert')
        .reply(201, {
            lastErrorObject: {
              updatedExisting: true
            }
          })
        const result = await addFavorites();
      expect(result).toBeTruthy();
      expect(result.lastErrorObject.updatedExisting).toBeTruthy();
    })

    it("returns an error message if insert fails", async () => {
      nock('http://localhost:5000')
        .persist()
        .post('/api/favoriting/characters/upsert')
        .replyWithError('An unexpected error occurred!');
      const result = await addFavorites();
      expect(result).toHaveProperty('error');
    });
  });

  describe("Testing /api/favoriting/characters/get", () => {
    afterEach(nock.cleanAll);

    const url = 'http://localhost:5000/api/favoriting/characters/get';
    const queryEmail = { email:'testemail@gmail.com' };
    const controller = new AbortController()
    const header = {
      signal: controller.signal,
      validateStatus: () => true
    }
    async function getFavorites() {
      try {
        const {status, data} = await axios.post(url, queryEmail, header);
        if(status !== 200) throw new Error('Fetch failed!');
        return data
      } catch(e: any) {
        return {error: e.message}
      }
    }

    it("Returns an array of favorites from database", async () => {
      nock('http://localhost:5000')
        .persist()
        .post('/api/favoriting/characters/get')
        .reply(200, [
          {
            displayName: 'Inkling',
            fighter: 'inkling',
            fighterId: 25,
            rosterId: 70
          },
          {
            displayName: "Bowser Jr",
            fighter: "bowserJr",
            fighterId: 4,
            rosterId: 63
          }
        ])
      const result = await getFavorites();
      expect(result).toBeTruthy();
      expect(result.length).toBe(2);
      expect(result).not.toHaveProperty('error');
    });

    it("returns an error message when an error occurs", async () => {

      axios.get = jest.fn(() => Promise.reject(new Error('Request failed')));
      const result = await getFighters();
      expect(result).toEqual({ error: 'Request failed' });
    });
  });
});
