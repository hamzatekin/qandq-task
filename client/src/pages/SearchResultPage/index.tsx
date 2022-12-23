import { Button } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import AsyncQuery from '../../components/AsyncQuery';
import { useSearchMovieByTitle } from '../../hooks/useSearchMovieByTitle';
import { RoutePath } from '../../router/const';

const SearchResultPage = () => {
  const param = useParams() as { title: string };

  const res = useSearchMovieByTitle(param.title);

  return (
    <>
      <h2>SearchResultPage {param.title}</h2>
      <Button component={Link} variant="contained" to={RoutePath.HOME}>
        Go back
      </Button>
      <AsyncQuery reactQueryResult={res}>
        {(data) => (
          <>
            {data?.Search.map(({ imdbID, Title }) => (
              <div key={imdbID}>
                <p>Title: {Title}</p>
              </div>
            ))}
          </>
        )}
      </AsyncQuery>
    </>
  );
};

export default SearchResultPage;
