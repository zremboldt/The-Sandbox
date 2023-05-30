import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Jimp from 'jimp';
import lcg from './lcg';
import { definition } from './tile-definition';
import { SimpleTiledModel } from './simple-tiled-model';

export default function Gameboard({ boardWidth = 10, gridCellSize = 100 }) {
  const WIDTH = 96;
  const HEIGHT = 96;

  useEffect(() => {
    function loadTileBitmapData (basePath, tile, number) {
      const unique = number !== null;
      const tilePath = basePath + tile.name + (unique ? ' ' + number : '') + '.png';

      return Jimp.read(tilePath).then(function (result) {
        if (unique) {
          tile.bitmap[number] = new Uint8Array(result.bitmap.data); //add the bitmap data in each tile variant
        } else {
          tile.bitmap = new Uint8Array(result.bitmap.data); //add the bitmap data in each tile
        }

        return true;
      });
    }

    function addBitmapDataToStructure (structure, callback) {
      const promises = [];
      const path = structure.path;
      const unique = !!structure.unique;

      structure.tiles.map(function (tile) {
        if (unique) {
          if (tile.symmetry === 'X') {
            tile.bitmap = new Array(1);
            promises.push(loadTileBitmapData(path, tile, 0));
          } else {
            tile.bitmap = new Array(4);
            promises.push(loadTileBitmapData(path, tile, 0));
            promises.push(loadTileBitmapData(path, tile, 1));
            promises.push(loadTileBitmapData(path, tile, 2));
            promises.push(loadTileBitmapData(path, tile, 3));
          }
        } else {
          promises.push(loadTileBitmapData(path, tile, null));
        }
      });

      Promise.all(promises).then(function () {
        callback(null, structure);
      }, function (error) {
        callback(error, null);
      });
    }

    addBitmapDataToStructure(definition, function (err, definition) {
      if (err) {
        throw err;
      }

      const destWidth = 20;
      const destHeight = 20;

      //try catch to prevent the eventual errors from being silenced by the promise...

      try {
        const model = new SimpleTiledModel(definition, null, destWidth, destHeight, false);
        const finished = model.generate(lcg('test'));

        if (finished) {
          console.log('Success');
          const result = model.graphics();

          const image = new Jimp(destWidth * definition.tilesize, destHeight * definition.tilesize, function (err, image) {
            image.bitmap.data = Buffer.from(result.buffer);
            image.write('./output/simple-tiled-model.png');
          });
        } else {
          console.log('The generation ended in a contradiction');
        }
      } catch(e) {
        console.log('An error occurred');
        console.log(e.stack);
      }
    });
  }, [])

  return (
    <Screen>
      <Canvas 
        width={WIDTH} 
        height={HEIGHT} 
        id="output"
      ></Canvas>
    </Screen>
  );
}

const Screen = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  /* background-color: hsla(55, 85%, 90%); */
  overflow: hidden;
`;

const Canvas = styled.canvas`
  border: 2px solid black;
  border-radius: 6px;
`;
