const fetchPokies = async () => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon/charmander/');
  const json = await response.json();
  console.log(json);
  document.body.innerHTML = json.name;
};

fetchPokies();
