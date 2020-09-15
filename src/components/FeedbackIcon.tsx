import React from 'react'
import greenCheck from '../assets/greenCheck.svg'
import redX from '../assets/redX.svg'
import { feedbackSize } from '../styles/NodeView_styles'

interface Props {
  isCorrect: boolean
}

const FeedbackIcon = ({ isCorrect }: Props) => {
  return (
    <img
      src={isCorrect ? greenCheck : redX}
      alt={isCorrect ? 'correct' : 'incorrect'}
      style={{
        width: feedbackSize,
        height: feedbackSize,
      }}
    />
  )
}

export default FeedbackIcon
