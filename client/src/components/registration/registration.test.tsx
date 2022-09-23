import nock from 'nock';
import axios from 'axios';
const matchers = require('jest-extended')
expect.extend(matchers);
axios.defaults.adapter = require('axios/lib/adapters/http')

describe.only('Registration creation route', () => {
  // afterEach(nock.cleanAll);

  const controller = new AbortController()
  async function sendAccountDetails(url: string, profile: any) {
    const result = await axios.post(url, profile, {
      signal: controller.signal,
      validateStatus: () => true
    });
    // console.error(result);
    if (result.status !== 200) {
      return { error: `Account creation failed!` }
    }
    return result.data;
  }
  const myProfile = {
    username: 'Dre Sean',
    email: 'dreseansutton@gmail.com',
    password: 'test password'
  }
  it('responds with correct data on 200 status code', async () => {
    const url = 'http://localhost:5000/registration/add/account';
    const result = await sendAccountDetails(url, myProfile);
    console.log(result);
    expect(result.acknowledged).toEqual(true);
    expect(result.insertedId).toBeTruthy();
  })
  it('responds to the user if url isn\'t found', async () => {
    const url = 'http://localhost:5000/registration/add/accounts';
    const result = await sendAccountDetails(url, myProfile);
    expect(result.error).toBeTruthy();
  })
})
