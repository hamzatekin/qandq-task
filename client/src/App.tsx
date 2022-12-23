import { BrowserRouter } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ReactQuery } from './components/ReactQuery';

export const App = () => {
  return (
    <>
      <ReactQuery>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </ReactQuery>
    </>
  );
};
