import React, { useState } from 'react'
import { Rating } from 'react-simple-star-rating'

interface StarRatingProps {
  onClick?: any;
  initialValue: number;
  readonly: boolean;
  size?: number;
}

const StarRating = ({onClick, readonly, size, initialValue = 0}: StarRatingProps) => {
  const [rating, setRating] = useState(initialValue)

  // Catch Rating value
  const handleRating = (rate: number) => {
    setRating(rate * 2)
    onClick(rate * 2)
    // other logic
  }
  // Optinal callback functions
  // const onPointerEnter = () => console.log('Enter')
  // const onPointerLeave = () => console.log('Leave')
  // const onPointerMove = (value: number, index: number) => console.log(value, index)

  return (
    <div className='App'>
      <Rating
        key={rating}
        onClick={handleRating}
        // onPointerEnter={onPointerEnter}
        // onPointerLeave={onPointerLeave}
        // onPointerMove={onPointerMove}
        /* Available Props */
        transition={true}
        allowFraction={true}
        initialValue={rating / 2}
        allowHover={true}
        readonly={readonly}
        size={size}
      />
    </div>
  )
}

export default StarRating