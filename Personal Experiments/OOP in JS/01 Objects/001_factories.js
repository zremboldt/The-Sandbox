// This is one way to create an object in JS
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
circle.draw();
