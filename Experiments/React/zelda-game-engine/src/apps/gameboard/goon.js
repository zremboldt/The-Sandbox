import React, { useState } from "react";
import styled from "styled-components";
import goonSpriteLeft from "../../assets/goon-sprite-left.png";
import goonSpriteRight from "../../assets/goon-sprite-right.png";
import goonSpriteDown from "../../assets/goon-sprite-down.png";
import goonSpriteUp from "../../assets/goon-sprite-up.png";
import useInterval from "../../hooks/useInterval";
import getNextTile from "../../hooks/getNextTile";

export default function Goon({ boardWidthInPx, gridCellSize, mapLayout }) {
  const [yPos, setYPos] = useState(boardWidthInPx);
  const [xPos, setXPos] = useState(boardWidthInPx);
  const [isFacing, setIsFacing] = useState("down");

  const commonProperties = {
    mapLayout,
    xPos,
    yPos,
    gridCellSize,
  };

  function moveGoon() {
    const randomNum = Math.random();

    if (randomNum <= 0.25 && yPos > 0) {
      setIsFacing("up");
      const nextTile = getNextTile("up", { ...commonProperties });
      if (!nextTile.isSolid) {
        setYPos(yPos - gridCellSize);
      }
    } else if (randomNum > 0.25 && randomNum <= 0.5 && xPos < boardWidthInPx) {
      setIsFacing("right");
      const nextTile = getNextTile("right", { ...commonProperties });
      if (!nextTile.isSolid) {
        setXPos(xPos + gridCellSize);
      }
    } else if (randomNum > 0.5 && randomNum <= 0.75 && yPos < boardWidthInPx) {
      setIsFacing("down");
      const nextTile = getNextTile("down", { ...commonProperties });
      if (!nextTile.isSolid) {
        setYPos(yPos + gridCellSize);
      }
    } else {
      setIsFacing("left");
      if (xPos > 0) {
        const nextTile = getNextTile("left", { ...commonProperties });
        if (!nextTile.isSolid) {
          setXPos(xPos - gridCellSize);
        }
      }
    }
  }

  useInterval(() => moveGoon(), 700);

  return (
    <GoonComponent gridCellSize={gridCellSize} xPos={xPos} yPos={yPos}>
      {isFacing === "down" && <GoonImg src={goonSpriteDown} />}
      {isFacing === "up" && <GoonImg src={goonSpriteUp} />}
      {isFacing === "right" && <GoonImg src={goonSpriteRight} />}
      {isFacing === "left" && <GoonImg src={goonSpriteLeft} />}
    </GoonComponent>
  );
}

const GoonComponent = styled.div`
  position: absolute;
  width: ${(props) => props.gridCellSize}px;
  height: ${(props) => props.gridCellSize}px;
  transition: transform 300ms;
  transform: translate3d(
    ${(props) => props.xPos}px,
    ${(props) => props.yPos}px,
    0
  );
`;

const GoonImg = styled.img`
  width: 100%;
  height: 100%;
`;
