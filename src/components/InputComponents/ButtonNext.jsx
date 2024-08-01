import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export const ButtonNext = ({goToNextQuestion}) => {
  return (
    <button 
        className='btn btn-teal btn-lg rounded'
        onClick={goToNextQuestion}
    >
        Next &nbsp;
        <FontAwesomeIcon icon="arrow-right"/>
    </button>
  )
}
