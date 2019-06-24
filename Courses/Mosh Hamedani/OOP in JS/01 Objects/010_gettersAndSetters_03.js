//
// Now if you want to be able to set the value of `defaultLocation` from the outside
// you'll want to use a setter.

// So we'll define another key value pair under `get`
// It'll be `set`

function Circle(radius) {
  let defaultLocation = { x: 0, y: 0 };

  this.radius = radius;
  this.draw = function() {
    console.log('draw');
  };

  Object.defineProperty(this, 'defaultLocation', {
    get: function() {
      return defaultLocation;
    },
    set: function(value) {
      // We can include some validation here. This a the benefit of using a setter.
      // If value.x or value.y is falsy...
      if (!value.x || !value.y) throw new Error('Invalid location.');
      defaultLocation = value;
    }
  });
}

const circle = new Circle(10);

// Now you can set the value of `defaultLocation` from outside of Circle
// and there is validation in case someone does this...
circle.defaultLocation = 1;

// but if they do this it'll all be good!
circle.defaultLocation = { x: 2, y: 10 };
