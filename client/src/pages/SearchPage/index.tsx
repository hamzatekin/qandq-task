import { Box } from '@mui/material';
import { MovieSearch } from '../../features/MovieSearch';

const SearchPage = () => {
  return (
    <>
      <Box marginTop={'2rem'}>
        <MovieSearch />
      </Box>
    </>
  );
};

export default SearchPage;
