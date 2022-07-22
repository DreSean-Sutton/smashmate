import axios from 'axios';

export const fetchDetailsData = async (currentFighter: any) => {
  try {
    const response = await axios.get(`https://the-ultimate-api.herokuapp.com/api/fighters/data/moves?fighter=${currentFighter}`)
    console.log('Value in module: ', response);
    return response.data;
  }
  catch (e) {
    console.log('We have the error', e);
  }
}
