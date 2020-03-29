import React from 'react';
// import useStats from './use-stats';

export default function GlobalStats({ url }) {
  // const { error, stats } = useStats(url)

  // if (!stats) return <p>Loading...</p>
  // if (error) return <p>Error...</p>
  // if (!stats.confirmed) return <p>No data exists for this country...</p>
  return (
    <div className={'card card__global-stats'}>
      <h3>Global impact</h3>
      <p>Confirmed cases: 531708</p>
      <p>Recovered cases: 122203</p>
      <p>Deaths: 24053</p>
    </div>
  )
}