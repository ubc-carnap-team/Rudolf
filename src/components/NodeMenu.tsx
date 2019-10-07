import React, { FC } from 'react'
import { Menu, MenuItem } from '@material-ui/core'
import { TreeNode, NodeUpdater } from '../typings/TreeNode'
import { appendChildren, makeNode, isLeaf } from '../util/nodes'

type Props = {
  node: TreeNode
  onClose: () => void
  updateTree: (node: TreeNode, updater: NodeUpdater) => void
  open: boolean
  anchorEl: Element
}

export const NodeMenu: FC<Props> = ({
  open,
  node,
  updateTree,
  anchorEl,
  onClose: close,
}) => {
  const update = (updater: NodeUpdater) => () => {
    updateTree(node, updater)
    close()
  }
  const continueBranch = update((node) =>
    appendChildren(node, () => [makeNode()])
  )

  const splitBranch = update((node) =>
    appendChildren(node, () => [makeNode(), makeNode()])
  )

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
      <MenuItem onClick={continueBranch}>Continue Branch</MenuItem>
      <MenuItem onClick={splitBranch}>Split Branch</MenuItem>
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
