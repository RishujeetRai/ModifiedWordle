import { useState, useEffect } from "react";

const useScore = () => {
  const [totalGuesses, setTotalGuesses] = useState(0);
  const [rightGuesses, setRightGuesses] = useState(0);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [currentQuestionId, setCurrentQuestionId] = useState(null);
  const [currentGuessing, setCurrentGuessing] = useState(false);

  useEffect(() => {
    const handleLocalStorage = () => {
      let savedTotalGuesses = localStorage.getItem("totalGuesses");
      let savedRightGuesses = localStorage.getItem("rightGuesses");
      let savedWrongGuesses = localStorage.getItem("wrongGuesses");
    };

    handleLocalStorage();
  }, []);

  useEffect(() => {
    localStorage.setItem("totalGuesses", totalGuesses.toString());
    localStorage.setItem("rightGuesses", rightGuesses.toString());
    localStorage.setItem("wrongGuesses", wrongGuesses.toString());
  }, [totalGuesses, rightGuesses, wrongGuesses]);

  const incrementTotalGuesses = () => {
    setTotalGuesses((prevTotalGuesses) => prevTotalGuesses + 1);
  };

  const incrementRightGuesses = () => {
    if (currentQuestionId !== null && currentGuessing) {
      setRightGuesses((prev) => prev + 1);
    }
  };

  const incrementWrongGuesses = () => {
    if (
      currentQuestionId !== null &&
      (currentGuessing || totalGuesses === 0)
    ) {
      setWrongGuesses((prev) => prev + 1);
    }
  };

  const setCurrentQuestion = (questionId) => {
    setCurrentQuestionId(questionId);
    setCurrentGuessing(true);
  };

  const resetScores = () => {
    setTotalGuesses(0);
    setRightGuesses(0);
    setWrongGuesses(0);
  };

  return {
    totalGuesses,
    rightGuesses,
    wrongGuesses,
    incrementTotalGuesses,
    incrementRightGuesses,
    incrementWrongGuesses,
    setCurrentQuestion,
    resetScores,
  };
};

export default useScore;
