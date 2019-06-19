//
// Constructor Function
function Circle(radius) {
  this.radius = radius;
  this.draw = function() {
    console.log(`Drawing a circle with a radius of ${this.radius}`);
  };
}

const circle = new Circle(10);

for (const key in circle) {
  if (typeof circle[key] !== 'function') {
    console.log(key, circle[key]);
  }
}

const keys = Object.keys(circle);
console.log(keys);

if ('radius' in circle) {
  console.log('Circle has a radius.');
}
