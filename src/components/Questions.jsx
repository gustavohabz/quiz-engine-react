import React, { useEffect, useState } from 'react'
import { FinalCardContent } from './FinalCardContent'
import { ProgressBar } from './ProgressBar'
import { QuestionForm } from './QuestionForm'
import QuestionThemesJSON from './../questions/QuestionSetThemes.json'

export const Questions = ({isCorrectAnswer, setCorrectAnswer, isAnswered, setAnswered, setCurrentPage, theme}) => {
    const [questionNumber, setQuestionNumber] = useState(1)
    const [userAnswer, setUserAnswer] = useState('')
    const [questionList, setQuestionList] = useState([])
    const [radioAnswer, setRadioAnswer] = useState(-1)
    const [checkboxAnswer, setChecboxAnswer] = useState([])
    const [textFieldAnswer, setTextFieldAnswer] = useState('')
    const [correctAnswerCounter, setCorrectAnswerCounter] = useState(0)
    const [wrongAnswerCounter, setWrongAnswerCounter] = useState(0)

    const setUserAnswerAndCheck = (e) => {
        let elementValue = e.target.value
        switch(e.target.type){
            case 'radio':
                setRadioAnswer(parseInt(elementValue))
                break;
            case 'checkbox':
                if(e.target.checked){
                    setChecboxAnswer([...checkboxAnswer, elementValue])
                }else{
                    const checkboxAnswerArray = checkboxAnswer.filter((c) => c !== elementValue)
                    setChecboxAnswer(checkboxAnswerArray)
                }
                break;
            case 'text':
                setTextFieldAnswer(elementValue)
                break;
        }
    }

    const randomizeArray = (array) => {
        let currentIndex = array.length;
        while (currentIndex != 0) {

            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
        return array;
    }

    const randomizeQuestions = (questions) => {
        let randomizedQuestions = randomizeArray(questions)
        let finalRandomizedQuestions = randomizedQuestions
        randomizedQuestions.forEach((question, index) => {  
            if(question.options.length > 0){
                finalRandomizedQuestions[index].options = randomizeArray(question.options)
            }
        })
        return finalRandomizedQuestions;
    }

    const fetchQuestionSet = () => {
        setQuestionList(randomizeQuestions(QuestionThemesJSON.themes[theme]))
    }

    const validateCheckboxQuestion = (value, answer) => {
        if(value.length > 0){
            if(value.sort().join(',') === answer.sort().join(',')){
                userSelectedCorrectAnswer()
                return false
            }
        }
        userSelectedWrongAnswer()
    }

    const userSelectedCorrectAnswer = () => {
        setCorrectAnswer(true)
    }

    const userSelectedWrongAnswer = () => {
        setCorrectAnswer(false)
    }

    const validateTextAnswer = (value, answer) => {
        if(typeof value === 'string'){
            if(answer === value.toUpperCase()){
                userSelectedCorrectAnswer()
            }else{
                userSelectedWrongAnswer()
            }
        }
    }

    const checkUserAnswer = (value) => {
        if(questionList.length > 0){
            const type = questionList[questionNumber-1].type
            const answer = questionList[questionNumber-1].answer

            if(type === 'MULTI'){
                validateCheckboxQuestion(value, answer)
                return false;
            }

            if(type === 'TEXT'){
                validateTextAnswer(value, answer)
                return false;
            }

            if(answer === parseInt(value)){
                userSelectedCorrectAnswer()
            }else{
                userSelectedWrongAnswer()
            }
            
        }
    }

    const confirmAnswerSubmit = (e) => {
        e.preventDefault()
        confirmAnswer()
    }

    const confirmAnswer = () => {
        setAnswered(true)
        if(isCorrectAnswer){
            setCorrectAnswerCounter(correctAnswerCounter + 1)
        } else {
            setWrongAnswerCounter(wrongAnswerCounter + 1)
        }
    }

    const clearStates = () => {
        setCorrectAnswer(false)
        setUserAnswer('')
        setAnswered(false)
        setRadioAnswer(-1)
        setChecboxAnswer([])
        setTextFieldAnswer('')
    }

    const goToNextQuestion = () => {
        clearStates()
        setQuestionNumber(questionNumber+1)
    }

    const resetGame = () => {
        clearStates()
        setQuestionNumber(1)
        setCurrentPage('themeSelection')
    }

    useEffect(() => {
        fetchQuestionSet()
    }, [])

    useEffect(() => {
        if(checkboxAnswer.length > 0){
            checkUserAnswer(checkboxAnswer)
            setUserAnswer(checkboxAnswer)
        }
    }, [checkboxAnswer])

    useEffect(() => {
        if(radioAnswer > 0){
            checkUserAnswer(radioAnswer)
            setUserAnswer(radioAnswer)
        }
    }, [radioAnswer])

    useEffect(() => {
        checkUserAnswer(textFieldAnswer)
        setUserAnswer(textFieldAnswer)
    }, [textFieldAnswer])

    const hideCurrentQuestion = (index) => {
        return (index != questionNumber-1)
    }

  return (
    <>
    {(questionNumber <= questionList.length ?  (<>
        {questionList.map((question, index) => (
        <section key={question.id} hidden={hideCurrentQuestion(index)} className="question-section">
            <div className="card-title text-center">
                <h2>Question {questionNumber}: {question.question}</h2>
                {question.type === 'MULTI' && (
                    <small>More than one option can be selected.</small>
                )}
            </div>
            <div className="card-content">
                <QuestionForm 
                    confirmAnswerSubmit={confirmAnswerSubmit}
                    question={question}
                    index={index}
                    isAnswered={isAnswered}
                    isCorrectAnswer={isCorrectAnswer}
                    userAnswer={userAnswer}
                    setUserAnswerAndCheck={setUserAnswerAndCheck}
                    confirmAnswer={confirmAnswer}
                    goToNextQuestion={goToNextQuestion}
                />
            </div>
        </section>
        ))}
    </>) : (
        <>
            <FinalCardContent 
                correctAnswerCounter={correctAnswerCounter}
                wrongAnswerCounter={wrongAnswerCounter}
                resetGame={resetGame}
            />
        </>
    ))}
    <ProgressBar 
        questionNumber={questionNumber}
        questionListLength={questionList.length}
    />
    </>
  )
}
