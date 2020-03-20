import React from 'react';
import Stats from './stats';
import CountrySelector from './countrySelector';

export default function CoronaApp() {
  return (
    <div className="sectionCoronavirus">
      <h1>Coronavirus data</h1>
      <h2>Global stats</h2>
      <Stats url={`https://covid19.mathdro.id/api/`} />
      <h2>Country stats</h2>
      <CountrySelector />
    </div>
  )
}