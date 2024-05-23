// ScoreModal.js
import React from 'react';

export default function ScoreModal({ totalGuesses, rightGuesses, wrongGuesses, onClose, onReset }) {
  return (
    <div className="modal">
      <div>
        <h1>Score Summary</h1>
        <p>Total Guesses: {totalGuesses}</p>
        <p>Correct Guesses: {rightGuesses}</p>
        <p>Wrong Guesses: {wrongGuesses}</p>
        <button onClick={onReset}>Reset</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
