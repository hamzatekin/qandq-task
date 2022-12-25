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
        {({ Title, Poster, Plot, Actors, Director, Genre, Released, Runtime, Writer, Year }) => (
          <>
            {Title && (
              <div>
                <h3>{Title}</h3>
                <img src={Poster.replace('SX300', 'SX600').replace('SY300', 'SY600')} alt={Title} />
                <p>{Plot}</p>
                <p>{Actors}</p>
                <p>{Director}</p>
                <p>{Genre}</p>
                <p>{Released}</p>
                <p>{Runtime}</p>
                <p>{Writer}</p>
                <p>{Year}</p>

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
