import { useState, useEffect, useCallback } from 'react';

export default function useStats(url) {
  const [stats, setStats] = useState();
  const [error, setError] = useState();

  const fetchData = useCallback(async () => {
    setError();
    console.log('Fetching data');
    const data = await fetch(url)
      .then(res => res.json())
      .catch(err => setError(err));
    setStats(data);
  }, [url])

  useEffect(() => {
    fetchData();
  }, [url, fetchData])

  console.log('Stats: ', stats);
  console.log('Error: ', error);
  return {
    error,
    stats
  };
}