import React, { FormEvent, useState } from 'react'

import { TreeNode, Strategy } from '../typings/TreeNode'

type Props = {
  selectedNode: TreeNode
  onSubmit: (
    selectedNode: TreeNode,
    strategy: Strategy,
    newNodes: string
  ) => void
}

export const ControlWidget = ({ selectedNode, onSubmit }: Props) => {
  const [strategy, selectStrategy] = useState<Strategy>('split')
  const [newNodes, setNewNodes] = useState('')
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit(selectedNode, strategy, newNodes)
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
          type={newNodes}
          onChange={(event) => setNewNodes(event.currentTarget.value)}
        />
        <button type="submit" formTarget={undefined}>
          Submit
        </button>
      </form>
    </div>
  )
}
