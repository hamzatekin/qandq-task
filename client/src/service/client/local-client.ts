import axios from 'axios';

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

export default localClient;
