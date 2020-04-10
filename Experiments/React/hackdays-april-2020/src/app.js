import React, { useState } from 'react';
import styled from 'styled-components';
import Colors from './utils/colors'
import { useDeathsOverTime } from './hooks/use-stats';
import LineChart from './components/line-chart';
import Pill from './components/pill';
import SearchBar from './components/searchbar';

// 
// TODO: Need to work on dropdown accessibility
// 

export default function App({ allCountries, dates }) {
  const [selectedCountries, setSelectedCountries] = useState(['Thailand']);
  const deathsOverTime = useDeathsOverTime(selectedCountries, dates);
  const [filteredCountries, setFilteredCountries] = useState(allCountries);

  function handleSearch(searchQuery) {
    const filteredList = allCountries.filter(country => {
      const countryToLowerCase = country.name.toLowerCase();
      return countryToLowerCase.includes(searchQuery.toLowerCase())
    });

    if (!searchQuery) {
      setFilteredCountries(allCountries)
    } else {
      setFilteredCountries(filteredList)
    }
  }

  function addCountry(selectedCountry) {
    if (!selectedCountries.includes(selectedCountry)) {
      setSelectedCountries([...selectedCountries, selectedCountry]);
    }
  }

  return (
    <AppWrap>
      <TopBar>
        <BarWrap>
          <H2>
            <span style={{ color: Colors.p10() }}>COVID-19: </span>
            <span>Reported deaths</span>
          </H2>
          <SearchBar
            filteredCountries={filteredCountries}
            handleSearch={handleSearch}
            addCountry={addCountry}
          />
        </BarWrap>
        <PillsContainer>
          {selectedCountries.map(country => <Pill country={country} />)}
        </PillsContainer>
      </TopBar>
      <ChartWrap>
        <LineChart data={deathsOverTime} />
      </ChartWrap>
    </AppWrap>
  );
}

const wrapWidth = 1000;

const AppWrap = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${Colors.d10};
`;

const TopBar = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 40px 20px 30px;
  background-color: ${Colors.d30};
`;

const BarWrap = styled.div`
  width: 100%;
  max-width: ${wrapWidth}px;
`;

const PillsContainer = styled.div`
  position: absolute;
  bottom: -15px;
  display: flex;
  justify-content: flex-start;
  width: 100%;
  max-width: ${wrapWidth}px;
  height: 30px;

  & > button + button {
    margin-left: 10px;
  }
`;

const ChartWrap = styled.div`
  margin: 80px auto 0;
  padding: 0 20px;
  width: 100%;
  max-width: ${wrapWidth + 134}px;
  transform: translateX(35px);
  height: 600px;
`;

const H2 = styled.h2`
  margin: 0;
  color: ${Colors.t10};
  font-size: 28px;
`;