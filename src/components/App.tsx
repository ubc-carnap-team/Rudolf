import './App.css'

import React, { useState } from 'react'

import { LeafNode, TreeNode, NodeUpdater } from '../typings/TreeNode'
import { decomposeNode, updateNode, parsePremises } from '../util/nodes'
import NodeView from './NodeView'
import PremiseInput from './PremiseInput'
import PremisesSelector from './PremisesSelector'

const defaultPremises = 'P->Q,P,~Q'
const exampleTree: TreeNode = parsePremises(defaultPremises.split(','))

const App: React.FC = (): JSX.Element => {
  const [selectedNode, selectNode] = useState<TreeNode | null>(null)
  const [tree, setTree] = useState<TreeNode>(exampleTree)
  const [premises, setPremises] = useState<string>(defaultPremises)

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

  const handleNodeChange = ({
    node,
    label,
    rule,
  }: {
    node: TreeNode
    label: string
    rule: string
  }) => {
    setTree((oldTree) =>
      updateNode(oldTree, node, (oldSubTree) => ({
        ...oldSubTree,
        label,
        rule,
      }))
    )
  }

  const handleSubmitPremises = (premises: string) => {
    setPremises(premises)
    setTree(parsePremises(premises.split(',')))
  }

  const resolveNode = (
    selectedNode: TreeNode,
    nodeInput: [string, string]
  ): void => {
    // call decomposeNode inside setTree to make changes to tree State,
    setTree(
      (oldTree: TreeNode) =>
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
        <NodeView
          node={tree}
          selectNode={selectNode}
          selectedNode={selectedNode}
          getNextNodeId={getNextNodeId}
          nodeId={getNextNodeId()}
          onChange={handleNodeChange}
          updateTree={(node: TreeNode, updater: NodeUpdater) =>
            setTree(updateNode(tree, node, updater))
          }
        />
        {/* <ResolutionModal
          {...{
            selectedNode,
            resolveNode,
            closeBranch,
            handleClose: () => selectNode(null),
          }}
        /> */}
      </main>
    </div>
  )
}

export default App
