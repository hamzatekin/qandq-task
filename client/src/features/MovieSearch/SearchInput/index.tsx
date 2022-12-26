import { Autocomplete, ButtonBase, TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useDebounce from '../../../hooks/useDebounce';
import { useSearchMovieByTitle } from '../../../hooks/useSearchMovieByTitle';

export const SEARCH_MOVIES = 'Search movies';

export const SearchInput = ({ onItemChanged }: SearchInputTypes) => {
  const [searchText, setSearchText] = useState('');
  const debouncedSearchTerm = useDebounce(searchText);

  const searchMovieQuery = useSearchMovieByTitle(debouncedSearchTerm);

  return (
    <Autocomplete
      style={{ marginTop: '1rem' }}
      onInputChange={(_, value) => setSearchText(value)}
      getOptionLabel={(option) => option.Title}
      onChange={(e, data) => {
        onItemChanged(data);
      }}
      renderOption={(props, option) => {
        return (
          <div>
            <ButtonBase
              style={{ width: '100%' }}
              onClick={() => {
                onItemChanged(option);
              }}
            >
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  flexWrap: 'wrap',
                }}
              >
                <img
                  src={option.Poster.replace('SX300', 'SX600')}
                  alt={option.Title}
                  style={{ width: '100px', height: '100px' }}
                />
                <div style={{ marginLeft: '1rem' }}>
                  <h3>{option.Title}</h3>
                  <p>{option.Year}</p>
                </div>
              </div>
            </ButtonBase>
          </div>
        );
      }}
      options={searchMovieQuery?.data?.Search?.slice(0, 2) || []}
      renderInput={(params) => {
        return (
          <>
            <TextField {...params} label="Search Movie" variant="outlined" />
          </>
        );
      }}
    />
  );
};
