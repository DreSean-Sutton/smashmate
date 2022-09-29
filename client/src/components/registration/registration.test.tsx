import nock from 'nock';
import axios from 'axios';
const matchers = require('jest-extended')
expect.extend(matchers);
axios.defaults.adapter = require('axios/lib/adapters/http');

describe.only('All registration routes', () => {
  afterEach(nock.cleanAll);

  // ACCOUNT CREATION TESTS
  describe('Registration creation route', () => {
    afterEach(nock.cleanAll);

    const url = 'http://localhost:5000/registration/account/add';
    const myProfile = {
      username: 'Dre Sean',
      email: 'dreseansutton@gmail.com',
      password: 'test password'
    }
    async function sendAccountDetails() {
      try {
        const controller = new AbortController()
        const { status, data }: any = await axios.post(url, myProfile, {
          signal: controller.signal,
          validateStatus: () => true
        });
        if(data.username) return data;
        if(data.email) return data;
        if (status !== 201) throw new Error('Account creation failed!')
        return data;
      } catch(e: any) {
        return { error: e.message }
      }
    }

    // COMPLETED INSERT TEST
    it('responds with inserted data if correctly inserted', async () => {
      nock('http://localhost:5000')
        .persist()
        .post('/registration/account/add')
        .reply(201, {
          acknowledged: true,
          insertedId: 'sdfisal2904'
        });

      const result = await sendAccountDetails();
      expect(result.acknowledged).toEqual(true);
      expect(result.insertedId).toBeTruthy();
      expect(result.error).toBeUndefined();
    })

    // USERNAME TEST
    it('responds with a username if found before insert', async () => {
      nock('http://localhost:5000')
        .persist()
        .post('/registration/account/add')
        .reply(400, {
          username: myProfile.username
        });
      const result = await sendAccountDetails();
      expect(result.username).not.toBeUndefined();
    })

    // EMAIL TEST
    it('responds with an email if found before insert', async () => {
      nock('http://localhost:5000')
        .persist()
        .post('/registration/account/add')
        .reply(400, {
          email: myProfile.email
        });
      const result = await sendAccountDetails();
      expect(result.email).not.toBeUndefined();
    })

    // ERROR TEST
    it('responds with error message on 500 status code', async () => {
      nock('http://localhost:5000')
        .persist()
        .post('/registration/account/add')
        .reply(500, {
          error: 'An unexpected error occurred!'
        });

      const result = await sendAccountDetails();
      expect(result.error).not.toBeUndefined();
    })
  })

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
})
