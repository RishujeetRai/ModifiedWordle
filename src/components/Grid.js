import React from 'react'
import Row from './Row'

export default function Grid({currentGuess,guesses,turn,solution}){
  return(
    <div>
        {Array.from({ length: (solution.length+1 > 6 ? 6 : solution.length+1) }, (_, index)=>{
            if(turn===index){
                return <Row key={index} currentGuess={currentGuess} solution={solution}/>
            }
            return <Row key={index} guess={guesses[index]}  solution={solution}/>
        })}
    </div>
  )
}
