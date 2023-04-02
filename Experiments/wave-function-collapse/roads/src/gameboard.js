import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { tileDefinition } from './tile-definition';

export default function Gameboard({ boardWidth = 10, gridCellSize = 100 }) {
  const [mapLayout, setMapLayout] = useState();
  const boardWidthInPx = gridCellSize * (boardWidth - 1);

  useEffect(() => {
    const boardHeight = boardWidth;
    let tileDistribution = [];

    for (let i = 0; i < boardHeight; i++) {
      for (let j = 0; j < boardWidth; j++) {
        const xPos = j * gridCellSize;
        const yPos = i * gridCellSize;

        let tile = { xPos, yPos };

        // if (xPos === 600 && yPos === 200) {
        //   tile = {
        //     ...tile,
        //     ...tileDefinition.grass
        //   }
        // }

        if (Math.random() > 0.2) {
          tile = {
            ...tile,
            ...tileDefinition.grass
          }
        } else {
          tile = {
            ...tile,
            ...tileDefinition.roadCrossingRound
          }
        }

        tileDistribution.push(tile);
      }
    }

    // const lowestEntropy = tileDistribution.reduce()
    

    setMapLayout(tileDistribution);
  }, [boardWidth, gridCellSize]);

  return (
    <Screen>
      <Board cellCountPerDirection={boardWidth} gridCellSize={gridCellSize}>
        {mapLayout &&
          mapLayout.map((tile, i) => {
            return (
            <GridCell key={i} image={tile.img}>
              {console.log(tile)}
              x:{tile.xPos}
              <br/>
              y:{tile.yPos}
            </GridCell>
            )
          })}
      </Board>
    </Screen>
  );
}

const Screen = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: hsla(55, 85%, 0%);
  overflow: hidden;
`;

const Board = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(
    ${(props) => props.cellCountPerDirection},
    ${(props) => props.gridCellSize}px
  );
  grid-template-rows: repeat(
    ${(props) => props.cellCountPerDirection},
    ${(props) => props.gridCellSize}px
  );
  border-radius: 6px;
  overflow: auto;
`;

const GridCell = styled.div`
  background-image: url(${(props) => props.image});
  background-color: hsla(260,100%,50%,0.4);
  background-position: center;
  background-size: cover;
  font-size: 14px;
  outline: 1px solid hsla(0,0%,0%,0.1);
  padding: 3px 5px;
  color: hsla(0,0%,0%,0.6);
`;
