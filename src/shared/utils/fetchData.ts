import axios from 'axios';

const fetchData = async (url: string) => {
  try {
    const response = await axios(url);

    if (response.status !== 200) {
      throw new Error();
    }
    return response.data;
  } catch (error) {
    throw new Error('Cannot fetch the data');
  }
};

export default fetchData;
