import './App.css'

import React, { useState } from 'react'
import Tree from 'react-vertical-tree'

import Carnap from '../assets/Carnap.jpg'
import NodeView from '../NodeView'
import { TreeNode } from '../typings/TreeNode'
import { decomposeNode, makeNode } from '../util/nodes'
import { ControlWidget } from './ControlWidget'

const rootNode: TreeNode = makeNode('P\\/(Q/\\~P)', [makeNode('P=>Q')])

const App: React.FC = (): JSX.Element => {
  const [selectedNode, selectNode] = useState<TreeNode | null>(null)
  const [tree, setTree] = useState(rootNode)

  const handleNodeClick = (node: TreeNode): void => {
    if (node.resolved) return
    selectNode(node)
  }

  const handleSubmit = (selectedNode: TreeNode, newNodes: TreeNode[]): void => {
    /**
    - call decomposeNode inside setTree to make changes to tree State,
    - deselect the current node (by setting selectedNode to null)
     */

    // change resolved to true on target node
    setTree((oldTree: TreeNode) => {
      const newTree = decomposeNode(oldTree, selectedNode, newNodes)
      return newTree
    })
    // unselect current node
    selectNode(null)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={Carnap} className="App-logo" alt="logo" />
      </header>
      <main className="App-main">
        {selectedNode && (
          <ControlWidget selectedNode={selectedNode} onSubmit={handleSubmit} />
        )}
        <Tree
          data={[tree]}
          onClick={handleNodeClick}
          render={(item: TreeNode) => NodeView(item, selectedNode === item)}
        />
      </main>
    </div>
  )
}

export default App
