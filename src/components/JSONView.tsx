import React, { FC } from 'react'
import { TextareaAutosize } from '@material-ui/core'
import { FormulaNode } from '../typings/TreeState'
import { convertToSequent } from '../util/carnapAdapter'

const safeConvertToSequent = (tree: any) => {
  let res
  try {
    res = convertToSequent(tree)
  } catch (e) {
    console.log(e)
    res = e
  }
  return JSON.stringify(res)
}

export const JSONView: FC<{ tree: FormulaNode }> = ({ tree }) => (
  <TextareaAutosize
    className="json-view"
    value={safeConvertToSequent(tree)}
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
