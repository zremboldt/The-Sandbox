// Desired output image size
// const WIDTH = 96;
// const HEIGHT = 96;

// const img_url_to_data = function(imgPath, callback) {
//   const img = document.createElement("img");
//   img.src = imgPath;
//   img.onload = function() {
//     console.log(this.width, this.height);
//     const canvas = document.createElement("canvas");
//     canvas.width = this.width;
//     canvas.height = this.height;
//     const ctx = canvas.getContext("2d");
//     ctx.drawImage(this, 0, 0);
//     callback(ctx.getImageData(0, 0, this.width, this.height))
//   }
// }

// const start = function(id) {
//   output = document.getElementById("output");
//   output.width = WIDTH;
//   output.height = HEIGHT;
//   ctx = output.getContext("2d");
//   imgData = ctx.createImageData(WIDTH, HEIGHT);
  
//   model = new OverlappingModel(id.data, id.width, id.height, 4, WIDTH, HEIGHT, true, false, 4, 0);

//   const success = model.generate(Math.random, 0);

//   model.graphics(imgData.data);
//   ctx.putImageData(imgData, 0, 0);
//   console.log('isSuccess:', success);
// }

// img_url_to_data('./wfc-5.png', start);




const jimp = new Jimp()
console.log('myjimp', jimp)





// var data = ... // object with tiles, subsets and constraints definitions

// var model = new SimpleTiledModel(data, null, 48, 48, false);


// const Jimp = require('jimp');
// const lcg = require('./lcg');

// const definition = require('./data/castle.definition.js');

// function loadTileBitmapData (basePath, tile, number) {
//   const unique = number !== null;
//   const tilePath = basePath + tile.name + (unique ? ' ' + number : '') + '.png';

//   return Jimp.read(tilePath).then(function (result) {
//     if (unique) {
//       tile.bitmap[number] = new Uint8Array(result.bitmap.data); //add the bitmap data in each tile variant
//     } else {
//       tile.bitmap = new Uint8Array(result.bitmap.data); //add the bitmap data in each tile
//     }

//     return true;
//   });
// }

// function addBitmapDataToStructure (structure, callback) {
//   const promises = [];
//   const path = structure.path;
//   const unique = !!structure.unique;

//   structure.tiles.map(function (tile) {
//     if (unique) {
//       if (tile.symmetry === 'X') {
//         tile.bitmap = new Array(1);
//         promises.push(loadTileBitmapData(path, tile, 0));
//       } else {
//         tile.bitmap = new Array(4);
//         promises.push(loadTileBitmapData(path, tile, 0));
//         promises.push(loadTileBitmapData(path, tile, 1));
//         promises.push(loadTileBitmapData(path, tile, 2));
//         promises.push(loadTileBitmapData(path, tile, 3));
//       }
//     } else {
//       promises.push(loadTileBitmapData(path, tile, null));
//     }
//   });

//   Promise.all(promises).then(function () {
//     callback(null, structure);
//   }, function (error) {
//     callback(error, null);
//   });
// }

// addBitmapDataToStructure(definition, function (err, definition) {
//   if (err) {
//     throw err;
//   }

//   const destWidth = 20;
//   const destHeight = 20;

//   //try catch to prevent the eventual errors from being silenced by the promise...

//   try {
//     const model = new SimpleTiledModel(definition, null, destWidth, destHeight, false);
//     const finished = model.generate(lcg('test'));

//     if (finished) {
//       console.log('Success');
//       const result = model.graphics();

//       const image = new Jimp(destWidth * definition.tilesize, destHeight * definition.tilesize, function (err, image) {
//         image.bitmap.data = Buffer.from(result.buffer);
//         image.write('./output/simple-tiled-model.png');
//       });
//     } else {
//       console.log('The generation ended in a contradiction');
//     }
//   } catch(e) {
//     console.log('An error occurred');
//     console.log(e.stack);
//   }
// });