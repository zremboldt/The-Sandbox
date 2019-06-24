function Shape() {}

function Circle(radius) {
  this.radius = radius;
}

// Circle by default will inherit from `Object.prototype` which is the JS root object.
// We want Circle to inherit from Shape. Here's how we can do that:
Circle.prototype = Object.create(Shape.prototype);
// Whenever you reset the prototype as shown above,
// it's best practice to reset the constructor as well.
Circle.prototype.constructor = Circle;

// Now we can add a method to Shape and any type of shape we want to make
// will inherit that method. (Circle, Square, Triangle, etc.)
Shape.prototype.duplicate = () => console.log('duplicate');

// Here, draw() will only be available to Circle.
Circle.prototype.draw = () => console.log('draw');

///////////////////////////////////////////////////////////////////

// Now let's use a constructor fn to create Square.
function Square() {}
// Here we'll set it to be the child of Shape so that it can inherit common functionality.
// In this case it will inherit the duplicate method from Shape.
Square.prototype = Object.create(Shape.prototype);

///////////////////////////////////////////////////////////////////

const shape = new Shape();
const circle = new Circle(2);
const square = new Square();
