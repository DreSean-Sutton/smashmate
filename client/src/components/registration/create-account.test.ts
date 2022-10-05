import nock from 'nock';
import axios from 'axios';
const matchers = require('jest-extended')
expect.extend(matchers);
axios.defaults.adapter = require('axios/lib/adapters/http');

describe('Registration creation route', () => {
  afterEach(nock.cleanAll);

  const url = 'http://localhost:5000/registration/account/add';
  const myProfile = {
    email: 'dreseansutton@gmail.com',
    password: 'test password',
    username: 'Dre Sean'
  }
  const controller = new AbortController()
  const headers = {
    signal: controller.signal,
    validateStatus: () => true
  }
  async function sendAccountDetails() {
    try {
      const { status, data }: any = await axios.post(url, myProfile, headers);
      if (data.username) return data;
      if (data.email) return data;
      if (status !== 201) throw new Error('Account creation failed!')
      return data;
    } catch (e: any) {
      return { error: e.message }
    }
  }

  // COMPLETED INSERT TEST
  it('responds with 201 status data if correctly inserted', async () => {
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
      .replyWithError('An unexpected error occurred!')

    const result = await sendAccountDetails();
    expect(result).toHaveProperty('error');
  })
})
