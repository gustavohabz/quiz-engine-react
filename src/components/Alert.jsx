import React from 'react'

export const Alert = ({isCorrectAnswer, messageClass}) => {
  return (
      <div className="alert-position">
          <div className={"text-center mt-1 alert "+messageClass}>
          { isCorrectAnswer ? 'Correct answer!' : 'Incorrect answer!'}
          </div>
      </div>
  )
}
