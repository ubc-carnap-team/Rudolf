import { Feedback } from '@material-ui/icons'
import React from 'react'

import { RudolfStore } from '../RudolfReducer'

type Props = { currentState: RudolfStore }

const RudolfFeedback: React.FC<Props> = (currentState) => (
  <a
    href={`mailto:phil.logic.ubc@gmail.com?subject=${encodeURIComponent(
      `USER FEEDBACK - `
    )}&body=${encodeURIComponent(
      `DESCRIBE YOUR PROBLEM OR SUGGESTION HERE \n\n\n\n${JSON.stringify(
        currentState
      )}`
    )}`}
    style={{ alignSelf: 'flex-end' }}
  >
    feedback
    <Feedback></Feedback>
  </a>
)

export default RudolfFeedback
