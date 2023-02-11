import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.sass';
import Gameboard from './apps/gameboard/index';

const App = () => (
  <React.Fragment>
    <Gameboard />
  </React.Fragment>
);

ReactDOM.render(<App />, document.getElementById('root'));
