import React from 'react'
import { TreeNode } from './typings/TreeNode'
import Check from '@material-ui/icons/Check'

export default function NodeView(node: TreeNode, selected: boolean) {
  return (
    <div className={`node ${selected ? 'selected' : ''}`}>
      {node.formula}
      {node.resolved ? <Check /> : ''}
      {node.closed && <div className="closed-branch-marker">X</div>}
    </div>
  )
}
