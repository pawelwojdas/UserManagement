import fetchData from '../shared/utils/fetchData';
import { Hobby } from '../shared/types/Hobby';

export const getHobbyList = async () => {
  try {
    const hobbyList: Hobby[] = await fetchData(
      `${process.env.REACT_APP_BASE_URL}/hobbies.json`
    );

    if (!hobbyList.length) {
     throw new Error();
    }

    return hobbyList;
  } catch (error) {
    throw new Error('Cannot fetch the data');
  }
};
