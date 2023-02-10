const { request, nock, port, testCharacter1, testCharacter2 } = require('../test.config');

describe("Favoriting route: POST /api/favoriting/characters/upsert", () => {

  afterAll(nock.cleanAll);

  const baseURL = `http://localhost:${port}`;
  const postURL = '/api/favoriting/characters/upsert';
  async function fetchData() {
    const res = await request(baseURL)
      .post(postURL)
      .send({
        email: 'testemail@gmail.com',
        favorites: [testCharacter1, testCharacter2]
      })
    return res;
  }

  describe("Successful upsert", () => {
    it("returns a 201 response and updates a users favorites", async () => {
      nock(baseURL)
        .post(postURL)
        .reply(201, { lastErrorObject: {
          upsert: true
        }
      })

      const res = await fetchData();
      expect(res.statusCode).toBe(201);
      expect(res.body.lastErrorObject.upsert).toBeTruthy();
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
    })
  })
})

describe("Favoriting route: POST /api/favoriting/characters/get", () => {

  afterAll(nock.cleanAll);

  const baseURL = `http://localhost:${port}`;
  const postURL = '/api/favoriting/characters/upsert';
  async function fetchData() {
    const res = await request(baseURL)
      .post(postURL)
      .send({
        email: 'testemail@gmail.com'
      })
    return res;
  }

  describe("Successful POST request", () => {
    it("returns a 200 response and the user's favorites", async () => {
      nock(baseURL)
        .post(postURL)
        .reply(200, [testCharacter1, testCharacter2])
      const res = await fetchData();
      expect(res.statusCode).toBe(200);
      expect(res.body[0]).toEqual(testCharacter1);
      expect(res.body[1]).toEqual(testCharacter2);
    })
  })

  describe("Unsuccessful POST request", () => {
    it("returns a 404 response and an error if email doesn't exist", async () => {
      nock(baseURL)
        .post(postURL)
        .reply(400, {
          error: 'invalid email address'
        })
      const res = await fetchData();
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('error');
    })
  })
})

export {}
