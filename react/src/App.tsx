import './App.css'

import React, { useState } from 'react'
import Tree, { withStyles } from 'react-vertical-tree'

import logo from './logo.svg'
import { Or, Atom, Not, And } from './typings/Term'
import { TreeNode } from './typings/TreeNode'
import { ControlWidget } from './ControlWidget'

const Q = Atom('Q')
const P = Atom('P')

const rootNode: TreeNode = TreeNode(Or(P, And(Q, Not(P))), [
  TreeNode(P),
  TreeNode(And(Q, Not(P)), [TreeNode(Q, [TreeNode(Not(P))])]),
])

const App: React.FC = () => {
  const [selectedNode, selectNode] = useState<TreeNode | null>(null)

  const handler = (args: TreeNode) => {
    selectNode(args)
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {selectedNode ? <ControlWidget selectedNode={selectedNode} /> : ''}
        <Tree data={[rootNode]} onClick={handler} />
      </header>
    </div>
  )
}

export default App
