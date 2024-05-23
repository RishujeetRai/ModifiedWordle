import React from 'react';

export default function Row({ guess, currentGuess, solution }) {

  if (guess) {
    return (
      <div className='row past'>
        {guess.map((letter, index) => (
          <div key={index} className={letter.color}>
            {letter.key}
          </div>
        ))}
      </div>
    );
  }

  if (currentGuess) {
    return (
      <div className='row current'>
        {Array.from({ length: solution.length }).map((_, index) => (
          <div key={index} className='filled'>
            {currentGuess[index] || ''}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className='row'>
      {Array.from({ length: solution.length }).map((_, index) => (
        <div key={index}></div>
      ))}
    </div>
  );
}
