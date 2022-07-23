import axios from 'axios';

let res: any;
export const fetchDetailsData = async (currentFighter: string | undefined, type: string) => {
  try {
    res = await axios.get(`https://the-ultimate-api.herokuapp.com/api/fighters/data/${type}?fighter=${currentFighter}`)
    if(res.status === 200) {
      return res;
    }
  }
  catch (e) {
    console.error('We have the error', e);
    return e;
  }
}
