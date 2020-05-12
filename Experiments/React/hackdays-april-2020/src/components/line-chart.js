import React from 'react';
import { ResponsiveLine } from '@nivo/line'
import Colors from '../utils/colors';
import Tooltip from './tooltip';

const LineChart = ({ data }) => {

  if (!data) return null;
  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 20, right: 34, bottom: 40, left: 50 }}
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
      colors={(d) => d.color}
      enablePoints={false}
      enableCrosshair={true}
      enableArea={true}
      areaBlendMode="overlay"
      areaOpacity={0.25}
      useMesh={true}
      enableSlices="x"
      sliceTooltip={({ slice }) => <Tooltip slice={slice} />}
      theme={{
        crosshair: {
          line: {
            stroke: Colors.b10,
            strokeDasharray: '8 4',
          },
        },
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
      }}
      legends={[]}
    />
  )
}

export default LineChart;