const request = require('supertest');
const nock = require('nock');
const port = process.env.PORT || 5000;

describe("POST /api/registration/account/add", () => {
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

  it("returns a 201 response when a valid query is sent", async () => {
    nock(baseURL)
      .post(postURL)
      .reply(201,{ acknowledged: true, id: 5 });

    const res = await fetchData();
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('acknowledged', true);
    expect(res.body).toHaveProperty('id');
  })

  it("returns a 400 status code and inputed username if it already exists", async () => {
    nock(baseURL)
      .post(postURL)
      .reply(400, { username: 'test_username' });

    const res = await fetchData();
    expect(res.statusCode).toBe(400);
    expect(res.body.username).toBe('test_username');
  })

  it("returns a 400 status code and inputed email if it already exists", async () => {
    nock(baseURL)
      .post(postURL)
      .reply(400, { email: 'test_email' });

    const res = await fetchData();
    expect(res.statusCode).toBe(400);
    expect(res.body.email).not.toBe('test_email');
  })

})

describe.only("POST /api/registration/account/sign-in", () => {
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

  it("returns a 200 status code if the demo account is used as a query", async () => {
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

  it("returns a 400 status code and error if email isn't valid", async () => {
    nock(baseURL)
      .post(postURL)
      .reply(400, {
        error: 'Invalid email'
      })
    const res = await fetchData();
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  })

  it("returns a 400 status code and error if password isn't correct", async () => {
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
