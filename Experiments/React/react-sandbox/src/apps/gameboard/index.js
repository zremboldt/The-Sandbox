import React, { useState, useEffect } from "react";
import styled from "styled-components";
import dungeonBlock from "../../assets/dungeon-block.png";
import dungeonFloorTile from "../../assets/dungeon-floor-tile.png";
import linkSpriteLeft from "../../assets/link-sprite-left.png";
import linkSpriteRight from "../../assets/link-sprite-right.png";
import linkSpriteDown from "../../assets/link-sprite-down.png";
import linkSpriteUp from "../../assets/link-sprite-up.png";
import startScreen from "../../assets/start-screen.png";
import useKeyPress from "../../hooks/useKeyPress";

const squared = (num) => num * num;

export default function Gameboard({ boardWidth = 10, gridCellSize = 70 }) {
  const [yPos, setYPos] = useState(0);
  const [xPos, setXPos] = useState(0);
  const [mapLayout, setMapLayout] = useState();
  const [isFacing, setIsFacing] = useState("down");
  const totalCellCount = squared(boardWidth);
  const boardWidthInPx = gridCellSize * (boardWidth - 1);

  const pressArrowRight = useKeyPress("ArrowRight");
  const pressArrowLeft = useKeyPress("ArrowLeft");
  const pressArrowUp = useKeyPress("ArrowUp");
  const pressArrowDown = useKeyPress("ArrowDown");

  useEffect(() => {
    const tileDistribution = [...Array(totalCellCount)].map(() => {
      const randomNum = Math.random();
      if (randomNum > 0.1) {
        return dungeonFloorTile;
      } else {
        return dungeonBlock;
      }
    });

    setMapLayout(tileDistribution);
  }, []);

  useEffect(() => {
    if (pressArrowRight && xPos < boardWidthInPx) {
      setXPos(xPos + gridCellSize);
      setIsFacing("right");
    }
    if (pressArrowLeft && xPos > 0) {
      setXPos(xPos - gridCellSize);
      setIsFacing("left");
    }
    if (pressArrowUp && yPos > 0) {
      setYPos(yPos - gridCellSize);
      setIsFacing("up");
    }
    if (pressArrowDown && yPos < boardWidthInPx) {
      setYPos(yPos + gridCellSize);
      setIsFacing("down");
    }
  }, [pressArrowRight, pressArrowLeft, pressArrowUp, pressArrowDown]);

  return (
    <Screen startScreen={startScreen}>
      <Board cellCountPerDirection={boardWidth} gridCellSize={gridCellSize}>
        {mapLayout &&
          mapLayout.map((image, i) => <GridCell key={i} image={image} />)}
        <Hero gridCellSize={gridCellSize} xPos={xPos} yPos={yPos}>
          {isFacing === "down" && <HeroImg src={linkSpriteDown} />}
          {isFacing === "up" && <HeroImg src={linkSpriteUp} />}
          {isFacing === "right" && <HeroImg src={linkSpriteRight} />}
          {isFacing === "left" && <HeroImg src={linkSpriteLeft} />}
        </Hero>
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
  /* background-image: url(${(props) => props.startScreen});
  background-position: center;
  background-size: cover; */
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

const Hero = styled.div`
  position: absolute;
  width: ${(props) => props.gridCellSize}px;
  height: ${(props) => props.gridCellSize}px;
  transition: transform 300ms ease-out;
  transform: translate3d(
    ${(props) => props.xPos}px,
    ${(props) => props.yPos}px,
    0
  );
`;

const HeroImg = styled.img`
  width: 100%;
  height: 100%;
`;
