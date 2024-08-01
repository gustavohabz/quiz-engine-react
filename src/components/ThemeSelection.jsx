import { faBook, faCat, faComputer, faGlobe } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export const ThemeSelection = ({setCurrentPage, setTheme}) => {
    const goToQuestions = (theme) => {
        setTheme(theme)
        setCurrentPage('questions')
    }
  return (
    <>
        <div className="card-title text-center">
            <h1 className='main-title'>Pick a Theme</h1>
        </div>
        <div className="card-content">
            <div className="buttons-themes text-center">
                <button 
                        className='btn btn-geography'
                        onClick={() => goToQuestions('GEOGRAPHY')}
                    >
                    GEOGRAPHY &nbsp;
                    <FontAwesomeIcon icon={faGlobe} />
                </button>
                <button 
                    className='btn btn-history'
                    onClick={() => goToQuestions('HISTORY')}
                >
                    HISTORY &nbsp;
                    <FontAwesomeIcon icon={faBook} />
                </button>
            </div>
            <div className="buttons-themes text-center">
                <button 
                    className='btn btn-technology'
                    onClick={() => goToQuestions('TECHNOLOGY')}
                >
                    TECHNOLOGY &nbsp;
                    <FontAwesomeIcon icon={faComputer} />
                </button>
                <button 
                    className='btn btn-animals'
                    onClick={() => goToQuestions('ANIMALS')}
                >
                    ANIMALS &nbsp;
                    <FontAwesomeIcon icon={faCat} />
                </button>
            </div>
        </div>
    </>
  )
}
