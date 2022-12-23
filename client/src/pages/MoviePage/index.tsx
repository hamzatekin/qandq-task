import { useParams } from 'react-router-dom';

const MoviePage = () => {
  const param = useParams();

  return (
    <>
      <h3>MoviePage id: {param?.id}</h3>
    </>
  );
};

export default MoviePage;
