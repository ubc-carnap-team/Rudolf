import React, { useState } from 'react'

import { ReactD3TreeItem } from '../typings/TreeNode'
import { isLeaf } from '../util/nodes'

type Props = {
  resolveNode: (selectedNode: ReactD3TreeItem, nodeInput: [string, string]) => void
  selectedNode: ReactD3TreeItem | null
  closeBranch: (selectedNode: ReactD3TreeItem & { children: [] }) => void
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
            if (selectedNode) {
              resolveNode(selectedNode, [leftBranchInput, rightBranchInput])
              setLeftBranchInput('')
              setRightBranchInput('')
            }
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
