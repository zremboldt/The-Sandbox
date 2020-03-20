import React, { useState } from 'react';
import useStats from './useStats.js';
import Stats from './stats.js';

export default function CountrySelector() {
  const [selectedCountry, setSelectedCountry] = useState('usa');
  const { error, stats } = useStats(`https://covid19.mathdro.id/api/countries`)

  if (!stats) return <p>Loading...</p>
  if (error) return <p>Error...</p>
  return (
    <>
      <select onChange={(e) => setSelectedCountry(e.target.value)}>
        {Object.entries(stats.countries).map(([country, code], i) => (
          <option key={i} value={stats.iso3[code]}>{country}</option>
        ))}
      </select>
      <Stats url={`https://covid19.mathdro.id/api/countries/${selectedCountry}`} />
    </>
  )
}