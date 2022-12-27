import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AsyncQuery from '../../components/AsyncQuery';
import { useRecommendMovie } from '../../hooks/useRecommendMovie';
import { useSearchMovieByImdbId } from '../../hooks/useSearchMovieByImdbId';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const MoviePage = () => {
  const param = useParams() as { id: string };
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  const result = useSearchMovieByImdbId(param.id);
  // todo: handle status
  const { mutate } = useRecommendMovie();

  const recommend = () => {
    if (email) {
      mutate({ to: email, imdbId: param.id });
      setOpen(false);
      setEmail('');
    }
  };

  const closeModal = () => {
    setOpen(false);
    setEmail('');
  };

  return (
    <>
      <Button style={{ margin: '8px 16px' }} variant="contained" onClick={() => navigate(-1)}>
        GO BACK
      </Button>
      <Button onClick={() => setOpen(true)} style={{ margin: '8px 16px' }} variant="contained">
        Reccommend
      </Button>
      <Modal
        hideBackdrop
        open={open}
        onClose={closeModal}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <TextField
            name="email"
            label="Email"
            onChange={(ev) => setEmail(ev.target.value)}
            variant="outlined"
          />
          <Button onClick={() => recommend()}>Reccommend</Button>
          <Button onClick={closeModal}>Close</Button>
        </Box>
      </Modal>
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
