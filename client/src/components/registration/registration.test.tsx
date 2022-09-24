import nock from 'nock';
import axios from 'axios';
const matchers = require('jest-extended')
expect.extend(matchers);
axios.defaults.adapter = require('axios/lib/adapters/http')

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
      const result = await axios.post(url, myProfile, {
        signal: controller.signal,
        validateStatus: () => true
      });
      if (result.status !== 200) throw new Error('Account creation failed!')
      return result.data;
    } catch(e: any) {
      return { error: e.message }
    }
  }


  it('responds with correct data on 200 status code', async () => {
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
