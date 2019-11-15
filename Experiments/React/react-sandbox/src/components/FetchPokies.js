import React, { useState, useEffect } from 'react';

const FetchPokies = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('https://pokeapi.co/api/v2/pokemon/');
      const json = await res.json();
      console.log(json);
      setData(json.results);
    };

    fetchData();
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
