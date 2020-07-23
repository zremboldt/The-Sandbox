import React from 'react';
import './App.css';

function Avatar({ ...props }) {
  return (
    <img
      className="avatar"
      {...props}
    />
  )
}

const avatars = [
  { size: 3 },
  { size: 4 },
  { size: 5 },
  { size: 6 },
  { size: 7 },
  { size: 8 },
  { size: 9 },
  { size: 10 },
  { size: 11 },
]

export default function App() {
  return (
    <div
      className="App"
      style={{ '--grid--column-count': Math.floor(avatars.length / 3) }}
    >
      {avatars.map(({ size }) => (
        <Avatar
          alt="Kitty"
          src="https://placekitten.com/200/300"
          style={{ '--avatar--size': `${size}rem` }}
        />
      ))}
    </div>
  );
}
