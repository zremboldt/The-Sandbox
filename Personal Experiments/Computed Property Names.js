const key = 'pocketColor';
const value = '#ffc600';

const tShirt = {
  [key]: value
};

console.log(tShirt);

// --------------------

function objectify(key, value) {
  return {
    [key]: value
  };
}

console.log(objectify('name', 'Fred'));
