import React from 'react';
import { ResponsiveLine } from '@nivo/line'
import Colors from '../utils/colors';
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.


const LineChart = ({ data }) => {

  if (!data) return <p>Loading...</p>
  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 12, right: 90, bottom: 52, left: 60 }}
      xScale={{ type: 'point' }}
      yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
      curve="basis"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: 'bottom',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendOffset: 45,
        legendPosition: 'middle'
      }}
      axisLeft={{
        orient: 'left',
        tickSize: 0,
        tickPadding: 10,
        tickRotation: 0,
        legend: '',
        legendOffset: -53,
        legendPosition: 'middle'
      }}
      enableGridX={false}
      colors={{ scheme: 'nivo' }}
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