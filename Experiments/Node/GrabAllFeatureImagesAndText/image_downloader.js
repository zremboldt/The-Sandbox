const axios = require('axios');
const cheerio = require('cheerio');
// const fs = require('fs');
// const request = require('request');

const products = ['dash', 'raptor', 'raptor-sd'];

// products.forEach(product => {});

const getData = html => {
  let data = [];
  const $ = cheerio.load(html);

  console.log($('h3.feature-thumb-title').text());
};

axios
  .get(`https://www.hustlerturf.com/products/${products[0]}`)
  .then(res => getData(res.data))
  .catch(err => console.log(err));
