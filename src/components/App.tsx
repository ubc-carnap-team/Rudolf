import './App.css'

import React, { useState } from 'react'

import { LeafNode, TreeNode } from '../typings/TreeNode'
import { decomposeNode, parseBranch, updateNode } from '../util/nodes'
import NodeView from './NodeView'
import PremiseInput from './PremiseInputProps'
import { ResolutionModal } from './ResolutionModal'
import SelectInput from './SelectInput'

const examplePremises = 'P->Q,P,~Q'
const mp = 'P->Q'
const dmg = '~Q'
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

  const handleSubmitPremises = (premises: string) => {
    setTree(parseBranch(premises) || null)
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
        <SelectInput
          onSubmit={handleSubmitPremises}
        />

        <PremiseInput
          defaultPremises={examplePremises}
          onSubmit={handleSubmitPremises}
        />
        {tree ? (
          <NodeView
            root={tree}
            onClick={handleNodeClick}
            selectedNode={selectedNode}
          />
        ) : (
            '{}'
          )}
        <ResolutionModal
          {...{ selectedNode, resolveNode, closeBranch, handleClose }}
        />
      </main>
    </div >
  )
}

export default App
