import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheck, faArrowRight } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faCheck, faArrowRight)

export const Main = ({setCurrentPage}) => {
  return (
    <>
        <div className="card-title text-center">
            <h1>Mega Quiz</h1>
        </div>
        <div className="card-content text-center">
            <button 
                className='btn btn-teal btn-lg rounded'
                onClick={() => setCurrentPage('questions')}
            >
                Start
            </button>
        </div>
    </>
  )
}
