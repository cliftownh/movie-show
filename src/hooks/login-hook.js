import { useState } from 'react';
import useAPI from './api-hook';

export const useLogin = (username, password) => {
  // const [value, setValue] = useState(initialValue);

  const [{ data, isError }] = useAPI('localhost:4000/user/login', {
    username,
    password
  });

  return {};
};
