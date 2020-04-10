import React, { useState } from 'react';
import App from './app';
import { useDeathsOverTime, useStats } from './hooks/use-stats';

const dates = [
  '2-9-2020',
  '2-24-2020',
  '3-9-2020',
  '3-24-2020',
  '4-9-2020',
];

export default function DataLayer() {
  const [error, countryList] = useStats(`https://covid19.mathdro.id/api/countries`);
  const allCountries = countryList?.countries;

  if (!allCountries) return null;
  return (
    <App
      allCountries={allCountries}
      dates={dates}
    />
  );
}