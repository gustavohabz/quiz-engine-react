import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheck, faArrowRight, faCirclePlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

library.add(fab, faCheck, faArrowRight)

export const Main = ({setCurrentPage}) => {
  return (
    <>
        <div className="card-title text-center">
            <h1 className='main-title'>Mega Quiz</h1>
        </div>
        <div className="card-content text-center">
            <button 
                className='btn btn-teal btn-lg rounded'
                onClick={() => setCurrentPage('themeSelection')}
            >
                Start &nbsp;
                <FontAwesomeIcon icon={faCirclePlay} />
            </button>
        </div>
    </>
  )
}
