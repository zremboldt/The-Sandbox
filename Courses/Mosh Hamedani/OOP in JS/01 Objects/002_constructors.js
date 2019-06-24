// This is another way to create an object in JS
// The naming convention for a constructor function is different...
// The first letter of the fn should be uppercase.

// Constructor Function
function Circle(radius) {
  this.radius = radius;
  this.draw = function() {
    console.log(`Drawing a circle with a radius of ${this.radius}`);
  };
}

const anotherCircle = new Circle(2).draw();
