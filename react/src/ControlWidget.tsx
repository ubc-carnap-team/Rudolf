import React from 'react'
import { TreeNode } from './typings/TreeNode'

type Props = { selectedNode: TreeNode }

export const ControlWidget = ({ selectedNode }: Props) => (
  <div className="node-popup">
    Decompose node?:
    {JSON.stringify(selectedNode)}
    {/**
        Interface to choose stack/split.
        Place to input formulas for lhs/rhs or stacked below on single branch.
     */}
    <input type="text" />
  </div>
)
