const { request, nock, port } = require('../../utils/test.config');

describe("Authentication Route: POST /api/auth/register", () => {
  afterEach(nock.cleanAll);

  const baseURL = `http://localhost:${port}`;
  const postURL = '/api/auth/register';
  async function fetchData() {
    const res = await request(baseURL)
      .post(postURL)
      .send({
        username: 'test account',
        email: 'testemail@gmail.com',
        password: 'test_password',
        favorites: []
      });
      return res;
  }

  describe("Successful account creation", () => {
    it("returns a 201 response and inserts a new profile into the database", async () => {
      // nock(baseURL)
      //   .post(postURL)
      //   .reply(201,{ acknowledged: true, insertedId: 5 });

      const res = await fetchData();
      console.log(res.body);
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('acknowledged', true);
      expect(res.body).toHaveProperty('insertedId');
    });
  });

  describe("Username already exists", () => {
    it("returns a 400 response and the inputed username", async () => {
      // nock(baseURL)
      //   .post(postURL)
      //   .reply(400, { username: 'test account' });

      const res = await fetchData();
      expect(res.statusCode).toBe(400);
      expect(res.body.username).toBe('test account');
    });
  });

  describe("Email already exists", () => {
    it("returns a 400 status code and the inputed email", async () => {
      // nock(baseURL)
      //   .post(postURL)
      //   .reply(400, { email: 'testemail@gmail.com' });

      const res = await fetchData();
      expect(res.statusCode).toBe(400);
      expect(res.body.email).toBe('testemail@gmail.com');
    });
  });
});

describe("Authentication route: POST /api/auth/sign-in", () => {
  afterEach(nock.cleanAll);

  const baseURL = `http://localhost:${port}`;
  const postURL = '/api/auth/sign-in';
  async function fetchData() {
    const res = await request(baseURL)
      .post(postURL)
      .send({
        email: 'testemail@gmail.com',
        password: 'test_password',
      })
    return res;
  }

  describe("Successful demo query", () => {
    it("returns a 200 response and demo account details", async () => {
      // nock(baseURL)
      //   .post(postURL)
      //   .reply(200, {
        //   token: 'shhh_its_a_secret',
        //   account: {
        //     id: 'demo_id',
        //     username: 'demo',
        //     email: 'demoaccount@gmail.com'
        //   }
        // });
      const res = await request(baseURL)
        .post(postURL)
        .send({ email: 'demoaccount@gmail.com' });
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body).toHaveProperty('account');
    });
  });

  describe("Successful login details", () => {
    it("returns a 200 status code and json object if query is valid", async () => {
      // nock(baseURL)
      //   .post(postURL)
      //   .reply(200, {
        //   token: 'shhh_its_a_secret',
        //   account: {
        //     id: 'test_id',
        //     username: 'test account',
        //     email: 'testemail@gmail.com'
        //   }
        // });
      const res = await fetchData();
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body).toHaveProperty('account');
    });
  });

  describe("Email doesn't exist in the database", () => {
    it("returns a 400 response and error json object", async () => {
      // nock(baseURL)
      //   .post(postURL)
      //   .reply(400, {
        //   error: 'Invalid email'
        // });
      const res = await fetchData();
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('error');
    });
  });

  describe("Username doesn't exist in the database", () => {
    it("returns a 400 response and error json object", async () => {
      // nock(baseURL)
      //   .post(postURL)
      //   .reply(400, {
        //   error: 'Invalid password'
        // });
      const res = await fetchData();
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('error');
    });
  });
});

describe('Authentication route: POST /api/auth/delete-account', () => {

  const baseURL = `http://localhost:${port}`;
  const postURL = '/api/auth/delete-account';
  async function fetchData() {
    const res = await request(baseURL)
      .post(postURL)
      .send({
        username: 'test account',
        password: 'test_password',
      });

    return res;
  }

  describe("successful requests", () => {
    it("returns a 204 status code if a user is deleted", async () => {
      // nock(baseURL)
      //   .post(postURL)
      //   .reply(204, {});

      const res = await fetchData();
      expect(res.statusCode).toBe(204);
    });
  });
  describe('unsuccessful requests', () => {
    it("returns a 404 status code if user doesn't exist", async () => {
      // nock(baseURL)
      //   .post(postURL)
      //   .reply(404, { error: "User doesn't exist" });

      const res = await fetchData();
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('error');
    })
    it("returns a 400 status code if password is incorrect", async () => {
      // nock(baseURL)
      //   .post(postURL)
      //   .reply(400, { error: "Invalid password" });

      const res = await fetchData();
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('error');
    })
  })
});

export {}
