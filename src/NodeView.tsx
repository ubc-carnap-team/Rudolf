import React from 'react'
import { TreeNode } from './typings/TreeNode'
import Check from '@material-ui/icons/Check'

export default function NodeView(node: TreeNode) {
  return (
    <div className="node">
      {node.formula}
      {node.resolved ? <Check /> : ''}
    </div>
  )
}
