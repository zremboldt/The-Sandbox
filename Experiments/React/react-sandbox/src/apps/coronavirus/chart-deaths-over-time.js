import React from 'react';
import LineChart from './line-chart';

export default function DeathsOverTime({ data }) {

  if (!data) return <p>Loading...</p>
  return (
    <div className='frame frame__deathsOverTime'>
      <LineChart data={data} />
    </div>
  )
}





