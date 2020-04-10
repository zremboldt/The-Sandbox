import React from 'react';
import styled from 'styled-components';
import Colors from '../utils/colors'
import IconClose from '../assets/icon-close';

export default function Pill({ country }) {
  return (
    <CountryPill key={country}>
      <span>{country}</span>
      <IconClose />
    </CountryPill>
  );
}

const CountryPill = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 0 0 20px;
  appearance: none;
  background-color: ${Colors.d30};
  border: 2px solid ${Colors.d10};
  border-radius: 50px;
  color: ${Colors.t20};
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: 150ms ease-in-out;
  
  span {
    margin-bottom: 2px;
  }

  svg {
    width: 20px;
    height: 20px;
    margin: 0 10px;
    fill: ${Colors.t20};
    transition: 150ms ease-in-out;
  }

  &:hover, &:focus {
    color: ${Colors.t10};
    border-color: ${Colors.p10()};
    
    svg {
      fill: ${Colors.t10};
    }
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 15px 5px ${Colors.p10(0.25)};
  }
`;

// const CloseButton = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   height: 100%;
//   width: 40px;  

//   svg {
//     width: 20px;
//     height: 20px;
//     fill: ${Colors.t20};
//   }
// `;
