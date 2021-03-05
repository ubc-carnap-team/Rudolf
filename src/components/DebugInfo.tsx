import { TextareaAutosize } from '@material-ui/core'
import React, { FC, useState } from 'react'
import { createUseStyles } from 'react-jss'

import { RudolfStore } from '../RudolfReducer'

const jsonviewJSS = createUseStyles({
  Bounder: {
    minWidth: '100%',
    position: '',
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    zIndex: 10,
  },

  TextArea: {
    overflow: 'hidden scroll',
    fontSize: '16px',
  },

  Toggle: {
    backgroundColor: 'black',
    color: 'white',
    fontSize: '13px',
    alignSelf: 'flex-end',
    '&:hover': {
      cursor: 'pointer',
    },
    padding: '2px 10px',
  },
})

export const DebugInfo: FC<RudolfStore> = ({
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
        {open ? 'hide' : 'show debug info'}
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
