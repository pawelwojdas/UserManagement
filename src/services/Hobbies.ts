import { useCallback } from 'react';
import { useHttpClient } from '../shared/hooks/useHttpClient';
import { Hobby } from '../shared/types/Hobby';

export const useHobbies = () => {
  const { fetchData } = useHttpClient();

  const getHobbyList = useCallback(async () => {
    try {
      const hobbyList: Hobby[] = await fetchData(
        `${process.env.REACT_APP_BASE_URL}/hobbies.json`
      );

      return hobbyList;
    } catch (error) {
      throw new Error('Cannot fetch the data');
    }
  }, [fetchData]);
  return { getHobbyList };
};
