import React, { useState } from "react";
import styled from "styled-components";
import heartEmptySprite from "../../assets/heart-empty.png";
import heartFullSprite from "../../assets/heart-full.png";

export default function HeartContainers({ totalHeartContainers = 3 }) {
  const [fullHeartCount, setFullHeartCount] = useState(3);

  return (
    <HeartContainersComponent>
      {[...Array(totalHeartContainers)].map((_, i) => {
        const isFull = fullHeartCount - 1 < i ? false : true;

        if (isFull) {
          return <HeartFull src={heartFullSprite} key={i} />;
        } else {
          return <HeartEmpty src={heartEmptySprite} key={i} />;
        }
      })}
    </HeartContainersComponent>
  );
}

const HeartContainersComponent = styled.div`
  position: absolute;
  top: 28px;
  left: 26px;
  display: flex;
`;

const HeartFull = styled.img`
  margin: 0 1px;
  width: 32px;
  height: 32px;
`;

const HeartEmpty = styled.img`
  margin: 0 1px;
  width: 32px;
  height: 32px;
`;
