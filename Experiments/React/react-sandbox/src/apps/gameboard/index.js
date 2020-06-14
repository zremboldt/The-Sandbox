import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Hero from "./hero";
import HeartContainers from "./heart-containers";
import Goon from "./goon";
import dungeonBlock from "../../assets/dungeon-block.png";
import dungeonHole from "../../assets/dungeon-hole.png";
import dungeonFloorTile from "../../assets/dungeon-floor-tile.png";

export default function Gameboard({ boardWidth = 10, gridCellSize = 70 }) {
  const [mapLayout, setMapLayout] = useState();
  const boardWidthInPx = gridCellSize * (boardWidth - 1);

  useEffect(() => {
    const boardHeight = boardWidth;
    let tileDistribution = [];

    for (let i = 0; i < boardHeight; i++) {
      for (let j = 0; j < boardWidth; j++) {
        const tile = {
          xPos: j * gridCellSize,
          yPos: i * gridCellSize,
        };
        if (Math.random() > 0.2) {
          tile.image = dungeonFloorTile;
          tile.isSolid = false;
        } else {
          tile.image = dungeonBlock;
          tile.isSolid = true;
        }

        tileDistribution.push(tile);
      }
    }

    tileDistribution[tileDistribution.length - 1].image = dungeonHole;

    setMapLayout(tileDistribution);
  }, [boardWidth, gridCellSize]);

  return (
    <Screen>
      <HeartContainers />
      <Board cellCountPerDirection={boardWidth} gridCellSize={gridCellSize}>
        {mapLayout &&
          mapLayout.map((tile, i) => {
            return <GridCell key={i} image={tile.image} />;
          })}
        <Hero
          gridCellSize={gridCellSize}
          boardWidthInPx={boardWidthInPx}
          mapLayout={mapLayout}
        />
        {[...Array(6)].map((_, i) => (
          <Goon
            gridCellSize={gridCellSize}
            boardWidthInPx={boardWidthInPx}
            mapLayout={mapLayout}
            key={i}
          />
        ))}
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
