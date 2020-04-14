import React from 'react';
import { ResponsiveLine } from '@nivo/line'
import Colors, { chartScheme } from '../utils/colors';
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.


const LineChart = ({ data }) => {

  if (!data) return null;
  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 30, right: 40, bottom: 60, left: 50 }}
      xScale={{ type: 'point' }}
      yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
      curve="basis"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: 'bottom',
        tickSize: 5,
        tickPadding: 8,
        tickRotation: 0,
        legend: null,
      }}
      axisLeft={{
        orient: 'left',
        tickSize: 0,
        tickPadding: 10,
        tickRotation: 0,
        legend: null,
      }}
      enableGridX={false}
      colors={chartScheme}
      enablePoints={false}
      enableCrosshair={false}
      enableArea={true}
      areaBlendMode="overlay"
      areaOpacity={0.25}
      useMesh={true}
      theme={{
        axis: {
          legend: {
            text: {
              fill: Colors.t10,
              fontWeight: 'bold',
            }
          },
          ticks: {
            text: {
              fill: Colors.t20,
            },
          },
        },
        grid: {
          line: {
            strokeDasharray: '8, 4',
            stroke: Colors.b10,
          }
        },
        tooltip: {
          container: { background: "black", fontSize: "14px", color: 'white', paddingBottom: 6 },
        }
      }}
      legends={[]}
    />
  )
}

export default LineChart;