// Every object in JS has a property called constructor.
// That property references the function that was used to construct or create that object.

//
// Factory Function
function createCircle(radius) {
  return {
    radius,
    draw: function() {
      console.log(`Drawing a circle with a radius of ${radius}`);
    }
  };
}

const circle = createCircle(5);
console.log(circle.constructor);

//
// Constructor Function
function Circle(radius) {
  this.radius = radius;
  this.draw = function() {
    console.log(`Drawing a circle with a radius of ${this.radius}`);
  };
}

const another = new Circle(2);
console.log(another.constructor);
