import { Feedback } from '@material-ui/icons'
import React from 'react'

import { RudolfStore } from '../RudolfReducer'

type Props = { treeState: RudolfStore }

const RudolfFeedback: React.FC<Props> = (treeState) => (
  <a
    href={`mailto:phil.logic.ubc@gmail.com?subject=${encodeURIComponent(
      `USER FEEDBACK - `
    )}&body=${encodeURIComponent(
      `DESCRIBE YOUR PROBLEM OR SUGGESTION HERE \n\n\n\n${JSON.stringify(
        treeState
      )}`
    )}`}
    style={{ alignSelf: 'flex-end' }}
  >
    feedback
    <Feedback></Feedback>
  </a>
)

export default RudolfFeedback
