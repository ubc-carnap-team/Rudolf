import './App.css'

import React, { useState } from 'react'
import Tree from 'react-vertical-tree'

import NodeView from '../NodeView'
import { TreeNode } from '../typings/TreeNode'
import { decomposeNode, makeNode } from '../util/nodes'
import { ControlWidget } from './ControlWidget'

const rootNode: TreeNode = makeNode('P\\/(Q/\\~P)', [
  makeNode('P=>Q'),
  makeNode('P/\\~Q', [makeNode('P', [makeNode('P')])]),
])

const App: React.FC = (): JSX.Element => {
  const [selectedNode, selectNode] = useState<TreeNode | null>(null)
  const [tree, setTree] = useState(rootNode)

  const handleNodeClick = (node: TreeNode): void => {
    selectNode(selectedNode === node ? null : node)
  }

  const handleSubmit = (selectedNode: TreeNode, newNodes: TreeNode[]): void => {
    /**
    - call decomposeNode inside setTree to make changes to tree State,
    - deselect the current node (by setting selectedNode to null)
     */

    // change resolved to true on target node
    setTree((oldTree: TreeNode) =>
      decomposeNode(oldTree, selectedNode, newNodes)
    )
    // unselect current node
    selectNode(null)
  }

  return (
    <div className="App">
      <main className="App-main">
        <Tree
          data={[tree]}
          onClick={handleNodeClick}
          render={(item: TreeNode) => NodeView(item, selectedNode === item)}
        />
        <ControlWidget selectedNode={selectedNode} onSubmit={handleSubmit} />
      </main>
    </div>
  )
}

export default App
