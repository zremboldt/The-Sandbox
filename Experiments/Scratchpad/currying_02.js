// Taking a function that would normally need multiple variables and presetting some of those using closure. That's called currying.

function sumX(x) {
  return function (y) {
    return x + y;
  };
}

const add10 = sumX(10);

add10(3) // 13
add10(12) // 22