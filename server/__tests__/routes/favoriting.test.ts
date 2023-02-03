var { request, nock, port } = require('../test.config');

describe.only("Favoriting route: POST /api/favoriting/characters/upsert", () => {

  afterAll(nock.cleanAll);

  const baseURL = `http://localhost:${port}`;
  const postURL = '/api/favoriting/characters/upsert';
  async function fetchData() {
    const res = await request(baseURL)
      .post(postURL)
      .send({
        email: 'testemail@gmail.com',
        favorites: [ 'character1', 'character2' ]
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

      })
    return res;
  }
  describe("", () => {
    it("does nothing", async () => {

    })
  })
})
