import 'jest-extended';
import nock from 'nock';
import axios from 'axios';
axios.defaults.adapter = require('axios/lib/adapters/http');

describe('Registration sign in routes', () => {
  afterEach(nock.cleanAll);

  const url = 'http://localhost:5000/api/registration/account/sign-in';
  const controller = new AbortController();
  const headers = {
    signal: controller.signal,
    validateStatus: () => true
  }
  async function collectProfile(query: any) {
    try {
      const { status, data }: any = await axios.post(url, query, headers);
      if(status !== 200) throw data.error;
      return data;
    } catch(e) {
      return { error: e };
    }
  }

  // 200 STATUS CODE TEST
  it('responds with token and user object when queried', async () => {

    nock('http://localhost:5000')
      .persist()
      .post('/api/registration/account/sign-in')
      .reply(200, {
        token: 'teststringofrandomcharacters',
        account: {
          email: 'testemail@gmail.com',
          id: '2138948205',
          username: 'test username'
        }
      })

    const query200 = {
      email: 'testemail@gmail.com',
      password: 'test password'
    }

    const result = await collectProfile(query200);
    expect(result).not.toHaveProperty('error');
    expect(result).toEqual(
      expect.objectContaining({
        token: expect.any(String),
        account: expect.objectContaining({
          email: expect.any(String),
          id: expect.any(String),
          username: expect.any(String)
        })
      })
    )
  })

  // EMAIL ERROR TESTS
  it('responds with error messages if email isn\'t found', async () => {

    nock('http://localhost:5000')
      .persist()
      .post('/api/registration/account/sign-in')
      .reply(401, {
        error: 'Invalid email'
      })

    const queryEmail401 = {
      email: 'failedQuery@gmail.com',
      password: 'failed password'
    }

    const result = await collectProfile(queryEmail401);
    expect(result).not.toHaveProperty('email');
    expect(result).not.toHaveProperty('password');
    expect(result).toEqual(
      expect.objectContaining({
        error: expect.stringMatching(/email/i)
      })
    );
  })

  // PASSWORD ERROR TESTS
  it('responds with error message if password isn\'t found', async () => {

    nock('http://localhost:5000')
      .persist()
      .post('/api/registration/account/sign-in')
      .replyWithError('Invalid password')

    const queryPassword401 = {
      email: 'testemail@gmail.com',
      password: 'failed password'
    }
    const result = await collectProfile(queryPassword401);
    expect(result).not.toHaveProperty('email');
    expect(result).not.toHaveProperty('password');
    expect(result).toHaveProperty('error');
  })

  // SERVER ERROR TESTS
  it('tells the client if a server error occurs', async () => {

    nock('http://localhost:5000')
      .persist()
      .post('/api/registration/account/sign-in')
      .reply(401, {
        error: 'An unexpected error occurred'
      })

    const query500Error = {
      email: 'testemail@gmail.com',
      password: 'test password'
    }
    const result = await collectProfile(query500Error);
    expect(result).not.toHaveProperty('email');
    expect(result).not.toHaveProperty('password');
    expect(result).toEqual(
      expect.objectContaining({
        error: expect.stringMatching(/unexpected error/i)
      })
    );
  })
})
