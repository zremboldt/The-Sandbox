const zac = {
  first: 'Zac',
  last: 'Remboldt',
  country: 'USA',
  city: 'Wichita',
  links: {
    social: {
      twitter: 'https://twitter.com/zremboldt',
      github: 'https://github.com/zacaree',
      codepen: 'https://codepen.io/Zacaree/',
      instagram: 'https://www.instagram.com/zremboldt/'
    },
    web: {
      portfolio: 'https://www.zacremboldt.com/'
    }
  }
};

// Pulling from deep nesting
const { twitter, github, instagram } = zac.links.social;
console.log(twitter);
console.log(github);
console.log(instagram);
console.log('');

// Storing destructured values in renamed variables
const { twitter: tweet, instagram: ig } = zac.links.social;
console.log(tweet);
console.log(ig);
console.log('');

// Setting fallback values
const settings = { width: 300, color: 'black' }; // height and fontSize are not included.
// Here we're giving default values to anything that doesn't already have a value.
const { width = 100, height = 100, color = 'blue', fontSize = 22 } = settings;
console.log(width, height, color, fontSize);
