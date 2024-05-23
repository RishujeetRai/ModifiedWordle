import { useState, useEffect } from "react"
import useScore from "./useScore"

const useWordle = (solution)=>{
    const{incrementTotalGuesses} = useScore();
    const [turn,setTurn] = useState(0)
    const [currentGuess,setCurrentGuess] = useState(null)
    const [guesses, setGuesses] = useState([...Array(solution.length)])  // array of length 6 | empty spaces spread
    const [history, setHistory] = useState([])  // each guess is a string | history is array of those guesses
    const [isCorrect,setIsCorrect] = useState(false)
    const [usedKeys,setUsedKeys] = useState({}) // {a:'green', b:'yellow', c:'grey'}

    useEffect(() => {
        // Ensure the solution is valid and has a length
        if (solution && solution.length) {
          setCurrentGuess(''.repeat(solution.length));
        }
    }, [solution]);

    // format a guess into an array of letter objects
    // eg [{key:'a'},color:'yellow']
    const formatGuess = ()=>{
        // console.log('formatting the guess:',currentGuess)
        let solutionArray = [...solution]   // spread solutions over an array
        let formattedGuess = [...currentGuess].map((letter)=>{
            return {key:letter,color:'grey'}
        })
        // find any green letters
        formattedGuess.forEach((letter,index) => {
            if(solutionArray[index]===letter.key){
                formattedGuess[index].color = 'green'
                solutionArray[index] = null
            }
        });
        // find any yellow letters
        formattedGuess.forEach((letter,index) => {
            if(solutionArray.includes(letter.key) && letter.color !== 'green'){
                formattedGuess[index].color = 'yellow'
                solutionArray[solutionArray.indexOf(letter.key)] = null
            }
        });
        return formattedGuess
    }

    // add a new guess to the guesses state
    // update the isCorrect state if the guess is correct
    // add one to the turn state
    const addNewGuess = (formattedGuess)=>{
        if(currentGuess===solution){
            setIsCorrect(true)
            incrementTotalGuesses()
        }
        setGuesses((prevGuesses)=>{
            let newGuesses = [...prevGuesses]
            newGuesses[turn] = formattedGuess
            return newGuesses
        })
        setHistory((prevHistory)=>{
            return [...prevHistory,currentGuess]
        })
        setTurn((prevTurn)=>{
            return prevTurn+1
        })
        setUsedKeys((prevUsedKeys)=>{
            let newKeys = {...prevUsedKeys}
            formattedGuess.forEach((letter)=>{
                const currentColor = newKeys[letter.key]
                if(letter.color==='green'){
                    newKeys[letter.key] = 'green'
                    return
                }
                if(letter.color==='yellow' && currentColor!=='green'){
                    newKeys[letter.key] = 'yellow'
                    return
                }
                if(letter.color==='grey' && currentColor!=='yellow' && currentColor!=='green'){
                    newKeys[letter.key] = 'grey'
                    return
                }
            })
            return newKeys
        })
        setCurrentGuess('')
    }

    // handle keyup event and track current guess
    // if user presses enter, add the new guess
    const handleKeyup = ({key})=>{
        // console.log(key)
        if(key==='Enter'){
            // only add guess if turn is less than solution.length
            if(turn>solution.length){
                console.log('you used all your guesses')
                return
            }
            // do not allow duplicate words
            if(history.includes(currentGuess)){
                console.log('already tried that word')
                return
            }
            // check word is solution.length chars long
            if(currentGuess.length!==solution.length){
                console.log(`words must be ${solution.length} characters long`)
                return
            }
            const formatted = formatGuess(currentGuess)
            // console.log(formatted)
            addNewGuess(formatted)

        }
        if(key==='Backspace'){
            setCurrentGuess((prev)=>{
                return prev.slice(0,-1)
            })
            return
        }
        if(/^[A-Za-z0-9]$/.test(key)){
            if(currentGuess.length<solution.length){
                setCurrentGuess((prev)=>{
                    return prev+key
                })
            }
        }
    }

    return { turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyup, history };

}

export default useWordle