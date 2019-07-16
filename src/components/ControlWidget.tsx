import React, { FormEvent, useState } from 'react'

import { Strategy, TreeNode } from '../typings/TreeNode'

type Props = {
  onSubmit: (selectedNode: TreeNode, nodeInput: [string, string]) => void
  selectedNode: TreeNode | null
}

export const ControlWidget = ({ selectedNode, onSubmit }: Props) => {
  const [strategy, selectStrategy] = useState<Strategy>('split')
  const [leftBranchInput, setLeftBranchInput] = useState<string>('')
  const [rightBranchInput, setRightBranchInput] = useState<string>('')
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (selectedNode) {
      onSubmit(selectedNode, [leftBranchInput, rightBranchInput])
    }
  }
  return (
    <div className="control-widget">
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

        <button type="submit" formTarget={undefined} disabled={!selectedNode}>
          Resolve Selected Node
        </button>
      </form>
    </div>
  )
}
