var { request, nock, port } = require('../test.config');

describe.only("Favoriting route: POST /api/favoriting/characters/upsert", () => {

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
