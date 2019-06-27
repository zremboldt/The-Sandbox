const fetchArticle = async () => {
  const keywords = 'bear';
  const number = '0';
  const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${keywords}&prop=info&inprop=url&utf8=&format=json&origin=*&sroffset=${number}&srlimit=20`;

  const response = await fetch(url);
  const json = await response.json();
  console.log(json);
  // document.body.innerHTML = json.name;
};

fetchArticle();
