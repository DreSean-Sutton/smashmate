const { request, nock, port, testCharacter1, testCharacter2 } = require('../../utils/test.config');

describe("POST /api/favoriting/characters/upsert", () => {

  afterAll(nock.cleanAll);

  const baseURL = `http://localhost:${port}`;
  const postURL = '/api/favoriting/characters/upsert';
  const fighter1 = testCharacter1.fighter;
  const fighter2 = testCharacter2.fighter;

  async function fetchData() {
    const res = await request(baseURL)
      .post(postURL)
      .send({
        email: 'testemail@gmail.com',
        favorites: {
          fighterData: {
            fighter1: testCharacter1,
            fighter2: testCharacter2
          },
          length: 2
        }
      })
    return res;
  }

  describe("Successful upsert", () => {
    it("returns a 201 response and updates a users favorites", async () => {
      nock(baseURL)
        .post(postURL)
        .reply(201, {
        username: 'test account',
        email: 'testemail@gmail.com',
        favorites: {
          fighterData: {
            fighter1: testCharacter1,
            fighter2: testCharacter2
          },
          length: 2
        }
      });

      const res = await fetchData();
      console.log(res.body);
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('favorites');
      expect(res.body.favorites.length).toBe(2);
    })
  })

  describe("Unsuccessful upsert", () => {
    it("returns a 500 response and error", async () => {
      nock(baseURL)
        .post(postURL)
        .reply(500, { error: 'an error has occurred' });
      const res = await fetchData();
      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty('error');
    });
  });
});

describe("POST /api/favoriting/characters/get", () => {

  afterAll(nock.cleanAll);

  const baseURL = `http://localhost:${port}`;
  const postURL = '/api/favoriting/characters/get';
  const fighter1 = testCharacter1.fighter;
  const fighter2 = testCharacter2.fighter;

  async function fetchData() {
    const res = await request(baseURL)
      .post(postURL)
      .send({
        email: 'testemail@gmail.com'
      });
    return res;
  }

  describe("Successful POST request", () => {
    it("returns a 200 response and the user's favorites", async () => {
      nock(baseURL)
        .post(postURL)
        .reply(200, {
        username: 'test account',
        email: 'testemail@gmail.com',
        favorites: {
          fighterData: { fighter1: testCharacter1, fighter2: testCharacter2 },
          length: 2
        }
      });
      const res = await fetchData();
      console.log(res.body);
      expect(res.statusCode).toBe(200);
      // expect(res.body.favorites.fighterData.fighter1).toEqual(testCharacter1);
      // expect(res.body.favorites.fighterData.fighter2).toEqual(testCharacter2);
    })
  })

  describe("Unsuccessful POST request", () => {
    it("returns a 404 response and an error if email doesn't exist", async () => {
      nock(baseURL)
        .post(postURL)
        .reply(400, {
          error: 'invalid email address'
        });
      const res = await fetchData();
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('error');
    });
  });
});

export {}
