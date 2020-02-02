import React, { FC } from 'react'
import { TextareaAutosize } from '@material-ui/core'
import { FormulaNode } from '../typings/TreeState'

export const JSONView: FC<{ tree: FormulaNode }> = ({ tree }) => (
  <TextareaAutosize
    className="json-view"
    value={JSON.stringify(tree, null, '\t')}
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
