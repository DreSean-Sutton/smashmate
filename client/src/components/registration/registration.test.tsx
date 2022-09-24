import nock from 'nock';
import axios from 'axios';
import { profile } from 'console';
const matchers = require('jest-extended')
expect.extend(matchers);
axios.defaults.adapter = require('axios/lib/adapters/http')
describe('All registration routes', () => {
  afterEach(nock.cleanAll);

  describe.only('Registration creation route', () => {
    afterEach(nock.cleanAll);

    const url = 'http://localhost:5000/registration/add/account';
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
        if (status !== 200) throw new Error('Account creation failed!')
        if(data.username) return data;
        if(data.email) return data;
        return data;
      } catch(e: any) {
        return { error: e.message }
      }
    }

    // COMPLETED INSERT TEST
    it('responds with inserted data if correctly inserted', async () => {
      nock('http://localhost:5000')
        .persist()
        .post('/registration/add/account')
        .reply(200, {
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
        .post('/registration/add/account')
        .reply(200, {
          username: myProfile.username
        });
      const result = await sendAccountDetails();
      expect(result.username).not.toBeUndefined();
    })

    // EMAIL TEST
    it('responds with an email if found before insert', async () => {
      nock('http://localhost:5000')
        .persist()
        .post('/registration/add/account')
        .reply(200, {
          email: myProfile.email
        });
      const result = await sendAccountDetails();
      expect(result.email).not.toBeUndefined();
    })

    // ERROR TEST
    it('responds with error message on 404 status code', async () => {
      nock('http://localhost:5000')
        .persist()
        .post('/registration/add/account')
        .reply(400, {
          error: 'Account creation failed!'
        });

      const result = await sendAccountDetails();
      expect(result.error).not.toBeUndefined();
    })
  })
})
