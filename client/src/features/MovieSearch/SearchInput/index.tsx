import { Button } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import AsyncQuery from '../../../components/AsyncQuery';
import useDebounce from '../../../hooks/useDebounce';
import { useSearchMovie } from '../../../hooks/useSearchMovie';
import { RoutePath } from '../../../router/const';
import styles from './styles.module.scss';

export const SEARCH_MOVIES = 'Search movies';

export const SearchInput = () => {
  const [searchText, setSearchText] = useState<string>('');
  const debouncedSearchTerm = useDebounce(searchText);

  const inputChangeHandler = (text: string) => {
    setSearchText(text);
  };

  const searchMovieQuery = useSearchMovie(debouncedSearchTerm);

  return (
    <>
      <input placeholder={SEARCH_MOVIES} onChange={(ev) => inputChangeHandler(ev.target.value)} />
      <AsyncQuery reactQueryResult={searchMovieQuery}>
        {(data) => (
          <>
            {data?.Search.map(({ imdbID, Title }) => (
              <div className={styles.resultWrapper} key={imdbID}>
                <Button component={Link} variant="contained" to={`${RoutePath.MOVIES}/${imdbID}`}>
                  {Title}
                </Button>
              </div>
            )).slice(0, 2)}
            {data?.Search && <Link to={`/search/${debouncedSearchTerm}`}>See all results</Link>}
          </>
        )}
      </AsyncQuery>
    </>
  );
};
