let obj = { value: 10 };

function increase(obj) {
  obj.value++;
}

increase(obj);
console.log(obj); // 11

// This happens because "obj the variable" and
// "obj the argument" are referencing the same slot in memory.
