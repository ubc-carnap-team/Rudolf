import './App.css'

import React, { useState } from 'react'

import { LeafNode, TreeNode } from '../typings/TreeNode'
import { decomposeNode, updateNode, parseBranch } from '../util/nodes'
import { ControlWidget } from './ControlWidget'
import NodeView from './NodeView'

const examplePremises = 'P->Q,P,~Q'
const exampleTree: TreeNode | null = parseBranch(examplePremises)

const App: React.FC = (): JSX.Element => {
  const [selectedNode, selectNode] = useState<TreeNode | null>(null)
  const [tree, setTree] = useState<TreeNode | null>(exampleTree)

  const handleClose = () => {
    selectNode(null)
  }

  const closeBranch = (selectedNode: LeafNode) => {
    setTree((oldTree) => {
      console.log(oldTree === tree)
      return (
        oldTree &&
        updateNode(oldTree, selectedNode, (node: TreeNode) => ({
          ...node,
          closed: true,
        }))
      )
    })
    selectNode(null)
  }

  const handleNodeClick = (node: TreeNode): void => {
    !node.resolved && selectNode(selectedNode === node ? null : node)
  }

  const handleSubmitPremises = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(event)
    setTree(parseBranch((event.currentTarget as any)[0].value) || null)
  }

  const resolveNode = (
    selectedNode: TreeNode,
    nodeInput: [string, string]
  ): void => {
    // call decomposeNode inside setTree to make changes to tree State,

    setTree(
      (oldTree: TreeNode | null) =>
        oldTree && decomposeNode(oldTree, selectedNode, nodeInput)
    )
    // unselect current node
    selectNode(null)
  }

  return (
    <div className="App">
      <main className="App-main">
        <form onSubmit={handleSubmitPremises}>
          <input
            type="text"
            className="premises"
            aria-label="Enter Premises"
            defaultValue={examplePremises}
          />
          <button>Declare Premises</button>
        </form>
        {tree ? (
          <NodeView
            root={tree}
            onClick={handleNodeClick}
            selectedNode={selectedNode}
          />
        ) : (
          '{}'
        )}
        <ControlWidget
          {...{ selectedNode, resolveNode, closeBranch, handleClose }}
        />
      </main>
    </div>
  )
}

export default App
