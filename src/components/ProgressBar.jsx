import React from 'react'

export const ProgressBar = ({questionNumber, questionListLength}) => {
  return (
    <div className="row mt-2">
        <div className="col-12 col-xs-12">
            <div className="progress">
                <div className={"progress-bar "+(questionNumber*questionListLength -1 < 100 ? "progress-blue" : "progress-teal")} style={{width: questionNumber*questionListLength - 1+'%'}}></div>
            </div>
        </div>
    </div>
  )
}
