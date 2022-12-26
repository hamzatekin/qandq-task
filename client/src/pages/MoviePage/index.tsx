import { Box, Button, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import AsyncQuery from '../../components/AsyncQuery';
import { useSearchMovieByImdbId } from '../../hooks/useSearchMovieByImdbId';

const MoviePage = () => {
  const param = useParams() as { id: string };
  const navigate = useNavigate();

  const result = useSearchMovieByImdbId(param.id);

  return (
    <>
      <Button style={{ margin: '8px 16px' }} variant="contained" onClick={() => navigate(-1)}>
        GO BACK
      </Button>
      <AsyncQuery reactQueryResult={result}>
        {({ Title, Poster, Plot, Actors, Director, Genre, Released, Runtime, Writer, Year }) => (
          <>
            {Title && (
              <Box display="flex" flexDirection="column" padding="8px 16px">
                <Typography variant="h5">{Title}</Typography>
                <img
                  loading="lazy"
                  src={Poster.replace('SX300', 'SX400').replace('SY300', 'SY400')}
                  alt={Title}
                />
                <Typography variant="h6">Plot</Typography>
                <Typography variant="body1">{Plot}</Typography>
                <Typography variant="h6">Actors</Typography>
                <Typography variant="body1">{Actors}</Typography>
                <Typography variant="h6">Director</Typography>
                <Typography variant="body1">{Director}</Typography>
                <Typography variant="h6">Genre</Typography>
                <Typography variant="body1">{Genre}</Typography>
                <Typography variant="h6">Released</Typography>
                <Typography variant="body1">{Released}</Typography>
                <Typography variant="h6">Runtime</Typography>
                <Typography variant="body1">{Runtime}</Typography>
                <Typography variant="h6">Writer</Typography>
                <Typography variant="body1">{Writer}</Typography>
                <Typography variant="h6">Year</Typography>
                <Typography variant="body1">{Year}</Typography>
              </Box>
            )}
          </>
        )}
      </AsyncQuery>
    </>
  );
};

export default MoviePage;
