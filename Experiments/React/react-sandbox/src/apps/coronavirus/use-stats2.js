// Data fetching based partially on this article:
// https://dev.to/silvestricodes/asynchronous-flows-with-react-hooks-1g0m

import React, { useState, useEffect } from 'react';

// The fn returned from useEffect will run when the component unmounts.
// This will set didCancel to true, and ensure that all state is only set if didCancel is false.
const useDataFetcher = (dates) => {
  const [isLoading, setIsLoading] = useState(false)
  const [stats, setStats] = useState([])

  useEffect(() => {
    let didCancel = false
    async function fetchData() {
      !didCancel && setIsLoading(true)

      try {
        const requests = dates.map(date => (
          fetch(`https://covid19.mathdro.id/api/daily/${date}`)
            .then(res => res.json())
            .catch(e => console.log(`There was an error while fetching data for this date: ${date}. Error message: ${e}`))
        ));
        const response = await Promise.all(requests);
        !didCancel && setStats(response)
      } catch (error) {
        console.log(error)
      } finally {
        !didCancel && setIsLoading(false)
      }
    }
    fetchData()
    return () => { didCancel = true }
  }, [])

  return { isLoading, stats };
}

// const march20 = useStats(`https://covid19.mathdro.id/api/daily/3-20-2020`)
// const march24 = useStats(`https://covid19.mathdro.id/api/daily/3-24-2020`)
// const march28 = useStats(`https://covid19.mathdro.id/api/daily/3-28-2020`)

// if (!march20 || !march24 || !march28) return <p>Loading...</p>
// console.log(march20)

// let usa = 0;
// let china = 0;
// let italy = 0;

// const march20Data = march20.forEach(({ countryRegion, deaths }) => {
//   if (countryRegion.includes('China')) china += parseInt(deaths)
//   if (countryRegion === 'US') usa += parseInt(deaths)
//   if (countryRegion === 'Italy') italy += parseInt(deaths)
// })

// console.log(china)
// console.log(usa)
// console.log(italy)


/*
function
   for each country passed in, generate an object like this

   {
    "id": country,
    "color": "hsl(10, 70%, 50%)",
    "data": [
      {
        "x": date,
        "y": deaths
      },
    ]
  }

  for each date
    generate an object containing properties "x" and "y". Store date in "x".
    push the object to the data array

    for each entry in a given date
      for each country in our array of objects
        if countryRegion matches "id": country 
          add deaths to "y": deaths tally

  
  return data
*/

export default function useDeathsOverTime(countries, dates) {
  const { isLoading, stats } = useDataFetcher(dates)
  console.log(stats)

  if (!stats[1]) return;

  let countryData = countries.map(country => {
    if (country === 'Mainland China') {
      country = 'China'
    }
    return ({
      "id": country,
      "color": "hsl(10, 70%, 50%)",
      "data": []
    })
  });

  countryData.forEach(obj => {
    dates.forEach((date, i) => {
      const record = {
        "x": date,
        "y": 0
      };

      stats[i].forEach(({ countryRegion, deaths }) => {
        if (countryRegion.includes(obj.id)) record.y += parseInt(deaths)
      })

      obj.data.push(record);
    })
  })

  return countryData;
}