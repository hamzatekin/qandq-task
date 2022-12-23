import { useQuery } from '@tanstack/react-query';
import { getMovieByTitle } from '../service/omdb-service';

export const useSearchMovie = (searchParam: string, pageNumber = 1) => {
  console.log('searchParam', searchParam);

  return useQuery({
    queryKey: ['searchMovie', searchParam],
    queryFn: () => getMovieByTitle(searchParam, pageNumber),
    enabled: !!searchParam,
  });
};
