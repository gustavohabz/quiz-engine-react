import React from 'react'

export const FinalCardContent = ({resetGame, correctAnswerCounter, wrongAnswerCounter}) => {
  return (
    <div className="row" style={{paddingTop: '1.5%'}}>
        <div className="col-12 text-center">
            <h1>Correct Answers: {correctAnswerCounter}</h1>
            <h1>Wrong Answers: {wrongAnswerCounter}</h1>
            <button 
                className="btn btn-teal rounded btn-lg"
                onClick={resetGame}    
            >
                Play Again
            </button>
        </div>
    </div>
  )
}
