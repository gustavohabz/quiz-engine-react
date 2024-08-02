import React from 'react'
import { CustomRadio } from './InputComponents/CustomRadio'
import { CustomCheckbox } from './InputComponents/CustomCheckbox'
import { CustomTextField } from './InputComponents/CustomTextField'
import { ButtonAnswer } from './InputComponents/ButtonAnswer'
import { ButtonNext } from './InputComponents/ButtonNext'
import { QuestionAnswerImage } from './QuestionAnswerImage'
import { QuestionImage } from './QuestionImage'

export const QuestionForm = ({
    confirmAnswerSubmit,
    question,
    index,
    isAnswered,
    isCorrectAnswer,
    userAnswer,
    setUserAnswerAndCheck,
    confirmAnswer,
    goToNextQuestion
}) => {
  return (
    <form onSubmit={(e) => confirmAnswerSubmit(e)}>
        {(question.questionImage && (
            <QuestionImage url={question.questionImage}/>
        ))}
        
        {(question.answerImage && !question.questionImage && (
            <QuestionAnswerImage isAnswered={isAnswered} url={question.answerImage}/>
        ))}
        <div className="row">
            <div className='col-12 col-xs-12'>
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
                    <ButtonAnswer 
                        confirmAnswer={confirmAnswer}
                        disabled={!userAnswer || isAnswered}
                    />
                </div>
            )}
            {isAnswered && (
                <div className="col-12 col-xs-12 text-right">
                    <ButtonNext 
                        goToNextQuestion={goToNextQuestion}
                    />
                </div>
            )}
        </div>
    </form>
  )
}
