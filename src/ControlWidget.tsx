import React, { FormEvent, useState } from 'react'

import { printTerm } from './typings/Term'
import { TreeNode } from './typings/TreeNode'

type Props = {
  selectedNode: TreeNode
  onSubmit: (strategy: 'stack' | 'split', newNodes: string) => void
}

export const ControlWidget = ({ selectedNode, onSubmit }: Props) => {
  const [strategy, selectStrategy] = useState<'stack' | 'split'>('split')
  const [newNodes, setNewNodes] = useState('')
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit(strategy, newNodes)
  }
  return (
    <div className="control-widget">
      Decompose node?:
      {printTerm(selectedNode.term)}
      <form onSubmit={handleSubmit}>
        <select
          value={strategy}
          onChange={(event) =>
            selectStrategy(event.currentTarget.value as 'stack' | 'split')
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
