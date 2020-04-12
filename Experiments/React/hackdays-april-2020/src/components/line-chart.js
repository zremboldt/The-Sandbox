import React from 'react';
import { ResponsiveLine } from '@nivo/line'
import Colors from '../utils/colors';
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
      margin={{ top: 10, right: 130, bottom: 40, left: 142 }}
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
      colors={[Colors.p10(), Colors.p30, Colors.p40, Colors.p50, Colors.p20]}
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
      legends={[
        {
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: 'left-to-right',
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          itemTextColor: Colors.t20,
          symbolSize: 12,
          symbolShape: 'circle',
          symbolBorderColor: 'rgba(0, 0, 0, .5)',
          effects: [
            {
              on: 'hover',
              style: {
                itemBackground: 'rgba(0, 0, 0, .03)',
                itemOpacity: 1
              }
            }
          ]
        }
      ]}
    />
  )
}

export default LineChart;