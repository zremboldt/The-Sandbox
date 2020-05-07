import React from 'react';
import styled from 'styled-components';
import Colors from '../utils/colors'
import { pluralize } from '../utils/pluralize'

export default function Tooltip({ slice }) {
  const hoveredDate = slice.points[0].data.x;
  // console.log(slice)

  return (
    <TooltipContainer>
      <Date>{hoveredDate}</Date>
      {slice.points.map(point => {

        return (
          <Country
            textColor={point.serieColor}
            key={point.id}
          >
            <strong>{point.serieId}:</strong> {point.data.yFormatted} {pluralize('death', point.data.yFormatted)}
          </Country>
        )
      })}
    </TooltipContainer>
  );
}

const TooltipContainer = styled.div`
  background-color: black;
  padding: 14px 18px;
  border-radius: 6px;
  color: white;
`;

const Date = styled.h5`
  margin: 0 0 10px;
  color: ${Colors.t20};
`;

const Country = styled.p`
  margin: 0;
  padding: 3px 0;
  color: ${props => props.textColor};
`;
