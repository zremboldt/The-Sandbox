import React, { useState } from 'react';

const ChildOne = React.memo(props => {
  console.log('Rerendering Child One');
  return (
    <div className="box">
      <h2>Hello! {props.name}</h2>
      <p>This component won't re-render, check your console.</p>
    </div>
  );
});

const ChildTwo = props => {
  console.log('Rerendering Child Two');
  return (
    <div className="box">
      <h2>Hello! {props.name}</h2>
      <p>This component will render re-render, check your console.</p>
    </div>
  );
};

const ReactMemo = () => {
  const [value, setValue] = useState(0);
  const [name] = useState(0);

  return (
    <div className="sectionReactMemo">
      <div className="box">
        <h2>{value}</h2>
        <button onClick={() => setValue(value + 1)}>+</button>
      </div>
      <ChildOne name={name} />
      <ChildTwo name={name} />
    </div>
  );
};

export default ReactMemo;
