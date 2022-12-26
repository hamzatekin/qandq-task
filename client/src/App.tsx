import { BrowserRouter } from 'react-router-dom';
import { ReactQuery } from './components/ReactQuery';
import { Layouts } from './layouts';

export const App = () => {
  return (
    <>
      <ReactQuery>
        <BrowserRouter>
          <Layouts />
        </BrowserRouter>
      </ReactQuery>
    </>
  );
};
