import React from 'react'

export const CustomCheckbox = (
  {inputOptions, changeCheckbox, disabled, answer, showCorrectAnswer}) => {
    let classCorrect = ' '
    if(answer.length > 0){
      if(showCorrectAnswer && answer.includes(inputOptions.value)) classCorrect = 'correct-answer'
    }
  return (
    <label className={"input-checkbox block "+classCorrect}>
        <input 
            name={inputOptions.name}
            id={inputOptions.id} 
            type="checkbox" 
            value={inputOptions.value}
            onChange={(e) => changeCheckbox(e)}
            disabled={disabled}
        />
        <span className="input-label">{inputOptions.label}</span>
    </label>
  )
}
