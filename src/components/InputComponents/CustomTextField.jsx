import React from 'react'
export const CustomTextField = ({inputOptions, disabled, answer, showCorrectAnswer, userAnswer, changeTextField}) => {
  return (
    <div className="row">
      <div className="col-12">
        <input 
          className='custom-input rounded' 
          xs={{marginRight: '12px'}}
          type="text" 
          name={inputOptions.name}
          id={inputOptions.id}
          disabled={disabled}
          value={userAnswer}
          onChange={changeTextField}
        />
        <p style={{position: 'absolute'}}>{showCorrectAnswer && 'The answer is: '+answer}</p>
      </div>
    </div>
  )
}
