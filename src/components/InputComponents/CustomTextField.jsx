import React from 'react'
export const CustomTextField = ({
  inputOptions, 
  disabled, 
  answer, 
  showCorrectAnswer, 
  userAnswer, 
  changeTextField
}) => {
  return (
    <>
      <div style={{width: '98%'}}>
        <input 
            className='custom-input rounded'
            type="text" 
            name={inputOptions.name}
            id={inputOptions.id}
            disabled={disabled}
            value={userAnswer}
            onChange={changeTextField}
            placeholder="My Answer"
          />
          <p className="answer-text">{showCorrectAnswer && 'The answer is: '+answer}</p>
      </div>
    </>
  )
}
