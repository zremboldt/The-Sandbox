
import { mockData } from './mock-data';
import React from 'react';
// import useStats from './use-stats';
import LineChart from './line-chart';
import useDeathsOverTime from './use-stats2';

export default function DeathsOverTime({ countries, dates }) {
  const data = useDeathsOverTime(countries, dates)

  if (!data) return <p>Loading...</p>
  console.log(data)
  // if (error) return <p>Error...</p>
  // if (!stats.confirmed) return <p>No data exists for this country...</p>
  return (
    <div className='frame frame__deathsOverTime'>
      <LineChart
        data={data}
      />
    </div>
  )
}





