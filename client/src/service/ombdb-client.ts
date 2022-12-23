import axios, { AxiosRequestConfig } from 'axios';

export const BASE_PATH = process.env.REACT_APP_OMDB_API;
export const API_KEY = process.env.REACT_APP_API_KEY;

console.log('basePath', BASE_PATH);
console.log('apiKey', API_KEY);

const omdbClient = axios.create({
  baseURL: `${BASE_PATH}`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 10000,
  responseType: 'json',
});

omdbClient.interceptors.request.use((req: AxiosRequestConfig<any>) => {
  req.url = `${req.url}&apikey=${API_KEY}`;

  return req;
});

export default omdbClient;
