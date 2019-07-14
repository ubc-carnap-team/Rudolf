import React, { FormEvent, useState } from 'react'

import { TreeNode, Strategy } from '../typings/TreeNode'
import { parseBranch } from '../util/nodes'

type Props = {
  selectedNode: TreeNode
  onSubmit: (selectedNode: TreeNode, newNodes: TreeNode[]) => void
}

const removeNulls = <T extends {}>(arr: (T | null)[]): T[] =>
  arr.filter((_: T | null) => _ != null) as T[]

export const ControlWidget = ({ selectedNode, onSubmit }: Props) => {
  const [strategy, selectStrategy] = useState<Strategy>('split')
  const [leftBranchInput, setLeftBranchInput] = useState<string>('')
  const [rightBranchInput, setRightBranchInput] = useState<string>('')
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const leftBranch: TreeNode | null = parseBranch(leftBranchInput)
    const rightBranch: TreeNode | null =
      strategy === 'split' ? parseBranch(rightBranchInput) : null
    onSubmit(selectedNode, removeNulls([leftBranch, rightBranch]))
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
