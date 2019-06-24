//
// Constructor Function
function Circle(radius) {
  this.radius = radius;
  this.draw = function() {
    console.log(`Drawing a circle with a radius of ${this.radius}`);
  };
}

const circle = new Circle(10);

// Let's add a new property to our circle object.
circle.location = { x: 1 };
circle['location'] = { x: 2 };

// We can delete properties like this...
delete circle.location;
