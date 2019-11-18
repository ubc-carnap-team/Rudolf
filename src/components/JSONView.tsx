import React, { FC } from 'react'
import { TextareaAutosize } from '@material-ui/core'
import { TreeNode } from '../typings/TreeState'

export const JSONView: FC<{ tree: TreeNode }> = ({ tree }) => (
  <TextareaAutosize
    className="json-view"
    value={JSON.stringify(tree, null, '\t')}
  />
)
