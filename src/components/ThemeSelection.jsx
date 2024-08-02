import { faBook, faCat, faComputer, faGlobe } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

export const ThemeSelection = ({setCurrentPage, setTheme}) => {
    const [clickedThemeClass, setClickedThemeClass] = useState({
        GEOGRAPHY: '', HISTORY: '', TECHNOLOGY: '', ANIMALS: ''
    })
    const [clickedButton, setClickedButton] = useState(false)
    const goToQuestions = (theme) => {
        setClickedButton(true)
        setClickedThemeClass({...clickedThemeClass, [theme]: 'theme-selection-btn-animation-'+theme.toLowerCase()})
        setTimeout(() => {
            setClickedButton(false)
            setTheme(theme)
            setCurrentPage('questions')
            setClickedThemeClass('')
        }, 500);
    }
  return (
    <>
        <div className="card-title text-center">
            <h1 className='main-title'>Pick a Theme</h1>
        </div>
        <div className="card-content theme-section">
            <div className="buttons-themes">
                <span className="button-effect">
                    <button 
                            className={'btn-themes btn-geography '+clickedThemeClass.GEOGRAPHY}
                            onClick={() => goToQuestions('GEOGRAPHY')}
                            disabled={clickedButton}
                        >
                        GEOGRAPHY &nbsp;
                        <FontAwesomeIcon icon={faGlobe} />
                    </button>
                </span>
                <button 
                    className={'btn-themes btn-history '+clickedThemeClass.HISTORY}
                    onClick={() => goToQuestions('HISTORY')}
                    disabled={clickedButton}
                >
                    HISTORY &nbsp;
                    <FontAwesomeIcon icon={faBook} />
                </button>
                <button 
                    className={'btn-themes btn-technology '+clickedThemeClass.TECHNOLOGY}
                    onClick={() => goToQuestions('TECHNOLOGY')}
                    disabled={clickedButton}
                >
                    TECHNOLOGY &nbsp;
                    <FontAwesomeIcon icon={faComputer} />
                </button>
                <button 
                    className={'btn-themes btn-animals '+clickedThemeClass.ANIMALS}
                    onClick={() => goToQuestions('ANIMALS')}
                    disabled={clickedButton}
                >
                    ANIMALS &nbsp;
                    <FontAwesomeIcon icon={faCat} />
                </button>
            </div>
        </div>
    </>
  )
}
