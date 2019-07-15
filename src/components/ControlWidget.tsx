import React, { FormEvent, useState } from 'react'

import { parseBranches } from '../util/nodes'
import { Strategy, TreeNode } from '../typings/TreeNode'

type Props = {
  selectedNode: TreeNode
  onSubmit: (selectedNode: TreeNode, newNodes: TreeNode[]) => void
}

export const ControlWidget = ({ selectedNode, onSubmit }: Props) => {
  const [strategy, selectStrategy] = useState<Strategy>('split')
  const [leftBranchInput, setLeftBranchInput] = useState<string>('')
  const [rightBranchInput, setRightBranchInput] = useState<string>('')
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const newNodes = parseBranches(leftBranchInput, strategy, rightBranchInput)
    onSubmit(selectedNode, newNodes)
  }
  return (
    <div className="control-widget">
      Decompose node?:
      {selectedNode.formula}
      <form onSubmit={handleSubmit}>
        <select
          value={strategy}
          onChange={(event) =>
            selectStrategy(event.currentTarget.value as Strategy)
          }
        >
          <option value="split">split</option>
          <option value="stack">stack</option>
        </select>
        <input
          type="text"
          value={leftBranchInput}
          onChange={(event) => setLeftBranchInput(event.currentTarget.value)}
        />

        {strategy === 'split' && (
          <input
            type="text"
            value={rightBranchInput}
            onChange={(event) => setRightBranchInput(event.currentTarget.value)}
          />
        )}

        <button type="submit" formTarget={undefined}>
          Submit
        </button>
      </form>
    </div>
  )
}
