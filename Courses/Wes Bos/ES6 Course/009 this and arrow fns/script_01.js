// Video 009 of Wes Bos's ES6 Course is a treasure trove of valuable understnding.

// You generally want to use a standard fn as your top level fn to contain scope.
// Why? Read below...

const box = document.querySelector(".box");

// this is scoped to the box here because we're using a standard function
box.addEventListener("click", function() {
  console.log(this);
});

// this is scoped to the next containing fn or the
// Window here because we're using an arrow fn
box.addEventListener("click", () => {
  console.log(this);
});

// Why do we get window for the second one?
// Because when you use an arrow fn, the value of "this"
// is not rebound inside of that fn.
// It is just inherited from whatever the parent scope is.
// And in this case the parent scope is the window.

// You don't just want to go willy nilly using arrow fns everywhere.
// You need to understand the pros and cons.
