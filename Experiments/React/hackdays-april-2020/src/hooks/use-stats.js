// Data fetching based partially on this article:
// https://dev.to/silvestricodes/asynchronous-flows-with-react-hooks-1g0m
import { chartScheme } from '../utils/colors'
import { useState, useEffect, useCallback } from 'react';

// The fn returned from useEffect will run when the component unmounts.
// This will set didCancel to true, and ensure that all state is only set if didCancel is false.
export const useDateStats = (dates) => {
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
  }, [dates])

  return { isLoading, stats };
}


export function useStats(url) {
  const [stats, setStats] = useState();

  const fetchData = useCallback(async () => {
    console.log('Fetching data');
    const data = await fetch(url)
      .then(res => res.json())
      .catch(err => console.log('Error coming from `useStats.js`: ', err));
    setStats(data);
  }, [url])

  useEffect(() => {
    fetchData();
  }, [url, fetchData])

  return stats;
}

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

export function useDeathsOverTime(countries, dates) {
  const { stats } = useDateStats(dates)

  if (!stats[1]) return;

  let countryData = countries.map((country, i) => {
    if (country === 'South Korea') {
      country = 'Korea, South'
    }
    if (country === 'Mainland China') {
      country = 'China'
    }

    return ({
      "id": country,
      "color": chartScheme[i],
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
