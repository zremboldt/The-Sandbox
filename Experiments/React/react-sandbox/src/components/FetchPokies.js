import React, { useState, useEffect } from 'react';

async function fetchPokies(id) {
  let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  return await res.json();
}

const PokieApp = () => {
  const [index, setIndex] = useState(1);
  const [data, setData] = useState('');

  useEffect(() => {
    fetchPokies(index).then(json => setData(json))
  }, [index]);

  if (!data) return <div className='sectionFetchPokies'>loading...</div>

  return (
    <div className='sectionFetchPokies'>
      <img src={data.sprites.front_default} />
      <h3>{data.name}</h3>
      <div>
        <button onClick={() => setIndex(index - 1)}>←</button>
        <button onClick={() => setIndex(index + 1)}>→</button>
      </div>
    </div>
  )
};

export default PokieApp;
