import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { RoutePath } from '../../router/const';

const NotFoundPage = () => {
  return (
    <Button component={Link} variant="contained" to={RoutePath.HOME}>
      You're lost. Go to Home
    </Button>
  );
};

export default NotFoundPage;
