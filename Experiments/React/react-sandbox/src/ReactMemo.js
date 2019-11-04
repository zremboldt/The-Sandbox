import React from 'react';

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

class ReactMemo extends React.Component {
  state = {
    value: 1,
    name: 'Zac'
  };

  handleClick = () => {
    this.setState({
      value: this.state.value + 1
    });
  };

  render() {
    return (
      <div className="sectionReactMemo">
        <div className="box">
          <h2>{this.state.value}</h2>
          <button onClick={this.handleClick}>+</button>
        </div>
        <ChildOne name={this.state.name} />
        <ChildTwo name={this.state.name} />
      </div>
    );
  }
}

export default ReactMemo;
