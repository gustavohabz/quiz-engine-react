import { useState } from 'react'
import './App.css'
import { Main } from './components/Main'
import { Questions } from './components/Questions'
import { ThemeSelection } from './components/ThemeSelection'

function App() {
  const [currentPage, setCurrentPage] = useState('main')
  const [isCorrectAnswer, setCorrectAnswer] = useState(false)
  const [isAnswered, setAnswered] = useState(false)
  const [theme, setTheme] = useState('')

  let pageContent = ''
  let pageHeader = ''
  switch(currentPage){
    case 'main':
      pageContent = <Main setCurrentPage={setCurrentPage}/>
      break;
    case 'themeSelection':
      pageContent = <ThemeSelection setCurrentPage={setCurrentPage} setTheme={setTheme}/>
      break;
    case 'questions':
      pageContent = <Questions 
                      isCorrectAnswer={isCorrectAnswer} 
                      setCorrectAnswer={setCorrectAnswer}
                      isAnswered={isAnswered}
                      setAnswered={setAnswered}
                      setCurrentPage={setCurrentPage}
                      theme={theme}/>
      break;
  }

  const messageClass = (isCorrectAnswer ? 'alert-success' : 'alert-error')

  const answerElement = <div className={"text-center mt-2 alert "+messageClass}>
                            { isCorrectAnswer ? 'Correct answer!' : 'Incorrect answer!'}
                        </div>

  return (
    <main >
      <div className="row">
        <div className="center-vertical-horizontal">
          <div className="card rounded card-spacing">
            {pageHeader}
            {pageContent}
          </div>
          <div className="row">
            {(isAnswered ? answerElement : '')}
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
