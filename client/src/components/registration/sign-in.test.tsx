import nock from 'nock';
import axios from 'axios';
const matchers = require('jest-extended')
expect.extend(matchers);
axios.defaults.adapter = require('axios/lib/adapters/http');

describe.only('Registration sign in routes', () => {
  afterEach(nock.cleanAll);

  const url = `http://localhost:5000/registration/account/sign-in`;

  async function collectProfile(query: any) {
    try {
      const controller = new AbortController();
      const { status, data }: any = await axios.post(url, query, {
        signal: controller.signal,
        validateStatus: () => true
      });
      console.log(status, data);
      if(status !== 200) throw data.error;
      return data;
    } catch(e) {
      console.log('e value: ', e)
      return { error: e };
    }
  }

  // 200 STATUS CODE TEST
  it('responds with token and user object when queried', async () => {

    const query200 = {
      email: 'testemail@gmail.com',
      password: 'test password'
    }

    const result = await collectProfile(query200);
    expect(result.user).toBeTruthy();
    expect(result.token).toBeTruthy();
    expect(result).toEqual(
      expect.objectContaining({
        token: expect.any(String),
        user: expect.objectContaining({
          id: expect.any(String),
          username: expect.any(String),
          email: expect.any(String)
        })
      })
    )
  })

  // EMAIL ERROR TESTS
  it('responds with error messages if email isn\'t found', async () => {
    const queryEmail401 = {
      email: 'failedQuery@gmail.com',
      password: 'failed password'
    }
    const result = await collectProfile(queryEmail401);
    expect(result.email).toBeUndefined();
    expect(result.password).toBeUndefined();
    expect(result).toEqual(
      expect.objectContaining({
        error: expect.stringMatching(/email/i)
      })
    );
  })

  // PASSWORD ERROR TESTS
  it('responds with error message if password isn\'t found', async () => {
    const queryPassword401 = {
      email: 'testemail@gmail.com',
      password: 'failed password'
    }
    const result = await collectProfile(queryPassword401);
    expect(result.email).toBeUndefined();
    expect(result.password).toBeUndefined();
    expect(result).toEqual(
      expect.objectContaining({
        error: expect.stringMatching(/password/i)
      })
    );
  })

  // SERVER ERROR TESTS
  it.skip('tells the client if a server error occurs', async () => {
    const query500Error = {
      email: 'testemail@gmail.com',
      password: 'test password'
    }
    const result = await collectProfile(query500Error);
    expect(result.email).toBeUndefined();
    expect(result.password).toBeUndefined();
    expect(result).toEqual(
      expect.objectContaining({
        error: expect.stringMatching(/unexpected error/i)
      })
    );
  })
})
