import React, { useState, useEffect } from "react";
import Wordle from "./components/Wordle";
import ScoreModal from "./components/scoreModal"; // Import the ScoreModal component
import useScore from "./hooks/useScore";  // Import the useScore hook at the top of App.js

function App() {
  const [questionSets, setQuestionSets] = useState(null);
  const [selectedSet, setSelectedSet] = useState(
    localStorage.getItem("selectedSet") || "chemistry" // Use localStorage to retain the selectedSet value
  );
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  
  const [showScoreModal, setShowScoreModal] = useState(false);
  
  const {
    totalGuesses,
    rightGuesses,
    wrongGuesses,
    incrementTotalGuesses,
    incrementRightGuesses,
    incrementWrongGuesses,
    setCurrentQuestion,
    resetScores, // Add the resetScores function
  } = useScore();

  const toggleScoreModal = () => {
    setShowScoreModal((prevShowScoreModal) => !prevShowScoreModal);
  };
  
  const resetScore = () => {
    resetScores(); // Call the resetScores function to reset scores
  };

  const handleRefresh = () => {
    window.location.reload(); // This will refresh the page
  };

  useEffect(() => {
    fetch("http://localhost:3001/questions")
      .then((res) => res.json())
      .then((json) => {
        setQuestionSets(json);
        const randomIndex = Math.floor(
          Math.random() * json[selectedSet].length
        );
        setSelectedQuestion(json[selectedSet][randomIndex]);
        console.log(json[selectedSet][randomIndex].word);     // solution on console
      });
  }, [selectedSet]);

  const handleSetChange = (event) => {
    const newSelectedSet = event.target.value;
    setSelectedSet(newSelectedSet);
    localStorage.setItem("selectedSet", newSelectedSet);
  };

  return (
    <div className="App">
      <div className="navbar">

        <div className="navbar-left">
          <select value={selectedSet} onChange={handleSetChange}>
            {questionSets &&
              Object.keys(questionSets).map((set) => (
                <option key={set} value={set}>
                  {set}
                </option>
              ))}
          </select>
        </div>

        <div className="navbar-center">
          <h1>Wordle App Clone</h1>
        </div>

      <div className="navbar-right">
          {/* <button onClick={toggleScoreModal}>View Scores</button> */}
      </div>

      </div>

      <div className="navbar-button">
        {/* <button onClick={selectRandomQuestion}>Next Question</button> */}
        <button onClick={handleRefresh}>Next Question</button>
      </div>

      {selectedQuestion && (
        <div>
          <div className="ques">
            Question:<span>&nbsp;{selectedQuestion.question}</span>
          </div>
          <Wordle solution={selectedQuestion.word} />
        </div>
      )}

      {/* Render the ScoreModal component when showScoreModal is true */}
      {showScoreModal && (
        <ScoreModal
          totalGuesses={totalGuesses}
          rightGuesses={rightGuesses}
          wrongGuesses={wrongGuesses}
          onReset={resetScore} // Pass the resetScore function
          onClose={toggleScoreModal}
        />
      )}
    </div>
  );
}

export default App;
