import React from 'react';
import App from './app';
import { useStats } from './hooks/use-stats';
import getPastDate from './utils/get-past-date'

const dates = [
  getPastDate(60),
  getPastDate(45),
  getPastDate(30),
  getPastDate(15),
  getPastDate(1),
];

export default function DataLayer() {
  const countryList = useStats(`https://covid19.mathdro.id/api/countries`);
  const allCountries = countryList?.countries;

  if (!allCountries) return null;
  return (
    <App
      allCountries={allCountries}
      dates={dates}
    />
  );
}