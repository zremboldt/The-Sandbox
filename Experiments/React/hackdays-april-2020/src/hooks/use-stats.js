// Data fetching based partially on this article:
// https://dev.to/silvestricodes/asynchronous-flows-with-react-hooks-1g0m
import { chartScheme } from '../utils/colors'
import { useState, useEffect, useCallback } from 'react';

// The fn returned from useEffect will run when the component unmounts.
// This will set didCancel to true, and ensure that all state is only set if didCancel is false.
export const useDateStats = (dates) => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const requests = dates.map(date => (
          fetch(`https://covid19.mathdro.id/api/daily/${date}`)
            .then(res => res.json())
            .catch(e => console.log(`There was an error while fetching data for this date: ${date}. Error message: ${e}`))
        ));
        const response = await Promise.all(requests);
        setStats(response);
      } catch (error) {
        throw new Error(error);
      }
    }
    fetchData();
  }, [dates])

  return stats;
}

export function useDeathsOverTime(countries, dates) {
  const stats = useDateStats(dates)

  if (!stats[1]) return;

  let countryData = countries.map((country, i) => {

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

export function useStats(url) {
  const [stats, setStats] = useState();

  const fetchData = useCallback(async () => {
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