//
// So we don't want to be able to modify `defaultLocation` from the outside
// but what if we want to display that location somewhere in our application?
// We just want to be able to read it...

// A good solution for this would be:
// Use a getter to make defaultLocation a read-only property.

function Circle(radius) {
  let defaultLocation = { x: 0, y: 0 };

  this.radius = radius;
  this.draw = function() {
    console.log('draw');
  };

  Object.defineProperty(this, 'defaultLocation', {
    get: function() {
      return defaultLocation;
    }
  });
}

const circle = new Circle(10);

// Now you can read the value of default location from outside of Circle!
console.log(circle.defaultLocation);
// and it cannot be modified!
circle.defaultLocation = 2;
// circle.defaultLocation is still { x: 0, y: 0 }

// Cool!
