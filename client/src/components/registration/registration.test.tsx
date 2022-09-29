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

    const myQuery = {
      email: 'testemail@gmail.com',
      password: 'test password'
    }
    const url = `http://localhost:5000/registration/account/sign-in`;

    async function collectProfile() {
      try {
        const controller = new AbortController();
        const { status, data }: any = await axios.post(url, myQuery, {
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
    it('responds with profile obj when queried', async () => {
      const result = await collectProfile();
      console.log('collectProfile result: ', result);
      expect(result.email).toBeTruthy();
    })
  })
})
