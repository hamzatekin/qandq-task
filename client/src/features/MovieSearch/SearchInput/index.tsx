import { Autocomplete, ButtonBase, TextField } from '@mui/material';
import { Fragment, useState } from 'react';
import useDebounce from '../../../hooks/useDebounce';
import { useSearchMovieByTitle } from '../../../hooks/useSearchMovieByTitle';

export const SEARCH_MOVIES = 'Search movies';

export const SearchInput = ({ onItemChanged }: SearchInputTypes) => {
  const [searchText, setSearchText] = useState('');
  const debouncedSearchTerm = useDebounce(searchText);

  const searchMovieQuery = useSearchMovieByTitle(debouncedSearchTerm);

  const seeMoreResults: OmdbMovie = {
    Title: 'See more results',
    imdbID: 'see-more-results',
    Poster: '',
    Year: '',
    Type: '',
  };

  const allMovies = searchMovieQuery?.data?.Search?.slice(0, 2).concat(seeMoreResults) || [];

  return (
    <Autocomplete
      data-testid="search-input"
      style={{ marginTop: '1rem' }}
      filterOptions={(options) => options}
      onInputChange={(_, value) => setSearchText(value)}
      getOptionLabel={(option) => option.Title}
      onChange={(e, data) => {
        onItemChanged(data, debouncedSearchTerm);
      }}
      renderOption={(props, option, state) => {
        if (option.imdbID === 'see-more-results') {
          return (
            <Fragment key={option.imdbID}>
              <ButtonBase
                style={{ padding: '1rem' }}
                onClick={() => {
                  onItemChanged(option, debouncedSearchTerm);
                }}
              >
                See More Results
              </ButtonBase>
            </Fragment>
          );
        }

        return (
          <Fragment key={option.imdbID}>
            <ButtonBase
              style={{
                width: '100%',
                padding: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
              onClick={() => {
                onItemChanged(option, debouncedSearchTerm);
              }}
            >
              <img
                src={option.Poster?.replace('SX300', 'SX600').replace('SY300', 'SY600')}
                alt={option.Title}
                loading="lazy"
                style={{ width: '100px', height: '100px' }}
              />
              <div style={{ marginLeft: '1rem' }}>
                <h3>{option.Title}</h3>
                <p>{option.Year}</p>
              </div>
            </ButtonBase>
          </Fragment>
        );
      }}
      options={allMovies}
      renderInput={(params) => <TextField {...params} label="Search Movie" variant="outlined" />}
    />
  );
};
