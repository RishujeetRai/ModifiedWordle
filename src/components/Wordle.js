import React, { useEffect, useState } from 'react'
import useWordle from '../hooks/useWordle'
import Grid from './Grid'
import Keypad from './Keypad'
import Modal from './Modal'
import useScore from '../hooks/useScore'; // Import the score tracking hook

export default function Wordle({solution}) {
    const { currentGuess, handleKeyup, guesses, isCorrect, turn, usedKeys, history } = useWordle(solution);
    const [showModal, setShowModal] = useState(false);
    const { totalGuesses, rightGuesses, wrongGuesses, incrementTotalGuesses, incrementRightGuesses, incrementWrongGuesses } = useScore(); // Initialize score tracking hook

    const numChances = (solution.length+1 > 6 ? 6 : solution.length+1);

    useEffect(()=>{
        window.addEventListener('keyup',handleKeyup);

        // if(isCorrect){
        //     setTimeout(()=>{
        //         setShowModal(true);
        //     },2000);
        //     window.removeEventListener('keyup',handleKeyup);
        // }

        if(isCorrect || (turn >= numChances)){
            setTimeout(()=>{
                setShowModal(true);
            },2000);
            window.removeEventListener('keyup',handleKeyup);
        }

        return ()=> window.removeEventListener('keyup',handleKeyup);
    },[handleKeyup,isCorrect,turn,solution.length,numChances]);

    useEffect(() => {
        if (currentGuess && currentGuess.length === solution.length) {
          // Add to total guesses only when the user starts making guesses
          incrementTotalGuesses();
        }
      }, [currentGuess, solution.length, incrementTotalGuesses]);

    // useEffect(()=>{
    //     console.log(guesses,turn,isCorrect)
    // },[guesses,turn,isCorrect])

    return (
        <div>
        {/* <div>Current Guess - {currentGuess}</div> */}
        {/* <div>Solution - {solution}</div> */}
        <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} solution={solution} numChances={numChances}/>
        <Keypad usedKeys={usedKeys}/>
        {showModal && <Modal isCorrect={isCorrect} turn={turn} solution={solution}/>}
        {showModal && (
        <Modal
          isCorrect={isCorrect}
          turn={turn}
          solution={solution}
          totalGuesses={totalGuesses}
          rightGuesses={rightGuesses}
          wrongGuesses={wrongGuesses}
        />
        )}
        </div>
    );
}
