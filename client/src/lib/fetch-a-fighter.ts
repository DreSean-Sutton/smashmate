import axios from 'axios';

export default async function fetchAFighter(fighter: string) {
  try {
    const res = await axios.get(`https://the-ultimate-api.dreseansutton.com/api/get/fighters?fighter=${fighter}`);
    return await res.data;
  } catch (e) {
    console.error('fetch failed', e);
  }
}
