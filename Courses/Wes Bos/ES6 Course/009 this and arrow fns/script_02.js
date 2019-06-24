// Video 009 of Wes Bos's ES6 Course is a treasure trove of valuable understnding.

// You generally want to use a standard fn as your top level fn to contain scope.

const box = document.querySelector('.box');

// If we use a standard function and don't bind it to anything
// then "this" will refer to the global context; Window in this case.
// We can fix this by using an arrow fn inside the timeout.
box.addEventListener('click', function() {
  console.log(this);
  // setTimeout(function() {
  //   console.log(this);
  //   this.classList.toggle("grow");
  // }, 100);
  setTimeout(() => {
    console.log(this);
    this.classList.toggle('grow');
  }, 100);
});
