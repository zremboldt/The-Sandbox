import React, { useState, useEffect } from 'react';

export default function useStats(url) {
  const [stats, setStats] = useState();

  async function fetchStats() {
    let res = await fetch(url)
    return await res.json()
  }

  useEffect(() => {
    console.log('Fetching data');
    fetchStats().then(json => setStats(json))
  }, [url])

  return stats;
}