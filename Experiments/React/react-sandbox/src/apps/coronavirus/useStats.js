import { useState, useEffect } from 'react';

export default function useStats(url) {
  const [stats, setStats] = useState();
  const [error, setError] = useState();

  async function fetchData() {
    setError()
    console.log('Fetching data');
    const data = await fetch(url)
      .then(res => res.json())
      .catch(err => setError(err));
    setStats(data)
  }

  useEffect(() => {
    fetchData()
  }, [url])

  console.log('Stats: ', stats)
  console.log('Error: ', error)
  return {
    error,
    stats
  };
}