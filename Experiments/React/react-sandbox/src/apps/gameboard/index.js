import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Hero from "./hero";
import dungeonBlock from "../../assets/dungeon-block.png";
import dungeonFloorTile from "../../assets/dungeon-floor-tile.png";

const squared = (num) => num * num;

export default function Gameboard({ boardWidth = 10, gridCellSize = 70 }) {
  const [mapLayout, setMapLayout] = useState();
  const totalCellCount = squared(boardWidth);
  const boardWidthInPx = gridCellSize * (boardWidth - 1);

  useEffect(() => {
    const tileDistribution = [...Array(totalCellCount)].map(() => {
      const tile = {
        xPos: 0,
        yPos: 0,
      };

      if (Math.random() > 0.1) {
        tile.image = dungeonFloorTile;
      } else {
        tile.image = dungeonBlock;
      }

      return tile;
    });

    setMapLayout(tileDistribution);
  }, [totalCellCount]);

  return (
    <Screen>
      <Board cellCountPerDirection={boardWidth} gridCellSize={gridCellSize}>
        {mapLayout &&
          mapLayout.map((tile, i) => {
            console.log(tile);
            return <GridCell key={i} image={tile.image} />;
          })}
        <Hero gridCellSize={gridCellSize} boardWidthInPx={boardWidthInPx} />
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
`;

const GridCell = styled.div`
  background-image: url(${(props) => props.image});
  background-position: center;
  background-size: cover;
`;
