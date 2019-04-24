const key = 'favoriteColor';
const value = '#ffc600';

const tShirt = { [key]: value };

// tShirt = { favoriteColor: #ffc600 }
console.log(tShirt);

// --------------------

function objectify(key, value) {
  return {
    [key]: value
  };
}

console.log(objectify('name', 'Fred'));
