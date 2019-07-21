import './App.css'

import React, { useState } from 'react'
import Tree from 'react-d3-tree'

import NodeView from '../NodeView'
import { LeafNode, TreeNode } from '../typings/TreeNode'
import { decomposeNode, makeNode, updateNode } from '../util/nodes'
import { ControlWidget } from './ControlWidget'


const rootNode: TreeNode = makeNode('P', [
  makeNode('P=>Q', [makeNode('~Q', [])]),
])

const App: React.FC = (): JSX.Element => {
  const [selectedNode, selectNode] = useState<TreeNode | null>(null)
  const [tree, setTree] = useState(rootNode)

  const closeBranch = (selectedNode: LeafNode) => {
    setTree((oldTree) => {
      console.log(oldTree === tree)
      return updateNode(oldTree, selectedNode, (node: TreeNode) => ({
        ...node,
        closed: true,
      }))
    })
    selectNode(null)
  }

  const handleNodeClick = (targetNode: TreeNode): any => {
    !targetNode.resolved && selectNode(selectedNode === targetNode ? null : targetNode)
  }

  const resolveNode = (
    selectedNode: TreeNode,
    nodeInput: [string, string]
  ): void => {
    /**
    - call decomposeNode inside setTree to make changes to tree State,
    - deselect the current node (by setting selectedNode to null)
     */

    // change resolved to true on target node
    setTree((oldTree: TreeNode) =>
      decomposeNode(oldTree, selectedNode, nodeInput)
    )
    // unselect current node
    selectNode(null)
  }

  return (
    <div className="App">
      <main className="App-main">
        <Tree
          data={[tree]}
          onClick={(item: TreeNode) => handleNodeClick(item)}
          render={(item: TreeNode) => NodeView(item, selectedNode === item)}
        />
        <ControlWidget {...{ selectedNode, resolveNode, closeBranch }} />
      </main>
    </div>
  )
}

export default App
