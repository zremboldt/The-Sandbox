import React, { useState, useEffect } from 'react';

const FetchPokies = () => {
  const [data, setData] = useState();

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon/')
      .then(res => res.json())
      .then(json => setData(json.results));
  }, []);

  if (data !== undefined) {
    return (
      <ul>
        {data.map((item, i) => (
          <li key={i}>
            <a href={item.url}>{item.name}</a>
          </li>
        ))}
      </ul>
    );
  } else {
    return 'Loading...';
  }
};

export default FetchPokies;
