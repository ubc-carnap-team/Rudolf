import { TextareaAutosize } from '@material-ui/core'
import React, { FC, useState } from 'react'

import { CustomDispatch, RudolfStore } from '../RudolfReducer'
import jsonviewJSS from '../styles/JSONView_styles'

export const JSONView: FC<RudolfStore & { dispatch: CustomDispatch }> = ({
  tree,
  justifications,
  feedback,
}) => {
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
