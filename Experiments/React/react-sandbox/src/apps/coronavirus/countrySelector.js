import React, { useState } from 'react';
import useStats from './useStats.js';
import Stats from './stats.js';

export default function CountrySelector() {
  const [selectedCountry, setSelectedCountry] = useState('usa');

  const data = useStats(`https://covid19.mathdro.id/api/countries`)
  console.log(data)

  if (!data) return 'Loading...';
  return (
    <>
      <select onChange={(e) => setSelectedCountry(e.target.value)}>
        {Object.entries(data.countries).map(([country, code], i) => (
          <option key={i} value={data.iso3[code]}>{country}</option>
        ))}
      </select>
      <Stats url={`https://covid19.mathdro.id/api/countries/${selectedCountry}`} />
    </>
  )
}