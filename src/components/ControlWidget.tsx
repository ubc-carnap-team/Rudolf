import './ControlWidget.css'

import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'

import { TreeNode } from '../typings/TreeNode'
import { isLeaf } from '../util/nodes'

type Props = {
  resolveNode: (selectedNode: TreeNode, nodeInput: [string, string]) => void
  selectedNode: TreeNode | null
  closeBranch: (selectedNode: TreeNode & { children: [] }) => void
  handleClose: () => void
}

export const ControlWidget = ({
  selectedNode,
  resolveNode,
  closeBranch,
  handleClose,
}: Props) => {
  const [leftBranchInput, setLeftBranchInput] = useState<string>('')
  const [rightBranchInput, setRightBranchInput] = useState<string>('')
  return (
    <Modal
      show={selectedNode != null && !selectedNode.resolved}
      onHide={handleClose}
      size="lg"
      keyboard={true}
      animation={true}
      dialogClassName={"modal-90w"}
    >
      <Modal.Header closeButton>
        {selectedNode && selectedNode.formula}
      </Modal.Header>
      <Modal.Body>
        <form>
          <label> First Branch </label>
          <input
            type="text"
            value={leftBranchInput}
            onChange={(event) => setLeftBranchInput(event.currentTarget.value)}
          />

          <input
            type="text"
            value={rightBranchInput}
            onChange={(event) => setRightBranchInput(event.currentTarget.value)}
          />

          <button
            type="button"
            disabled={!selectedNode || selectedNode.resolved}
            onClick={() => {
              if (selectedNode) {
                resolveNode(selectedNode, [leftBranchInput, rightBranchInput])
                setLeftBranchInput('')
                setRightBranchInput('')
              }
            }}
          >
            Resolve Selected Node
            </button>
        </form>
        <button
          type="button"
          disabled={
            selectedNode == null || selectedNode.closed || !isLeaf(selectedNode)
          }
          onClick={() => isLeaf(selectedNode) && closeBranch(selectedNode)}
        >
          Close Branch
          </button>
      </Modal.Body>
    </Modal>
  )
}
