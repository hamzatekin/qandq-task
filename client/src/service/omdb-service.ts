import omdbClient from './client/ombdb-client';

export const getMovieByTitle = async (title: string, pageNumber: number) => {
  const response = await omdbClient.get(`?s=${title}&page=${pageNumber}`);

  return response.data as OmdbSearchResponse;
};

export const getMovieByImdbId = async (imdbId: string) => {
  const response = await omdbClient.get(`?i=${imdbId}`);

  return response.data as OmdbMovieResponse;
};
