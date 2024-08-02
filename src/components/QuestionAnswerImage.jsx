import React from 'react'

export const QuestionAnswerImage = ({isAnswered, url}) => {
  return (
    <div className="col-12 col-xs-12">
        <div className='image-frame'>
            <div className={!isAnswered ? 'question-not-answered' : 'question-answered'}>
                <figure>
                    <img loading="lazy" src={url} alt="" />
                </figure>
            </div>
        </div>
    </div>
  )
}
