import React from 'react';
import useStats from './useStats.js';

export default function Stats({ url }) {
  const stats = useStats(url)
  console.log(stats)

  if (!stats) return 'Loading...';
  return (
    <>
      <p>confirmed: {stats.confirmed.value}</p>
      <p>recovered: {stats.recovered.value}</p>
      <p>deaths: {stats.deaths.value}</p>
    </>
  )
}