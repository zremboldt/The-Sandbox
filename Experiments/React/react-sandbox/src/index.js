import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.sass';
import ReactMemo from './components/ReactMemo';
import FetchPokies from './components/FetchPokies';

const App = () => (
  <React.Fragment>
    {/* <ReactMemo /> */}
    <FetchPokies />
  </React.Fragment>
);

ReactDOM.render(<App />, document.getElementById('root'));
