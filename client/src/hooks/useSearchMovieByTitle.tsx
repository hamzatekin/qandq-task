import { useQuery } from '@tanstack/react-query';
import { getMovieByTitle } from '../service/omdb-service';

export const useSearchMovieByTitle = (searchParam: string, pageNumber = 1) => {
  return useQuery({
    queryKey: ['searchMovie', searchParam],
    queryFn: () => getMovieByTitle(searchParam, pageNumber),
    enabled: !!searchParam,
  });
};
