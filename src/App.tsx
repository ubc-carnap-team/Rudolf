import './App.css'

import React, { useState } from 'react'
import Tree from 'react-vertical-tree'

import Carnap from './Carnap.jpg'
import { ControlWidget } from './ControlWidget'
import { And, Atom, Not, Or } from './typings/Term'
import { TreeNode, Strategy } from './typings/TruthTree'
import NodeView from './NodeView'

const Q = Atom('Q')
const P = Atom('P')

const rootNode: TreeNode = TreeNode(Or(P, And(Q, Not(P))), [
  TreeNode(P),
  TreeNode(And(Q, Not(P)), [TreeNode(Q, [TreeNode(Not(P))])]),
])

const appendChildren = (root: TreeNode, newNodes: TreeNode[]): TreeNode =>
  root.children.length === 0
    ? { ...root, children: newNodes }
    : {
        ...root,
        children: root.children.map<TreeNode>((child: TreeNode) =>
          appendChildren(child, newNodes)
        ),
      }

const markResolved = (root: TreeNode) => ({ ...root, resolved: true })

const decomposeNode = (
  root: TreeNode,
  selectedNode: TreeNode,
  strategy: string,
  newNodes: TreeNode[]
): TreeNode =>
  root == selectedNode
    ? appendChildren(markResolved(selectedNode), newNodes)
    : {
        ...root,
        children: root.children.map((child) =>
          decomposeNode(child, selectedNode, strategy, newNodes)
        ),
      }

// TODO: stub
const parseNodes = (asString: string) =>
  asString
    .split(',')
    .map((subFormula: string) =>
      TreeNode({ type: 'ATOM', name: subFormula }, [])
    )

const App: React.FC = (): JSX.Element => {
  const [selectedNode, selectNode] = useState<TreeNode | null>(null)
  const [tree, setTree] = useState(rootNode)

  const handleNodeClick = (args: TreeNode): void => {
    selectNode(args)
  }

  const handleSubmit = (
    selectedNode: TreeNode,
    strategy: Strategy,
    newNodes: string
  ): void => {
    /**
     * The form data should contain:
     * - A choice of stack|split
     * - A list of children to add, in the form of a string.
     * - This should probably be a comma-separated list,
     *  like "P,~Q". If we want, we could have the user submit
     *  these in separate boxes. Whatever's easiest.
     * TODO:
     * 1. Mark the currently selected node as resolved.
     * 2. Unselect the current node (by setting selectedNode to null)
     * 3. Apply the changes to the bottom of the open branches.
     *  (For now, this can just be all branches, since we don't have
     *  a way of marking nodes as open/closed yet.)
     */

    // change resolved to true on target node
    setTree((oldTree: TreeNode) => {
      const newTree = decomposeNode(
        oldTree,
        selectedNode,
        strategy,
        parseNodes(newNodes)
      )
      console.log(newTree)
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
        <Tree data={[tree]} onClick={handleNodeClick} render={NodeView} />
      </main>
    </div>
  )
}

export default App
