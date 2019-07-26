import './App.css'

import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'

import { LeafNode, TreeNode } from '../typings/TreeNode'
import { decomposeNode, makeNode, updateNode } from '../util/nodes'
import { ControlWidget } from './ControlWidget'
import NodeView from './NodeView'



const exampleNode: TreeNode = makeNode('P', [
  makeNode('P=>Q', [makeNode('~Q', [makeNode('~P'), makeNode('Q')])]),
])

const App: React.FC = (): JSX.Element => {
  const [selectedNode, selectNode] = useState<TreeNode | null>(null)
  const [tree, setTree] = useState(exampleNode)
  const [modalShow, setModalShow] = useState(false)

  const handleClose = () => setModalShow(false);
  const handleShow = () => setModalShow(true);


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

  const handleNodeClick = (node: TreeNode): void => {
    !node.resolved && selectNode(selectedNode === node ? null : node)
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

  const handleClick = (node: TreeNode): void => {
    handleNodeClick(node)
    handleShow()
  }

  return (
    <div className="App">
      <main className="App-main">
        <NodeView
          root={tree}
          onClick={handleClick}
          selectedNode={selectedNode}
        // render={(item: TreeNode) => NodeView(item, selectedNode === item)}
        />
        <Modal
          show={modalShow}
          onHide={handleClose}
          size="sm"
          aria-labelledby="contained-modal-title-vcenter"
          animation={true}
          centered>
          <Modal.Header closeButton>
            <Modal.Title>Node Control Widget</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ControlWidget {...{ selectedNode, resolveNode, closeBranch }} />
          </Modal.Body>
        </Modal>
      </main>
    </div>
  )
}

export default App
