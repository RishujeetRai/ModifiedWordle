import React from 'react';

export default function Modal({ isCorrect, turn, solution }) {
  const handleRefresh = () => {
    window.location.reload(); // This will refresh the page
  };

  return (
    <div className='modal'>
      {isCorrect && (
        <div>
          <h1>You Win</h1>
          <p className='solution'>{solution}</p>
          <p>You found the solution in {turn} guesses.</p>
          <button onClick={handleRefresh}>Play Again</button>
        </div>
      )}
      {!isCorrect && (
        <div>
          <h1>Nevermind</h1>
          <p className='solution'>{solution}</p>
          <p>Better luck next time.</p>
          <button onClick={handleRefresh}>Try Again</button>
        </div>
      )}
    </div>
  );
}
