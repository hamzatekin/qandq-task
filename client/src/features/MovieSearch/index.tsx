import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '../../router/const';
import { SearchInput } from './SearchInput';

export const MovieSearch = () => {
  const navigate = useNavigate();

  return (
    <>
      <Typography variant="h5">Search movies</Typography>
      <SearchInput
        onItemChanged={(movie, searchText) => {
          if (!movie?.imdbID) {
            return;
          }

          if (movie?.imdbID === 'see-more-results') {
            navigate(`${RoutePath.SEARCH}/${searchText}`);
            return;
          }

          navigate(`${RoutePath.MOVIES}/${movie.imdbID}`);
        }}
      />
    </>
  );
};
