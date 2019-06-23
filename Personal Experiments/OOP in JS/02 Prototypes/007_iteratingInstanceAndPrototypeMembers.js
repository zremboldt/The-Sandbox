function Circle(radius) {
  // Instance members
  this.radius = radius;
  this.move = () => console.log(`move`);
}

// Prototype members
Circle.prototype.draw = () => console.log('draw');

const c1 = new Circle(1);

//////////////////////////////////////////////////////////////////////

// Take note:
// Object.keys only returns instance members
console.log(Object.keys(c1));

// for-in returns all instance and prototype members.
for (let key in c1) console.log(key);

//////////////////////////////////////////////////////////////////////

// In JS lingo we often use "own property" interchangebly with "instance property".
// So if we use hasOwnProperty to check for an instance property we get true.
console.log(c1.hasOwnProperty('radius'));
// If we use hasOwnProperty to check for a prototype property we get false.
console.log(c1.hasOwnProperty('draw'));
