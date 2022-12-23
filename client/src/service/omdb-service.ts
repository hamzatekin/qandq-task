import omdbClient from './ombdb-client';

export const getMovieByTitle = async (title: string, pageNumber: number) => {
  const response = await omdbClient.get(`?s=${title}&page=${pageNumber}`);

  return response.data as OmdbSearchResponse;
};
