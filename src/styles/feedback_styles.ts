import { createUseStyles } from 'react-jss'

const feedbackJSS = createUseStyles({
  Correct: {
    borderColor: 'green',
  },

  Incorrect: {
    borderColor: 'red',
  },
})

export default feedbackJSS
