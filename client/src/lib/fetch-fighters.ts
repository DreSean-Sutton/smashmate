import axios from 'axios';

const controller = new AbortController();
const headers = {
  signal: controller.signal,
  validateStatus: () => true
}
export default async function getFighters() {
  try {
    const { status, data } = await axios.get('https://the-ultimate-api.dreseansutton.com/api/get/fighters', headers);
    if (status !== 200) throw new Error('An error has occurred');
    return data
  } catch (e: any) {
    return { error: e.message }
  }
}
