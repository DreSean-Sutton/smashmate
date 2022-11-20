import axios from 'axios';

const controller = new AbortController();
const headers = {
  signal: controller.signal,
  validateStatus: () => true
}
export default async function getFighters() {
  try {
    const { status, data } = await axios.get('https://the-ultimate-api.dreseansutton.com/api/get/fighters', headers);
    if (status === 200) {
      return data
    } else {
      throw Error(data.statusText);
    }
  } catch (e) {
    console.error('Fetch failed!', e);
  }
}
