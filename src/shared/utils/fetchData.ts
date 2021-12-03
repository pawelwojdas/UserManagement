import axios from 'axios';

const fetchData = async (url: string) => {
  try {
    const response = await axios(url);

    if (response.status !== 200) {
      throw new Error('Cannot fetch the data');
    }
    return response.data;
  } catch (error) {
    //TODO error handling
    console.log(error);
  }
};

export default fetchData;
