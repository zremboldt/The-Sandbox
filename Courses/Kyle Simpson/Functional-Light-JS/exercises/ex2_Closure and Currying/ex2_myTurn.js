// Closure & Currying
// Taking a function that would normally need multiple variables and presetting some of those using closure. That's called currying.

function foo(a, b) {
  return function sumAB() {
    return a + b;
  }
}

var x = foo(3, 4);

x();	// 7
x();	// 7
