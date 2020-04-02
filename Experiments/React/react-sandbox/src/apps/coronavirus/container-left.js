import React from 'react';

export default function ContainerLeft({ countryList }) {
  if (!countryList) return <p>Loading...</p>
  return (
    <>
      <input type="select" list="countryList" placeholder="Select a country" />
      <datalist id="countryList">
        {Object.entries(countryList.countries).map(([i, country]) => (
          <option key={i} value={country.name} />
        ))}
      </datalist>

      <input type="date" name="" id="" />
    </>
  )
}