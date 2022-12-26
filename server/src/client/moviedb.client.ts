// https://api.themoviedb.org/4/list/1?page=1&api_key=ae618504e97d1efc95ecb868bf7a0027

import axios, { AxiosRequestConfig } from 'axios';

export const MOVIEDB_BASE_PATH = 'https://api.themoviedb.org/4/';
export const MOVIEDB_API_KEY = 'ae618504e97d1efc95ecb868bf7a0027';

console.log('basePath', MOVIEDB_BASE_PATH);
console.log('apiKey', MOVIEDB_API_KEY);

// axios v1.2.1 has bug still not fixed. works on v1.1.3
// ref: https://github.com/axios/axios/issues/5346
const movieDbClient = axios.create({
  baseURL: `${MOVIEDB_BASE_PATH}`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
  responseType: 'json',
});

movieDbClient.interceptors.request.use((req: AxiosRequestConfig<any>) => {
  req.url = `${req.url}&api_key=${MOVIEDB_API_KEY}`;

  return req;
});

export default movieDbClient;
