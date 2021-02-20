import React from 'react';

export default function SetupModal({cardCount, setCardCount, layoutMap}) {
  return (
    <div className='setup-modal-container'>
      <div className='setup-modal'>
        <select
          value={cardCount} 
          onChange={(e) => setCardCount(e.target.value)} 
        >
          <option hidden>How many cards?</option>
          {Object.keys(layoutMap).map((num, i) => <option value={num} key={i}>{num}</option>)}
        </select>
      </div>
    </div>
  )
}