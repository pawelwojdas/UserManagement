import { useState, useContext, useCallback } from 'react';
import { SnackbarContext } from '../context/SnackbarContext';
import axios from 'axios';

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setSnackbar } = useContext(SnackbarContext);

  const fetchData = useCallback(
    async (url: string) => {
      setIsLoading(true);
      try {
        const response = await axios(url);

        if (response.status < 400 && response.status !== 200) {
          setSnackbar(true, 'No data available', 'warning');
          return;
        } else if (response.status >= 400) {
          throw new Error();
        }
        setIsLoading(false);
        return response.data;
      } catch (error) {
        setIsLoading(false);
        throw new Error('Cannot fetch the data');
      }
    },
    [setSnackbar]
  );

  
  return { fetchData, isLoading};
};
