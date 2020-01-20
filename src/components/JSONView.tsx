import React, { FC } from 'react'
import { TextareaAutosize } from '@material-ui/core'
import { RudolfStore } from '../RudolfReducer'

export const JSONView: FC<{ state: RudolfStore }> = ({ state }) => (
  <TextareaAutosize
    className="json-view"
    value={JSON.stringify(state, null, '\t')}
  />
)
