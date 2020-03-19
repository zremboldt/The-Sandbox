import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.sass';
import ReactMemo from './components/ReactMemo';
import FetchPokies from './components/FetchPokies';
import CompositionAvoidsPropDrilling from './components/CompositionAvoidsPropDrilling';
import CoronaApp from './apps/coronavirus/index';

const App = () => (
  <React.Fragment>
    {/* <ReactMemo /> */}
    {/* <FetchPokies /> */}
    <CoronaApp />
    {/* <CompositionAvoidsPropDrilling /> */}
  </React.Fragment>
);

ReactDOM.render(<App />, document.getElementById('root'));
