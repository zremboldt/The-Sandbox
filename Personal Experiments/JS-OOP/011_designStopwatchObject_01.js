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
  let startTime = 0;
  let endTime = 0;
  let running = false;

  this.start = function() {
    if (running) throw new Error('Stopwatch is already running');
    if (startTime !== 0) throw new Error('Reset the stopwatch before starting again.');
    startTime = Date.now();
    running = true;
    console.log('Stopwatch is running.');
  };

  this.stop = function() {
    if (!running) throw new Error("Stopwatch isn't running");
    if (endTime !== 0) throw new Error('Stopwatch is already stopped.');
    endTime = Date.now();
    running = false;
    const seconds = (endTime - startTime) / 1000;
    duration += seconds;
    console.log('Stopwatch has stopped.');
  };

  this.reset = function() {
    duration = 0;
    startTime = 0;
    endTime = 0;
    running = false;
    console.log('Stopwatch has been reset.');
  };

  Object.defineProperty(this, 'duration', {
    get: function() {
      return `${duration} seconds`;
    }
  });
}

const sw = new Stopwatch();
