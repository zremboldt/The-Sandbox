import { useState, useEffect, useCallback } from 'react';
import { api, countries } from './mock-data'

export default function useStats(url) {
  const [stats, setStats] = useState();
  const [error, setError] = useState();
  const useMockData = false;

  const fetchData = useCallback(async () => {
    setError();
    console.log('Fetching data');
    const data = await fetch(url)
      .then(res => res.json())
      .catch(err => setError(err));
    setStats(data);
  }, [url])

  useEffect(() => {
    if (useMockData) {
      setStats(api)
    } else {
      fetchData();
    }
  }, [url, fetchData, useMockData])

  console.log('Stats: ', stats);
  console.log('Error: ', error);
  return {
    error,
    stats
  };
}