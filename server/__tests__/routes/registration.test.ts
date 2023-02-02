const request = require('supertest');
const nock = require('nock');
const port = process.env.PORT || 5000;

describe.only("POST /api/registration/account/add", () => {
  afterEach(nock.cleanAll);

  const url = `http://localhost:${port}`;
  it('TBA', async () => {
    nock(url)
      .post('/api/registration/account/add')
      .reply(201,{ acknowledged: true, id: 5 });

    const res = await request(url)
      .post('/api/registration/account/add')
      .send({
        username: 'test_username',
        email: 'test_email',
        password: 'test_password',
        favorites: []
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('acknowledged', true);
    expect(res.body).toHaveProperty('id');
  })
})
