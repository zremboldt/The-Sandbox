//
// So we don't want to be able to modify `defaultLocation` from the outside
// but what if we want to display that location somewhere in our application?
// We just want to be able to read it...

// One solution would be to define a method inside `Circle` called getDefaultLocation

function Circle(radius) {
  let defaultLocation = { x: 0, y: 0 };

  this.getDefaultLocation = function() {
    return defaultLocation;
  };
  this.radius = radius;
  this.draw = function() {
    console.log('draw');
  };
}

const circle = new Circle(10);

// Now we can do this.
circle.getDefaultLocation();
// But there's a better way... (see next file)
