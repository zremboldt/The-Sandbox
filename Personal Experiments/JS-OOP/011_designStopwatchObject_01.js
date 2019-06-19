//
// Design a stopwatch object

// Members should include:
// duration - a property
// start - a method
// stop - a method
// reset - a method

// initial duration should be 0
// we can start the stopwatch using sw.start()
// if we try to start again it will throw an error.
// We can't call stop twice either.
// duration logs the current duration.

function Stopwatch() {
  let duration = 0;
  let currentStart = 0;
  let currentStop = 0;

  this.start = function() {
    if (currentStart !== 0) throw new Error('Reset the stopwatch before starting again.');
    currentStart = Date.now();
  };

  this.stop = function() {
    if (currentStart === 0) throw new Error('You must start before you can stop.');
    if (currentStop !== 0) throw new Error('Stopwatch is already stopped.');
    currentStop = Date.now();
    duration = currentStop - currentStart;
  };

  this.reset = function() {
    duration = 0;
    currentStart = 0;
    currentStop = 0;
  };

  Object.defineProperty(this, 'duration', {
    get: function() {
      return duration;
    }
  });
}

const sw = new Stopwatch();
