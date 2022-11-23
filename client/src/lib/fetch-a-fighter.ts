import axios from 'axios';

export default async function fetchAFighter(fighter: string) {
  try {
    const {status, data} = await axios.get(`https://the-ultimate-api.dreseansutton.com/api/get/fighters?fighter=${fighter}`);
    if(status !== 200) throw new Error(data.statusText)
    return data;
  } catch (e: any) {
    return { error: e.message }
  }
}
