import { useState, useEffect } from 'react'
import './App.css'
import { Main } from './components/Main'
import { Questions } from './components/Questions'
import { ThemeSelection } from './components/ThemeSelection'
import QuestionThemesJSON from './questions/QuestionSetThemes.json'
import { loadImages } from './ImagePreload'
import { Alert } from './components/Alert'

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

  const answerElement = <Alert messageClass={messageClass} isCorrectAnswer={isCorrectAnswer}/>

  useEffect(() => {
    if(theme){
      const images = QuestionThemesJSON.themes[theme].filter((question) => {
        return question.questionImage || question.answerImage
      }).map(q => q.questionImage || q.answerImage)
      loadImages(images)
    }
  }, [theme])

  return (
    <main >
      {(isAnswered ? answerElement : '')}
      <div className="row">
        <div className="center-vertical-horizontal">
          <div className="card rounded card-spacing">
            {pageHeader}
            {pageContent}
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
