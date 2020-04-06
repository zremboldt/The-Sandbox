// Recursion

/*
TC39 required that browser makers include an optimization where if a proper tail call is made,
and a function is returned from the current function, the browser will reuse the same stack frame
for the next function rather than creating an additional stack frame each time. 
This makes recursion a real option now in ES6 because as long as you're using proper tail calls, 
there's not that risk of depleting the end user's memory which would result in a crash.
*/

/*
All recursive functions have:
1. A base case (a way to know when to stop so they don't run forever).
2. A recursive call.
*/

// This example, by the way, does not use a proper tail call.

function sumRecur(...args) {
  if (args.length <= 2) return args[0] + args[1]; // base case
  return args[0] + sumRecur(...args.slice(1)); // recursive call. args[0] + the array of args with the first value sliced off. So the args array gets shorter each time.
}

sumRecur(3, 4, 5) // 12
sumRecur(3, 4, 5, 6) // 18