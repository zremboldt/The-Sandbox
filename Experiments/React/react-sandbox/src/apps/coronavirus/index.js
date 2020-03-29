import React from 'react';
// import Stats from './stats';
// import GlobalStats from './stats-global';
import LineChart from './line-chart';
import { mockData } from './mock-data';
// import CountrySelector from './country-selector';



export default function CoronaApp() {
  return (
    <div className="sectionCoronavirus">
      {/* <GlobalStats /> */}

      {/* <h3>Number of {'deaths'} over time</h3> */}
      <div className='card card__deathsOverTime'>
        <LineChart
          data={mockData}
        />
      </div>
      {/* <h1>Coronavirus data</h1>
      <h2>Global stats</h2>
      <Stats url={`https://covid19.mathdro.id/api/`} />
      <h2>Country stats</h2>
      <CountrySelector /> */}
    </div>
  )
}