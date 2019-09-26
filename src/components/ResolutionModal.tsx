import './ResolutionModal.css'

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

export const ResolutionModal = ({
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
      dialogClassName={'modal-90w'}
    >
      <Modal.Header closeButton>
        {selectedNode && selectedNode.formula}
      </Modal.Header>
      <Modal.Body>
        <form>
          <input
            type="text"
            value={leftBranchInput}
            aria-label="Left Branch"
            placeholder="Left Branch"
            onChange={(event) => setLeftBranchInput(event.currentTarget.value)}
          />
          <input
            type="text"
            value={rightBranchInput}
            placeholder="Right Branch"
            aria-label="Right Branch"
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
          <button
            type="button"
            disabled={
              selectedNode == null ||
              selectedNode.closed ||
              !isLeaf(selectedNode)
            }
            onClick={() => isLeaf(selectedNode) && closeBranch(selectedNode)}
          >
            Close Branch
          </button>
        </form>
      </Modal.Body>
    </Modal>
  )
}
