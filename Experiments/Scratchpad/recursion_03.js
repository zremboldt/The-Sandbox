const double = x => x * 2;

function recursiveMap(fn, [head, ...tail]) {
  if (head === undefined) return [];
  return [fn(head), ...recursiveMap(fn, tail)];
};

console.log(recursiveMap(double, [1, 2, 3])) // [ 2, 4, 6 ]