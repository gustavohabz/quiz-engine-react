import React, { useEffect, useState } from 'react'
import { CustomRadio } from './InputComponents/CustomRadio'
import QuestionJSON from './../questions/QuestionSet.json'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CustomCheckbox } from './InputComponents/CustomCheckbox'
import { CustomTextField } from './InputComponents/CustomTextField'

export const Questions = ({isCorrectAnswer, setCorrectAnswer, isAnswered, setAnswered, setCurrentPage}) => {
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
                    setChecboxAnswer(
                        [
                            ...checkboxAnswer, elementValue
                        ]
                    )
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
        setQuestionList(randomizeQuestions(QuestionJSON.questionSet))
    }

    const validateCheckboxQuestion = (value, answer) => {
        if(value.sort().join(',') === answer.sort().join(',')){
            userSelectedCorrectAnswer()
            return false
        }
        userSelectedWrongAnswer()
    }

    const userSelectedCorrectAnswer = () => {
        setCorrectAnswer(true)
    }

    const userSelectedWrongAnswer = () => {
        setCorrectAnswer(false)
    }

    const checkUserAnswer = (value) => {
        if(questionList.length > 0){
            const type = questionList[questionNumber-1].type
            const answer = questionList[questionNumber-1].answer

            if(type === 'MULTI'){
                if(value.length > 0){
                    validateCheckboxQuestion(value, answer)
                }
                return false;
            }

            if(type === 'TEXT'){
                if(typeof value === 'string'){
                    if(answer === value.toUpperCase()){
                        userSelectedCorrectAnswer()
                    }else{
                        userSelectedWrongAnswer()
                    }
                }
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
        setCurrentPage('main')
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
        if(textFieldAnswer.length > 0){
            checkUserAnswer(textFieldAnswer)
            setUserAnswer(textFieldAnswer)
        }
    }, [textFieldAnswer])

  return (
    <>
    {(questionNumber <= questionList.length ?  (<>
        {questionList.map((question, index) => (
        <section key={question.id} hidden={index != questionNumber-1} className="question-section">
            <div className="card-title text-center">
                <h2>Question {questionNumber}: {question.question}</h2>
            </div>
            <div className="card-content">
                <form onSubmit={(e) => confirmAnswerSubmit(e)}>
                    <div className="row">
                        <div className={question.type !== 'TEXT' ? 'col-6 col-xs-12' : 'col-12 col-xs-12'}>
                            <h3>
                                {question.type === "ONE" && (
                                    <>
                                        {question.options.map((option, indexOption) => (
                                            <CustomRadio
                                                key={option.id}
                                                inputOptions={{name: 'radio-question'+index, id: 'radio-question'+indexOption+index, value: option.value, label: option.label}}
                                                changeRadio={(e) => setUserAnswerAndCheck(e, question.answer)}
                                                disabled={isAnswered}
                                                answer={question.answer}
                                                showCorrectAnswer={isAnswered && !isCorrectAnswer}
                                                userAnswer={userAnswer}
                                            />
                                        ))}
                                    </>
                                    )
                                }
                                {question.type === "MULTI" && (
                                    <>
                                        {question.options.map((option, indexOption) => (
                                            <CustomCheckbox 
                                                key={option.id}
                                                inputOptions={{name: 'checkbox-question'+index, id: 'checkbox-question'+indexOption+index, value: option.value, label: option.label}}
                                                changeCheckbox={(e) => setUserAnswerAndCheck(e, question.answer)}
                                                disabled={isAnswered}
                                                answer={question.answer}
                                                showCorrectAnswer={isAnswered && !isCorrectAnswer}
                                                userAnswer={userAnswer}
                                            />
                                        ))}
                                    </>
                                    )
                                }
                                {question.type === "TEXT" && (
                                    <>
                                        <CustomTextField 
                                            inputOptions={{name: 'textfield-question'+index, id: 'textfield-question'+index}}
                                            disabled={isAnswered}
                                            answer={question.answer}
                                            showCorrectAnswer={isAnswered && !isCorrectAnswer}
                                            userAnswer={userAnswer}
                                            changeTextField={(e) => setUserAnswerAndCheck(e, question.answer)}
                                        />
                                    </>
                                    )
                                }
                            </h3>
                        </div>
                    </div>
                    <div className="row">
                        {!isAnswered && (
                            <div className="col-12 col-xs-12 text-right">
                                <button 
                                    type="submit"
                                    className='btn btn-teal btn-lg rounded'
                                    onClick={confirmAnswer}
                                    disabled={!userAnswer || isAnswered}
                                >
                                    Answer &nbsp;
                                    <FontAwesomeIcon icon="check"/>
                                </button>
                            </div>
                        )}
                        {isAnswered && (
                            <div className="col-12 col-xs-12 text-right">
                                <button 
                                    className='btn btn-teal btn-lg rounded'
                                    onClick={goToNextQuestion}
                                >
                                    Next &nbsp;
                                    <FontAwesomeIcon icon="arrow-right"/>
                                </button>
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </section>
        ))}
    </>) : (
        <>
            <div className="row" style={{paddingTop: '1.5%'}}>
                <div className="col-12 text-center">
                    <h1>Correct Answers: {correctAnswerCounter}</h1>
                    <h1>Wrong Answers: {wrongAnswerCounter}</h1>
                    <button 
                        className="btn btn-teal rounded btn-lg"
                        onClick={resetGame}    
                    >
                        Play Again
                    </button>
                </div>
            </div>
        </>
    ))}
    <div className="row mt-2">
        <div className="col-12 col-xs-12">
            <div className="progress">
                <div className={"progress-bar "+(questionNumber*questionList.length -1 < 100 ? "progress-blue" : "progress-teal")} style={{width: questionNumber*questionList.length - 1+'%'}}></div>
            </div>
        </div>
    </div>
    </>
  )
}
