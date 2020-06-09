import React, { FC } from 'react'
import { TextareaAutosize } from '@material-ui/core'
import { JustificationMap } from '../typings/TreeState'
import { convertToSequent } from '../util/carnapAdapter'
import { RudolfStore } from '../RudolfReducer'

const safeConvertToSequent = (tree: any, justifications: JustificationMap) => {
  let res
  try {
    res = convertToSequent(tree, justifications)
  } catch (e) {
    console.log(e)
    res = e
  }
  return JSON.stringify({ tree, sequent: res })
}

export const JSONView: FC<RudolfStore> = ({ tree, justifications }) => (
  <TextareaAutosize
    className="json-view"
    value={safeConvertToSequent(tree, justifications)}
    style={{
      overflow: 'hidden scroll',
      fontSize: '10px',
      minWidth: '100%',
      position: 'fixed',
      bottom: 0,
      maxHeight: '25%',
    }}
  />
)
