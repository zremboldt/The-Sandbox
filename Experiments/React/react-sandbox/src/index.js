import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.sass';
// import ReactMemo from './components/ReactMemo';
// import FetchPokies from './components/FetchPokies';
// import CompositionAvoidsPropDrilling from './components/CompositionAvoidsPropDrilling';
import Gameboard from './apps/gameboard/index';

const App = () => (
  <React.Fragment>
    {/* <ReactMemo /> */}
    {/* <FetchPokies /> */}
    {/* <CompositionAvoidsPropDrilling /> */}
    <Gameboard />
  </React.Fragment>
);

ReactDOM.render(<App />, document.getElementById('root'));
