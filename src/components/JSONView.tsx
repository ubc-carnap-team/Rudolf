import { TextareaAutosize } from '@material-ui/core'
import React, { FC, useEffect, useState } from 'react'

import { CustomDispatch, RudolfStore, updateFeedback } from '../RudolfReducer'
import jsonviewJSS from '../styles/JSONView_styles'
import { checkTree } from '../util/carnapAdapter'

export const JSONView: FC<RudolfStore & { dispatch: CustomDispatch }> = ({
  tree,
  justifications,
  feedback,
  dispatch,
}) => {
  useEffect(() => {
    if (window.Carnap) {
      checkTree(tree, justifications)
        .then(({ sequent, feedback }) => {
          return dispatch(updateFeedback({ feedback, sequent }))
        })
        .catch(({ message }: Error) => {
          return dispatch(updateFeedback({ errorMessage: message }))
        })
    }
  }, [dispatch, justifications, tree])
  const classes = jsonviewJSS()
  const [open, setOpen] = useState(false)
  return (
    <div className={classes.Bounder}>
      <div
        className={classes.Toggle}
        onClick={() => {
          setOpen(!open)
        }}
      >
        {open ? 'close' : 'open'}
      </div>
      <TextareaAutosize
        className={classes.TextArea}
        value={JSON.stringify({ tree, justifications, feedback })}
        style={{
          maxHeight: open ? '50vh' : '0vh',
        }}
      />
    </div>
  )
}
