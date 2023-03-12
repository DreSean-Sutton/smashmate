const { request, nock, port } = require('../../utils/test.config');

describe("Registration Route: POST /api/registration/account/add", () => {
  afterEach(nock.cleanAll);

  const baseURL = `http://localhost:${port}`;
  const postURL = '/api/registration/account/add';
  async function fetchData() {
    const res = await request(baseURL)
      .post(postURL)
      .send({
        username: 'test_username',
        email: 'test_email',
        password: 'test_password',
        favorites: []
      })
      return res;
  }

  describe("Successful account creation", () => {
    it("returns a 201 response and inserts a new profile into the database", async () => {
      nock(baseURL)
        .post(postURL)
        .reply(201,{ acknowledged: true, id: 5 });

      const res = await fetchData();
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('acknowledged', true);
      expect(res.body).toHaveProperty('id');
    })
  })

  describe("Username already exists", () => {
    it("returns a 400 response and the inputed username", async () => {
      nock(baseURL)
        .post(postURL)
        .reply(400, { username: 'test_username' });

      const res = await fetchData();
      expect(res.statusCode).toBe(400);
      expect(res.body.username).toBe('test_username');
    })

  })

  describe("Email already exists", () => {
    it("returns a 400 status code and the inputed email", async () => {
      nock(baseURL)
        .post(postURL)
        .reply(400, { email: 'test_email' });

      const res = await fetchData();
      expect(res.statusCode).toBe(400);
      expect(res.body.email).toBe('test_email');
    })
  })
})

describe("Registration route: POST /api/registration/account/sign-in", () => {
  afterEach(nock.cleanAll);

  const baseURL = `http://localhost:${port}`;
  const postURL = '/api/registration/account/sign-in';
  async function fetchData() {
    const res = await request(baseURL)
      .post(postURL)
      .send({
        email: 'test_email',
        password: 'test_password',
      })
    return res;
  }

  describe("Successful demo query", () => {
    it("returns a 200 response and demo account details", async () => {
      nock(baseURL)
        .post(postURL)
        .reply(200, {
          token: 'shhh_its_a_secret',
          account: {
            id: 'demo_id',
            username: 'demo',
            email: 'demoaccount@gmail.com'
          }
        })
      const res = await request(baseURL)
        .post(postURL)
        .send({ email: 'demoaccount@gmail.com' });
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body).toHaveProperty('account');
    })
  })

  describe("Successful login details", () => {
    it("returns a 200 status code and json object if query is valid", async () => {
      nock(baseURL)
        .post(postURL)
        .reply(200, {
          token: 'shhh_its_a_secret',
          account: {
            id: 'test_id',
            username: 'test_username',
            email: 'test_email'
          }
        });
      const res = await fetchData();
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body).toHaveProperty('account');
    })
  })

  describe("Email doesn't exist in the database", () => {
    it("returns a 400 response and error json object", async () => {
      nock(baseURL)
        .post(postURL)
        .reply(400, {
          error: 'Invalid email'
        })
      const res = await fetchData();
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('error');
    })
  })

  describe("Username doesn't exist in the database", () => {
    it("returns a 400 response and error json object", async () => {
      nock(baseURL)
        .post(postURL)
        .reply(400, {
          error: 'Invalid password'
        })
      const res = await fetchData();
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('error');
    })
  })
})

export {}
