import React from 'react';
// import Stats from './stats';
// import GlobalStats from './stats-global';
import DeathsOverTime from './chart-deaths-over-time.js';
import { useDeathsOverTime, useStats } from './use-stats';
import ContainerLeft from './container-left';
// import CountrySelector from './country-selector';

const countries = ['Italy', 'US', 'Mainland China', 'Spain', 'Germany'];
const dates = [
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
];

export default function CoronaApp() {
  const deathsOverTime = useDeathsOverTime(countries, dates);
  const [error, countryList] = useStats(`https://covid19.mathdro.id/api/countries`)

  return (
    <section className="sectionCoronavirus">
      {/* <h3>Number of {'deaths'} over time</h3> */}
      <div className="containerLeft">
        <ContainerLeft countryList={countryList} />
      </div>

      <div className="containerRight">
        <DeathsOverTime data={deathsOverTime} />
      </div>
    </section>
  )
}