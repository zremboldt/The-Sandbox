function foo(a, b) {
  return function sumAB() {
    return a + b;
  }
}

var x = foo(3, 4);

x();	// 7
x();	// 7
