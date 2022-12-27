import axios from 'axios';
import { useUserStore } from '../../store/useUserStore';

export const BASE_PATH = 'http://localhost:3001';

const localClient = axios.create({
  baseURL: `${BASE_PATH}`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 10000,
  responseType: 'json',
});

localClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response.status === 401) {
      // or just delete the token from the local storage
      const { logOut } = useUserStore.getState();
      logOut();
    }
    if (error.response) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  },
);

export default localClient;
