//
// Here we want to hide (abstract away) certain properties/methods
// from whoever will be using our API, making it simpler to use.

// One good way to hide properties is to simply define them as local variables
// rather than properties of the object. e.g:
// let defaultLocation = { x: 0, y: 0 };
// instead of...
// this.defaultLocation = { x: 0, y: 0 };

function Circle(radius) {
  let defaultLocation = { x: 0, y: 0 };

  this.radius = radius;

  let computeOptimumLocation = function() {
    // ...
  };

  this.draw = function() {
    defaultLocation;
    computeOptimumLocation(0.1);

    console.log('draw');
  };
}

const circle = new Circle(10);

// So here the public facing interface of this object includes only radius and draw.
// Nice and simple!
