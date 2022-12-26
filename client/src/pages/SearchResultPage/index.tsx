import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { Fragment } from 'react';
import { Link, useParams } from 'react-router-dom';
import AsyncQuery from '../../components/AsyncQuery';
import { useSearchMovieByTitle } from '../../hooks/useSearchMovieByTitle';
import { RoutePath } from '../../router/const';

const SearchResultPage = () => {
  const param = useParams() as { title: string };

  const res = useSearchMovieByTitle(param.title);

  return (
    <>
      <Button
        style={{ marginTop: '1rem', margin: '8px 16px' }}
        component={Link}
        variant="contained"
        to={RoutePath.HOME}
      >
        Go back
      </Button>
      <AsyncQuery reactQueryResult={res}>
        {(data) => (
          <>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              {data?.Search.map(({ imdbID, Title, Poster, Year }) => {
                console.log('Poster', Poster);

                return (
                  <Fragment key={imdbID}>
                    <ListItem>
                      <ListItemAvatar>
                        {Poster !== 'N/A' ? (
                          <img
                            style={{ width: '100px', borderRadius: '10%' }}
                            loading="lazy"
                            src={Poster}
                            alt={Title}
                          />
                        ) : (
                          <Avatar>{Title[0]}</Avatar>
                        )}
                      </ListItemAvatar>
                      <ListItemText
                        style={{ marginLeft: '1rem' }}
                        primary={Title}
                        secondary={Year}
                      />
                    </ListItem>
                  </Fragment>
                );
              })}
            </List>
          </>
        )}
      </AsyncQuery>
    </>
  );
};

export default SearchResultPage;
