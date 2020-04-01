import React from 'react';
// import Stats from './stats';
// import GlobalStats from './stats-global';
import DeathsOverTime from './chart-deaths-over-time.js';

// import CountrySelector from './country-selector';



export default function CoronaApp() {

  return (
    <div className="sectionCoronavirus">
      {/* <GlobalStats /> */}

      {/* <h3>Number of {'deaths'} over time</h3> */}
      <DeathsOverTime
        countries={['Italy', 'US', 'Mainland China', 'Spain', 'Germany']}
        dates={[
          '1-1-2020',
          '2-1-2020',
          '3-1-2020',
          '3-31-2020',
          // '3-2-2020',
          // '3-6-2020',
          // '3-10-2020',
          // '3-14-2020',
          // '3-18-2020',
          // '3-22-2020',
          // '3-26-2020',
          // '3-30-2020'
        ]}
      />

      {/* <h1>Coronavirus data</h1>
      <h2>Global stats</h2>
      <Stats url={`https://covid19.mathdro.id/api/`} />
      <h2>Country stats</h2>
      <CountrySelector /> */}
    </div>
  )
}