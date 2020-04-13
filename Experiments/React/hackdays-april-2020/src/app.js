import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Colors, { chartScheme } from './utils/colors'
import { useDeathsOverTime } from './hooks/use-stats';
import LineChart from './components/line-chart';
import Pill from './components/pill';
import SearchBar from './components/searchbar';

export default function App({ allCountries, dates }) {
  const [selectedCountries, setSelectedCountries] = useState(['Canada', 'Mexico']);
  const deathsOverTime = useDeathsOverTime(selectedCountries, dates);
  const [filteredCountries, setFilteredCountries] = useState(allCountries);
  const [isSearching, setIsSearching] = useState(false);
  const searchInput = useRef(null);

  function handleSearch(searchQuery) {
    const filteredList = allCountries.filter(country => {
      const countryToLowerCase = country.name.toLowerCase();
      return countryToLowerCase.includes(searchQuery.toLowerCase())
    });

    if (!searchQuery) {
      setIsSearching(false);
      setFilteredCountries(allCountries)
    } else {
      setIsSearching(true);
      setFilteredCountries(filteredList)
    }
  }

  function addCountry(selectedCountry) {
    if (!selectedCountries.includes(selectedCountry) && selectedCountries.length < 5) {
      setSelectedCountries([...selectedCountries, selectedCountry]);
      searchInput.current.value = '';
      searchInput.current.focus();
    }
  }

  function removeCountry(selectedCountry) {
    const newCountriesArray = selectedCountries.filter(country => country !== selectedCountry);
    setSelectedCountries(newCountriesArray);
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
            selectedCountries={selectedCountries}
            filteredCountries={filteredCountries}
            isSearching={isSearching}
            setIsSearching={setIsSearching}
            handleSearch={handleSearch}
            addCountry={addCountry}
            ref={searchInput}
          />
        </BarWrap>
        <PillsContainer>
          {selectedCountries.map((country, i) => (
            <Pill
              color={chartScheme[i]}
              country={country}
              removeCountry={removeCountry}
              key={i}
            />
          ))}
          <OverflowSpacer />
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
  max-width: ${wrapWidth + 40}px;
  height: 30px;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  & > button {
    margin-left: 10px;
  }

  & > button:first-of-type {
    margin-left: 20px;
  }
`;

const OverflowSpacer = styled.div`
  width: 20px;
  height: 100%;
  flex-shrink: 0;
`;

const ChartWrap = styled.div`
  margin: 80px auto 0;
  padding: 0 20px;
  width: 100%;
  max-width: ${wrapWidth + 80}px;
  height: 600px;
`;

const H2 = styled.h2`
  margin: 0;
  color: ${Colors.t10};
  font-size: 28px;
`;