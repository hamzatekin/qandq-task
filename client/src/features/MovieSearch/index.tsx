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
        onItemChanged={(movie) => {
          if (!movie?.imdbID) {
            return;
          }

          navigate(`${RoutePath.MOVIES}/${movie.imdbID}`);
        }}
      />
    </>
  );
};
