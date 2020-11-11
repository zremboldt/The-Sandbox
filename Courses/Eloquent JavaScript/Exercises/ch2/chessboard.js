const size = 8;
const totalCells = size * size;

let string = '';
let evenRow = false;

for (let i = 0; i < totalCells; i++) {
  if (i % size === 0) {
    string += '\n';
    evenRow = !evenRow;
  }

  if (i % 2 === 0) {
    evenRow ? string += ' ' : string += '#'
  } else {
    evenRow ? string += '#' : string += ' '
  }
}

console.log(string)
