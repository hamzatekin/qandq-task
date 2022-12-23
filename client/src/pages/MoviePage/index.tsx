import { useNavigate, useParams } from 'react-router-dom';
import AsyncQuery from '../../components/AsyncQuery';
import { useSearchMovieByImdbId } from '../../hooks/useSearchMovieByImdbId';

const MoviePage = () => {
  const param = useParams() as { id: string };
  const navigate = useNavigate();

  const result = useSearchMovieByImdbId(param.id);

  return (
    <>
      <h3>MoviePage id: {param?.id}</h3>
      <AsyncQuery reactQueryResult={result}>
        {(data) => (
          <>
            {data?.Title && (
              <div>
                <h3>{data.Title}</h3>
                <img
                  src={data.Poster.replace('SX300', 'SX600').replace('SY300', 'SY600')}
                  alt={data.Title}
                />
                <p>{data.Plot}</p>
                <p>{data.Actors}</p>
                <p>{data.Director}</p>
                <p>{data.Genre}</p>
                <p>{data.Released}</p>
                <p>{data.Runtime}</p>
                <p>{data.Writer}</p>
                <p>{data.Year}</p>

                <button onClick={() => navigate(-1)}>Back</button>
              </div>
            )}
          </>
        )}
      </AsyncQuery>
    </>
  );
};

export default MoviePage;
