import { TextareaAutosize } from '@material-ui/core'
import React, { FC, useState } from 'react'

import {} from '../RudolfReducer'
import jsonviewJSS from '../styles/JSONView_styles'
import { DefaultProps } from '../typings'

export const JSONView: FC<DefaultProps> = ({
  currentState: { tree, justifications },
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
