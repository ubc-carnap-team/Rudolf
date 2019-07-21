import React, { useState } from 'react'

import { TreeNode } from '../typings/TreeNode'
import { isLeaf } from '../util/nodes'

type Props = {
  resolveNode: (selectedNode: TreeNode, nodeInput: [string, string]) => void
  selectedNode: TreeNode | null
  closeBranch: (selectedNode: TreeNode & { children: [] }) => void
}

export const ControlWidget = ({
  selectedNode,
  resolveNode,
  closeBranch,
}: Props) => {
  const [leftBranchInput, setLeftBranchInput] = useState<string>('')
  const [rightBranchInput, setRightBranchInput] = useState<string>('')
  return (
    <div className="control-widget">
      <form>
        <input
          id="#left-branch-input"
          type="text"
          value={leftBranchInput}
          onChange={(event) => setLeftBranchInput(event.currentTarget.value)}
        />

        <input
          id="#left-branch-input"
          type="text"
          value={rightBranchInput}
          onChange={(event) => setRightBranchInput(event.currentTarget.value)}
        />

        <button
          type="button"
          disabled={!selectedNode || selectedNode.resolved}
          onClick={() => {
            selectedNode &&
              resolveNode(selectedNode, [leftBranchInput, rightBranchInput])
          }}
        >
          Resolve Selected Node
        </button>
      </form>
      <button
        type="button"
        disabled={
          selectedNode == null || selectedNode.closed || !isLeaf(selectedNode)
        }
        onClick={() => isLeaf(selectedNode) && closeBranch(selectedNode)}
      >
        Close Branch
      </button>
    </div>
  )
}
