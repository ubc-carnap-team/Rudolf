import './App.css'

import React, { useState } from 'react'
import Tree from 'react-d3-tree'

import NodeView from '../NodeView'
import { LeafNode, ReactD3TreeItem } from '../typings/TreeNode'
import { decomposeNode, makeNode, updateNode } from '../util/nodes'
import { ControlWidget } from './ControlWidget'


const rootNode: ReactD3TreeItem = makeNode('P', [
  makeNode('P=>Q', [makeNode('~Q', [])]),
])

const App: React.FC = (): JSX.Element => {
  const [selectedNode, selectNode] = useState<ReactD3TreeItem | null>(null)
  const [tree, setTree] = useState(rootNode)

  const closeBranch = (selectedNode: LeafNode) => {
    setTree((oldTree) => {
      console.log(oldTree === tree)
      return updateNode(oldTree, selectedNode, (node: ReactD3TreeItem) => ({
        ...node,
        closed: true,
      }))
    })
    selectNode(null)
  }

  const handleNodeClick = (targetNode: ReactD3TreeItem): any => {
    !targetNode.resolved && selectNode(selectedNode === targetNode ? null : targetNode)
  }

  const resolveNode = (
    selectedNode: ReactD3TreeItem,
    nodeInput: [string, string]
  ): void => {
    /**
    - call decomposeNode inside setTree to make changes to tree State,
    - deselect the current node (by setting selectedNode to null)
     */

    // change resolved to true on target node
    setTree((oldTree: ReactD3TreeItem) =>
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
          onClick={() => handleNodeClick(rootNode)}
          render={(item: ReactD3TreeItem) => NodeView(item, selectedNode === item)}
        />
        <ControlWidget {...{ selectedNode, resolveNode, closeBranch }} />
      </main>
    </div>
  )
}

export default App
