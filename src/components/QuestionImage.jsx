import React from 'react'

export const QuestionImage = ({url}) => {
  return (
    <div className="col-12 col-xs-12">
        <div className='image-frame'>
            <figure>
                <img loading="lazy" src={url} alt="" />
            </figure>
        </div>
    </div>
  )
}
