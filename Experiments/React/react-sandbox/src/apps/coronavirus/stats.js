import React from 'react';
import useStats from './useStats.js';

export default function Stats({ url }) {
  const { error, stats } = useStats(url)

  if (!stats) return <p>Loading...</p>
  if (error) return <p>Error...</p>
  if (!stats.confirmed) return <p>No data exists for this country...</p>
  return (
    <>
      <p>confirmed: {stats.confirmed.value}</p>
      <p>recovered: {stats.recovered.value}</p>
      <p>deaths: {stats.deaths.value}</p>
    </>
  )
}