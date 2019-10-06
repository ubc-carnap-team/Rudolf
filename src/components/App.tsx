import './App.css'

import React, { useState } from 'react'

import { LeafNode, TreeNode } from '../typings/TreeNode'
import { decomposeNode, parseBranch, updateNode } from '../util/nodes'
import NodeView from './NodeView'
import PremiseInput from './PremiseInput'
import PremisesSelector from './PremisesSelector'
import { ResolutionModal } from './ResolutionModal'

const defaultPremises = 'P->Q,P,~Q'
const exampleTree: TreeNode | null = parseBranch(defaultPremises)

const App: React.FC = (): JSX.Element => {
  const [selectedNode, selectNode] = useState<TreeNode | null>(null)
  const [tree, setTree] = useState<TreeNode | null>(exampleTree)
  const [premises, setPremises] = useState<string>(defaultPremises)

  const handleClose = () => {
    selectNode(null)
  }

  const getNextNodeId = (() => {
    let count = 0
    return () => `${count++}`
  })()

  const closeBranch = (selectedNode: LeafNode) => {
    setTree((oldTree) => {
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
    setPremises(premises)
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
        <PremisesSelector onChange={handleSubmitPremises} />

        <PremiseInput
          premises={premises}
          onSubmit={handleSubmitPremises}
          setPremises={setPremises}
        />
        {tree ? (
          <NodeView
            root={tree}
            onClick={handleNodeClick}
            selectedNode={selectedNode}
            getNextNodeId={getNextNodeId}
            nodeId={getNextNodeId()}
          />
        ) : (
          '{}'
        )}
        <ResolutionModal
          {...{ selectedNode, resolveNode, closeBranch, handleClose }}
        />
      </main>
    </div>
  )
}

export default App
