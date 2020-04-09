import React from 'react';
import styled from 'styled-components';
import Colors from './colors'

function App() {
  return (
    <AppWrap>
      <TopBar>
        <BarWrap>
          <H2>
            <span style={{ color: Colors.p10() }}>COVID-19: </span>
            <span>Reported deaths</span>
          </H2>
          <SearchBar placeholder="Select up to 5 countries..."></SearchBar>
        </BarWrap>
      </TopBar>
      <ChartWrap></ChartWrap>
    </AppWrap>
  );
}

export default App;

const wrapWidth = `${1000}px`;

const AppWrap = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${Colors.d10};
`;

const TopBar = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 40px 20px 30px;
  background-color: ${Colors.d30};
`;

const BarWrap = styled.div`
  width: 100%;
  max-width: ${wrapWidth};
`;

const SearchBar = styled.input`
  width: 100%;  
  height: 50px;
  margin: 20px 0;
  padding: 12px 14px 14px;
  background-color: ${Colors.d20};
  border: 1px solid ${Colors.d10};
  border-radius: 5px;
  color: ${Colors.t10};
  font-size: 15px;
  transition: 150ms ease-in-out;

  &:hover, &:focus {
    border-color: ${Colors.p10()};
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 7px ${Colors.p10(0.2)};
  }
  &::placeholder {
    color: ${Colors.t20};
    font-weight: 500;
  }
`;

const ChartWrap = styled.div`
  max-width: ${wrapWidth};
`;

const H2 = styled.h2`
  margin: 0;
  color: ${Colors.t10};
  font-size: 28px;
`;