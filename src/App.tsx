import './App.css'

import React from 'react'
import Tree, { withStyles } from 'react-vertical-tree'

import logo from './logo.svg'
import { Or, Atom, Not, And } from './typings/Term'
import { TreeNode } from './typings/TreeNode'

const Q = Atom('Q')
const P = Atom('P')

const rootNode: TreeNode = TreeNode(Or(P, And(Q, Not(P))), [
  TreeNode(P),
  TreeNode(And(Q, Not(P)), [TreeNode(Q, [TreeNode(Not(P))])]),
])

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Tree data={[rootNode]} />
      </header>
    </div>
  )
}

export default App
