import { Menu, MenuItem } from '@material-ui/core'
import React, { FC } from 'react'

import { NodeUpdater, TreeNode } from '../typings/TreeNode'
import { appendChildren, isLeaf, makeNode } from '../util/nodes'

type Props = {
  node: TreeNode
  onClose: () => void
  updateTree: (node: TreeNode, updater: NodeUpdater) => void
  open: boolean
  anchorEl: Element
  maxRow: number
  incrementRow: () => void
}

export const NodeMenu: FC<Props> = ({
  open,
  node,
  updateTree,
  anchorEl,
  onClose: close,
  maxRow,
  incrementRow,
}) => {
  const update = (updater: NodeUpdater) => () => {
    updateTree(node, updater)
    close()
  }

  const continueBranch = update((node) =>
    appendChildren(node, (id) => [makeNode({ id: `${id}0`, row: maxRow + 1 })])
  )

  const splitBranch = update((node) =>
    appendChildren(node, (id) => [
      makeNode({
        id: `${id}0`,
        row: maxRow + 1,
      }),
      makeNode({
        id: `${id}1`,
        row: maxRow + 1,
      }),
    ])
  )

  const splitBranchUpdate = () => (incrementRow(), splitBranch())

  const continueBranchUpdate = () => (incrementRow(), continueBranch())

  const toggleResolved = update((node) => ({
    ...node,
    resolved: !node.resolved,
  }))

  const toggleClosed = update((node) => ({
    ...node,
    closed: !node.closed,
  }))

  return (
    <Menu open={open} anchorEl={anchorEl} onClose={close}>
      <MenuItem onClick={continueBranchUpdate}>Continue Branch</MenuItem>
      <MenuItem onClick={splitBranchUpdate}>Split Branch</MenuItem>
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
