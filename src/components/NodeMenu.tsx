import { Menu, MenuItem } from '@material-ui/core'
import React, { FC } from 'react'

import { NodeUpdater, TreeNode } from '../typings/TreeState'
import { appendChildren, isLeaf, makeNode } from '../util/nodes'

type Props = {
  node: TreeNode
  onClose: () => void
  updateTree: (node: TreeNode, updater: NodeUpdater) => void
  open: boolean
  anchorEl: Element
  nextRow: number
  incrementRow: () => void
}

export const NodeMenu: FC<Props> = ({
  open,
  node,
  updateTree,
  anchorEl,
  onClose: close,
  nextRow,
  incrementRow,
}) => {
  const update = (updater: NodeUpdater) => {
    updateTree(node, updater)
    close()
  }

  const continueBranchUpdater: NodeUpdater = (node) =>
    appendChildren(node, (id) => [makeNode({ id: `${id}0`, row: nextRow })])

  const splitBranchUpdater: NodeUpdater = (node) =>
    appendChildren(node, (id) => [
      makeNode({
        id: `${id}0`,
        row: nextRow,
      }),
      makeNode({
        id: `${id}1`,
        row: nextRow,
      }),
    ])

  const handleSplit = (): void => {
    incrementRow()
    update(splitBranchUpdater)
  }

  const handleContinue = (): void => {
    incrementRow()
    update(continueBranchUpdater)
  }

  const toggleResolved = (): void =>
    update((node) => ({
      ...node,
      resolved: !node.resolved,
    }))

  const toggleClosed = (): void =>
    update((node) => ({
      ...node,
      closed: !node.closed,
    }))

  return (
    <Menu open={open} anchorEl={anchorEl} onClose={close}>
      <MenuItem onClick={handleContinue}>Continue Branch</MenuItem>
      <MenuItem onClick={handleSplit}>Split Branch</MenuItem>
      <MenuItem onClick={toggleResolved}>
        Mark as {node.resolved ? 'Un' : ''}Resolved
      </MenuItem>
      {isLeaf(node) && (
        <MenuItem onClick={toggleClosed}>
          {node.closed ? 'Reopen' : 'Close'} Branch
        </MenuItem>
      )}
    </Menu>
  )
}
