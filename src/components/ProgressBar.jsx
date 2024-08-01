import React from 'react'

export const ProgressBar = ({questionNumber, questionListLength}) => {
  return (
    <div className="progress">
        <div className={"progress-bar "+(questionNumber*questionListLength -1 < 100 ? "progress-blue" : "progress-teal")} style={{width: questionNumber*(100/questionListLength) - 1+'%'}}></div>
    </div>
  )
}
