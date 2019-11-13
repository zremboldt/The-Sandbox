import React from 'react';

const styles = {
  border: '1px solid #eee',
  borderRadius: 3,
  backgroundColor: '#FFFFFF',
  cursor: 'pointer',
  fontSize: 15,
  padding: '3px 10px',
  margin: 10
};

export const Button = props => (
  <button style={styles} type="button">
    {props.label}
    {props.children}
  </button>
);
