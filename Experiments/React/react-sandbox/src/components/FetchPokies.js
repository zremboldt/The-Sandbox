import React, { useState, useEffect } from 'react';

const mockData = [
  { id: 0, name: 'Bulbasaur' },
  { id: 1, name: 'Squirtle' },
  { id: 2, name: 'Charmander' },
  { id: 3, name: 'Pikachu' },
  { id: 4, name: 'Dragonite' }
];

const FetchPokies = () => {
  const [currentId, setCurrentId] = useState(0);
  const [data, setData] = useState();

  console.log(data);
  useEffect(() => {
    console.log(currentId);
    // Mock fetch
    setData(mockData[currentId]);

    // fetch('https://pokeapi.co/api/v2/pokemon/')
    //   .then(res => res.json())
    //   .then(json => setData(json.results));
  }, [currentId]);

  // if (data !== undefined) {
  return (
    <React.Fragment>
      <h3>{currentId}</h3>
      {/* <h3>{data}</h3> */}
      <div className="ctr-buttons">
        <button onClick={() => setCurrentId(currentId - 1)}>←</button>
        <button onClick={() => setCurrentId(currentId + 1)}>→</button>
      </div>
    </React.Fragment>
  );
  // } else {
  //   return 'Loading...';
  // }

  // if (data !== undefined) {
  //   return (
  //     <ul>
  //       {data.map((item, i) => (
  //         <li key={i}>
  //           <a href={item.url}>{item.name}</a>
  //         </li>
  //       ))}
  //     </ul>
  //   );
  // } else {
  //   return 'Loading...';
  // }
};

export default FetchPokies;
