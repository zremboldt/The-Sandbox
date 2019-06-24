function Circle(radius) {
  this.radius = radius;
  this.move = () => console.log(`move`);
}

const c1 = new Circle(1);
const c2 = new Circle(2);

/////////////////////////////////////////////////////////////////

// The constructor of c1 will be Circle, this is found in the prototype of c1.
console.log(Object.getPrototypeOf(c1));

/////////////////////////////////////////////////////////////////

// ========================
//  💰GOLD NUGGETS BELOW ↓
// ========================

// c1 and c2 both have an independent (copied) draw method taking up space in memory.
// Let's imagine we had 1000 circles made from Circle.
// They'd all have their own copy of draw().
// A better way: We can take this draw method out of the Circle object and
// put it in its prototype because we'll only have a single instance of
// this prototype in memory so the same will be true of the draw method.
// So how do we do this?

// Circle.prototype gives us exactly the same thing as c1.__proto__
// These two properties ↑ are referencing the same object in memory. That's the "Circle base".
// So using Circle.prototype we can quickly and safely access this object.

Circle.prototype.draw = () => console.log(`draw method added using prototype`);
const c3 = new Circle(3);

// Now log c3 and take a look at the prototype!
// Because of prototypical inheritance we can still access the draw method like this
// c3.draw()
// because when JS engine doesn't find draw() on c3 it just keeps looking up the
// prototype chain! Cool!

// So we have two types of properties/methods in js
// We have "Instance Properties/Methods" and "Prototype Properties/Methods"
// Example ↓

function Square(width) {
  // Instance property
  this.width = width;
}

// This will be a Prototype property
Square.prototype.height = 4;

/////////////////////////////////////////////////////////////////

// Every object has the toString method. Let's take what we just learned and
// override toString to do something different on the prototype of our Circle objects.

Circle.prototype.toString = function() {
  this.move(); // ← You can even reference instance methods from the prototype
  return `This circle has a radius of ${this.radius}`;
};
