import axios from 'axios';

export default async function fetchDetailsData(dataType: string, currentFighter: string ) {
  const controller = new AbortController();
  const{ status, data } = await axios.get(`https://the-ultimate-api.dreseansutton.com/api/get/fighters/data/${dataType}?fighter=${currentFighter}`, {
    signal: controller.signal,
    validateStatus: () => true
  });
  return { data, status };
}
