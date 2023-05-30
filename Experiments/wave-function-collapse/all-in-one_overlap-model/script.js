// Desired output image size
const WIDTH = 96;
const HEIGHT = 96;

const img_url_to_data = function(imgPath, callback) {
  const img = document.createElement("img");
  img.src = imgPath;
  img.onload = function() {
    console.log(this.width, this.height);
    const canvas = document.createElement("canvas");
    canvas.width = this.width;
    canvas.height = this.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(this, 0, 0);
    callback(ctx.getImageData(0, 0, this.width, this.height))
  }
}

const start = function(id) {
  output = document.getElementById("output");
  output.width = WIDTH;
  output.height = HEIGHT;
  ctx = output.getContext("2d");
  imgData = ctx.createImageData(WIDTH, HEIGHT);
  
  // input: Input data.
  // width: Input width.
  // height: Input height.
  // N: Represents the width & height of the patterns that the overlap model breaks the input into. As it solves, it attempts to match up these subpatterns with each other. A higher N will capture bigger features of the input, but is computationally more intensive, and may require a larger input sample to achieve reliable solutions.
  // outputWidth: Output width.
  // outputHeight: Output height.
  // periodicInput: Represents whether the input pattern is tiling. If true, when WFC digests the input into N pattern chunks it will create patterns connecting the right & bottom edges to the left & top. If you use this setting, you'll need to make sure your input "makes sense" accross these edges.
  // periodicOutput: Determines if the output solutions are tilable. It's usefull for creating things like tileable textures, but also has a surprising influence on the output. When working with WFC, it's often a good idea to toggle Periodic Output on and off, checking if either setting influences the results in a favorable way.
  // symmetry: Represents which additional symmetries of the input pattern are digested. 0 is just the original input, 1-8 adds mirrored and rotated variations. These variations can help flesh out the patterns in your input, but aren't necessary. They also only work with unidirectional tiles, and are undesirable when your final game tiles have direction dependent graphics or functionality.
  // ground: When not 0, this assigns a pattern for the bottom row of the output. It's mainly useful for "vertical" words, where you want a distinct ground and sky separation. The value corresponds to the overlap models internal pattern indexes, so some experimentation is needed to figure out a suitable value.
  model = new OverlappingModel(id.data, id.width, id.height, 4, WIDTH, HEIGHT, true, false, 4, 0);

  // seed: All internal random values are derived from this seed. Providing 0 results in a random number.
  // limit: How many iterations to run. Providing 0 will run until completion or a contradiction.
  const success = model.generate(Math.random, 0);

  model.graphics(imgData.data);
  ctx.putImageData(imgData, 0, 0);
  console.log('isSuccess:', success);
}

img_url_to_data('./wfc-5.png', start);
