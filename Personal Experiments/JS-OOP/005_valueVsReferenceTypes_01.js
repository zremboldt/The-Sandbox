let x = 10;
let y = x;

x = 20;
// `y` is independent of `x`. It doesn't change when `x` changes.
console.log(y); // 10

//

//

//

let a = { value: 10 };
let b = a;

a.value = 20;
// `b` is linked to `a`. It does change when `a` changes.
// Both `a` and `b` are pointing to the same object in memory.
console.log(b); // 20

//

//

// Conclusion:
// Primitives (value types) are copied by their value
// Objects (reference types) are copied by their reference
