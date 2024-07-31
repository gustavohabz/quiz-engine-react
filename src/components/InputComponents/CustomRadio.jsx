import React from 'react'

export const CustomRadio = ({
  inputOptions, changeRadio, disabled, answer, showCorrectAnswer}) => {

      const correctAnswer = (answer === parseInt(inputOptions.value))
      let classCorrect = ''
      if(showCorrectAnswer && correctAnswer) classCorrect = 'correct-answer '
  return (
    <label htmlFor={inputOptions.id} className={"input-checkbox block "+classCorrect}>
        <input 
            name={inputOptions.name}
            id={inputOptions.id} 
            type="radio" 
            value={inputOptions.value}
            onChange={(e) => changeRadio(e)}
            disabled={disabled}
        />
        {inputOptions.label}
    </label>
  )
}
