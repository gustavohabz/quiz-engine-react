import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export const ButtonAnswer = ({confirmAnswer, disabled}) => {
  return (
    <button 
        type="submit"
        className='btn btn-teal btn-lg rounded'
        onClick={confirmAnswer}
        disabled={disabled}
    >
        Answer &nbsp;
        <FontAwesomeIcon icon="check"/>
    </button>
  )
}
