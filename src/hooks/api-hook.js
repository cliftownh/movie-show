import { useState, useEffect } from 'react';
import axios from 'axios';

const useAPI = (initialURL, initialData) => {
  const [data, setData] = useState(initialData);
  const [url, setURL] = useState(initialURL);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const result = await axios(url);

        setData(result.data);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  return [{ data, isLoading, isError }, setURL];
};
export default useAPI;
