import { useQuery } from '@tanstack/react-query';
import { getMovieByImdbId } from '../service/omdb-service';

export const useSearchMovieByImdbId = (imdbId: string) => {
  return useQuery({
    queryKey: ['uearchMovieByImdbId', imdbId],
    queryFn: () => getMovieByImdbId(imdbId),
  });
};
